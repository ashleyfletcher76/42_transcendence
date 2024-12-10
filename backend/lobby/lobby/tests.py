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
                "nickname": "oyuncu" + str(i),
            }
            await comm.send_json_to(message)
            for com in communicators:
                response = await com.receive_json_from()
                print(response)
        

        message = {"action": "start_tournament"}
        await communicators[0].send_json_to(message)
        response = await communicators[0].receive_json_from()
        print(response)
        for comm in communicators:
            response = await comm.receive_json_from()
            print(response)

        print("--------------------------")



        for i, comm in enumerate(communicators):
            message = {
                'action': "winner",
                'winner': "oyuncu" + str(i)
            }
            await comm.send_json_to(message)










    async def get_game_state_for_rooms(self, matches):
        winners = {}
        async with aiohttp.ClientSession() as session:
            tasks = [
                self.fetch_game_state(session, match["room"], winners)
                for match in matches.values()
            ]
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




async def receive_all_responses_concurrently(communicators):
    async def receive_responses(comm, index):
        try:
            response1 = await asyncio.wait_for(comm.receive_json_from(), timeout=10)
            response2 = await asyncio.wait_for(comm.receive_json_from(), timeout=10)
            response3 = await asyncio.wait_for(comm.receive_json_from(), timeout=10)
            response4 = await asyncio.wait_for(comm.receive_json_from(), timeout=10)
            return index, [response1, response2, response3, response4]
        except asyncio.TimeoutError:
            print(f"Timeout for communicator {index}")
            return index, None
        except Exception as e:
            print(f"Error for communicator {index}: {e}")
            return index, None

    tasks = [receive_responses(comm, i) for i, comm in enumerate(communicators)]
    results = await asyncio.gather(*tasks)

    responses = {f"communicator_{index}": responses for index, responses in results if responses}
    return responses

async def receive_all_responses_matches(communicators):
    async def receive_responses(comm, index):
        try:
            response1 = await asyncio.wait_for(comm.receive_json_from(), timeout=10)
            response2 = await asyncio.wait_for(comm.receive_json_from(), timeout=10)
            room = response1.get("room")

            return index, {"room": room, "communicator": comm}
        except asyncio.TimeoutError:
            print(f"Timeout for communicator {index}")
            return index, None
        except Exception as e:
            print(f"Error for communicator {index}: {e}")
            return index, None

    tasks = [receive_responses(comm, i) for i, comm in enumerate(communicators)]
    results = await asyncio.gather(*tasks)

    matches = {f"oyuncu{index}": result for index, result in results if result}

    return matches