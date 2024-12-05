from channels.testing import WebsocketCommunicator
from django.test import TestCase
from config.asgi import application  # Update to your routing module
from django.db import transaction


class TournamentConsumerTest(TestCase):

    async def test_websocket_connect(self):

        communicator1 = WebsocketCommunicator(
            application, "ws/tournament/room_name1/")
        communicator2 = WebsocketCommunicator(
            application, "ws/tournament/room_name1/")

        connected, subprotocol = await communicator1.connect()
        self.assertTrue(connected)

        connected, subprotocol = await communicator2.connect()
        self.assertTrue(connected)

        # Disconnect
        await communicator1.disconnect()
        await communicator2.disconnect()

    async def test_message_tournament(self):
        communicator1 = WebsocketCommunicator(
            application, "ws/tournament/room_name1/")
        communicator2 = WebsocketCommunicator(
            application, "ws/tournament/room_name1/")

        connected, subprotocol = await communicator1.connect()
        self.assertTrue(connected)

        connected, subprotocol = await communicator2.connect()
        self.assertTrue(connected)

        message = {
            "action": "message",
            "sender": "player1",
            "message": "Hello Player2"
        }
        await communicator1.send_json_to(message)


        response2 = await communicator2.receive_json_from()
        assert response2['message'] == 'Hello Player2'

        await communicator1.disconnect()
        await communicator2.disconnect()


    #async def test_create_tournament(self):
    #    communicator1 = WebsocketCommunicator(
    #        application, "ws/tournament/room_name3/")

    #    connected, subprotocol = await communicator1.connect()
    #    self.assertTrue(connected)


    #    message = {
    #        "action": "create_or_join",
    #        "tournament_name": "room_name3",
    #        "nickname": "player1"
    #    }
    #    await communicator1.send_json_to(message)


    #    response1 = await communicator1.receive_json_from()


    #    print(response1)

    #    assert response1['type'] == 'create'

    #    await communicator1.disconnect()



    #async def test_create_tournament_multi(self):
    #    communicator1 = WebsocketCommunicator(
    #        application, "ws/tournament/room_name2/")
    #    communicator2 = WebsocketCommunicator(
    #        application, "ws/tournament/room_name2/")

    #    connected, subprotocol = await communicator1.connect()
    #    self.assertTrue(connected)

    #    connected, subprotocol = await communicator2.connect()
    #    self.assertTrue(connected)

    #    try:
    #        # Player 1 creates or joins the tournament
    #        message1 = {
    #            "action": "create_or_join",
    #            "tournament_name": "room_name2",
    #            "nickname": "player1"
    #        }
    #        await communicator1.send_json_to(message1)

    #        # Player 2 creates or joins the tournament
    #        message2 = {
    #            "action": "create_or_join",
    #            "tournament_name": "room_name2",
    #            "nickname": "player2"
    #        }
    #        await communicator2.send_json_to(message2)

    #        # Receive responses for both players
    #        response1 = await communicator1.receive_json_from()
    #        print(response1)
    #        response2 = await communicator2.receive_json_from()
    #        print(response2)
    #        response1 = await communicator1.receive_json_from()
    #        print(response1)
    #        response2 = await communicator2.receive_json_from()
    #        print(response2)

    #        # Verify the responses (assuming you expect a 'create' action for both players)
    #        self.assertEqual(response1['type'], 'create')
    #        self.assertEqual(response2['type'], 'create')

    #    finally:
    #        # Ensure both communicators disconnect after everything is done
    #        await communicator1.disconnect()
    #        await communicator2.disconnect()


