import json
import pytest
from config.asgi import application
from channels.testing import WebsocketCommunicator

@pytest.mark.asyncio
class WebSocketTests():
	async def test_websocket_connection_success(self):
		"""Test successfull web socket connection"""
		# simulate web socket connection
		communicator = WebsocketCommunicator(application, "/ws/chat/test_room/")
		# add headers for JWT authentication if needed
		communicator.scope["headers"] = [
			(b"authorization", b"Bearer valid_token_here")
		]
		# establish connection
		connected, subprotocol = await communicator.connect()
		assert connected
		# close connection
		await communicator.disconnect()

	async def test_websocket_send_receive_message(self):
		""" Test sending and receiving messages over WebSocket. """
		communicator = WebsocketCommunicator(application, "/ws/chat/test_room/")
		communicator.scope["headers"] = [
			(b"authorization", b"Bearer valid_token_here")
		]

		# connect
		connected, subprotocol = await communicator.connect()
		assert connected

		# send message
		message_data = {"type": "group", "target": "test_room", "content": "Hello World"}
		await communicator.send_json_to(message_data)

		# receive broadcasted message
		response = await communicator.receive_json_from()
		assert response["message"] == "(Group test_room): Hello World"

		# disconnect
		await communicator.disconnect()

	async def test_websocket_connection_invalid(self):
		""" Test WebSocket connection fails with an invalid token."""

		communicator = WebsocketCommunicator(application, "/ws/chat/test_room/")

		# add invalid token in headers
		communicator.scope["headers"] = [
			(b"authorization", b"Bearer invalid_token_here")
		]

		# attempt connection
		connected, subprotocol = await communicator.connect()
		assert not connected  # connection should fail

