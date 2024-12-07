from channels.testing import WebsocketCommunicator
from django.test import TestCase
from config.asgi import application  # Update to your routing module
from django.db import transaction
import asyncio
import aiohttp


class TournamentConsumerTest(TestCase):

    #async def test_websocket_connect(self):

    #    communicator1 = WebsocketCommunicator(
    #        application, "ws/tournament/room_name1/")
    #    communicator2 = WebsocketCommunicator(
    #        application, "ws/tournament/room_name1/")

    #    connected, subprotocol = await communicator1.connect()
    #    self.assertTrue(connected)

    #    connected, subprotocol = await communicator2.connect()
    #    self.assertTrue(connected)

    #    # Disconnect
    #    await communicator1.disconnect()
    #    await communicator2.disconnect()

    #async def test_message_tournament(self):
    #    communicator1 = WebsocketCommunicator(
    #        application, "ws/tournament/room_name1/")
    #    communicator2 = WebsocketCommunicator(
    #        application, "ws/tournament/room_name1/")

    #    connected, subprotocol = await communicator1.connect()
    #    self.assertTrue(connected)

    #    connected, subprotocol = await communicator2.connect()
    #    self.assertTrue(connected)

    #    message = {
    #        "action": "message",
    #        "sender": "player1",
    #        "message": "Hello Player2"
    #    }
    #    await communicator1.send_json_to(message)


    #    response2 = await communicator2.receive_json_from()
    #    assert response2['message'] == 'Hello Player2'

    #    await communicator1.disconnect()
    #    await communicator2.disconnect()



    async def test_tournament(self):
        ws = "ws/tournament/tournament_test/"

        communicators = []
        joined = []
        
        communicators = [
            WebsocketCommunicator(application, ws),
            WebsocketCommunicator(application, ws),
            WebsocketCommunicator(application, ws),
            WebsocketCommunicator(application, ws),
        ]
    
        for comm in communicators:
            connected, subprotocol = await comm.connect()
            self.assertTrue(connected)

        for i, comm in enumerate(communicators):
            message = {
                "action": "create_or_join",
                "tournament_name": "tournament_test",
                "nickname": "player" + str(i)
            }
            await comm.send_json_to(message)
            joined.append(comm)
            for comm in joined:
                response = await comm.receive_json_from()
                assert response['type'] == 'create' or 'join'
        
        rooms = {}
        message = {
            "action": "start_tournament",
        }
        await communicators[0].send_json_to(message)
        for i, comm in enumerate(joined):
            response = await comm.receive_json_from()
            assert response['type'] == "match"
            room = response["room"]
            if room not in rooms:
                rooms[room] = comm
            assert response['player2'] != "No opponent"
            assert response['room'] != "No room"
            response = await comm.receive_json_from()
            assert response['type'] == "start"

        winners = await self.get_game_state_for_rooms(rooms)
        print(winners)

        for room, comm in rooms:
            message = {
                "action": "winner",
                "winner": winners[room],
            }
            await comm.send_json_to(message)
            response = await comm.receive_json_from()
            print(response)
            assert response['type'] == "message"





    async def get_game_state_for_rooms(self, rooms):
        winners = {}
        async with aiohttp.ClientSession() as session:
            tasks = []
            for room in rooms:
                tasks.append(self.fetch_game_state(session, room, winners))

            await asyncio.gather(*tasks)
        return winners

    async def fetch_game_state(self, session, room, winners):
        url = f"http://pong-game:8000/pong/pong/game_state/{room}"
        while True:
            async with session.post(url) as response:
                if response.status == 200:
                    data = await response.json()
                    if "winner" in data and data["winner"]:
                        winners[room] = data['winner']
                        break
                else:
                    print(f"Failed to fetch data for {url}, Status: {response.status}")
            await asyncio.sleep(0.05)
        return winners




        #for comm in communicators:
        #    await comm.disconnect()




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


