import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TournamentService extends Service {
	@service websockets;
	@service user;
	@service session;
	@service chat;

	@tracked currentLobby = null; // Current lobby details
	@tracked currentPlayers = [];
	socketRef = null;

	@action
	async connectToLobby(tournamentName) {
		const token = this.session.data.authenticated.access;
		const wsUrl = `wss://localhost/ws/tournament/${tournamentName}/?token=${encodeURIComponent(token)}`;
		if (this.socketRef)
		{
			console.log("disconnect");
			this.disconnectFromLobby(this.currentLobby);
		}
		const socket = this.websockets.socketFor(wsUrl);
		// Register WebSocket event handlers
		socket.on('open', () => this.onOpen(tournamentName), this);
		socket.on('message', this.onMessage, this);
		socket.on('close', this.onClose, this);
		this.set('socketRef', socket);
	}

	@action
	async disconnectFromLobby(tournamentName) {
		// Remove event handlers
		this.socketRef.off('open', this.onOpen, this);
		this.socketRef.off('message', this.onMessage, this);
		this.socketRef.off('close', this.onClose, this);

		// Reset WebSocket reference
		this.socketRef = null;

		const token = this.session.data.authenticated.access;
		const wsUrl = `wss://localhost/ws/tournament/${tournamentName}/?token=${encodeURIComponent(token)}`;
		this.websockets.closeSocketFor(wsUrl);
		console.log("websocket1", this.websockets.sockets);

		// Reset state or perform other cleanup as needed
		this.currentLobby = null;
		this.messages = [];
		this.currentPlayers = [];
	}

	startTournament = () => {
		const data = {
		  action: 'start_tournament',
		};
		this.sendMessage(data);
	  };

	sendWinner(winner)
	{
		const data = {
			action: 'winner', // message/start
			winner: winner
		};
		this.sendMessage(data);
	}

	sendMessage(data) {
		if (this.socketRef) {
			this.socketRef.send(JSON.stringify(data));
		} else {
			console.error('WebSocket is not connected.');
		}
	}

	onOpen(tournamentName) {
		const data = {
			action: 'create_or_join',
			tournament_name: tournamentName,
			nickname: this.user.profile.nickname,
		};
		console.log('WebSocket connection opened:');
		this.sendMessage(data);
		this.currentLobby = tournamentName;
		console.log(this.currentLobby);
	}

	onMessage(event) {
		console.log('WebSocket message received:', event.data);
		const parsedMessage = JSON.parse(event.data);
		switch (parsedMessage.type) {
			case "create":
				this.handleCreate(parsedMessage)
				break;
		
			case "join/create":
				this.handleJoin(parsedMessage)
				break;
			
      case "join":
				this.handleJoin(parsedMessage)
				break;

			case "message":
				this.handleMessage(parsedMessage)
				break;
			
			case "leave":
				this.handleLeave(parsedMessage)
				break;

			case "match":
				this.handleMatch(parsedMessage)
				break;

			case "tournament_winner":
				this.handleTournamentWinner(parsedMessage)
				break;
			default:
				// Handle the default case here (if needed)
				break;
		}
	}

	handleCreate(parsedMessage) {
		this.currentPlayers = [...parsedMessage.players];
		const data = {
			type: 'tournament',
			from: 'System',
			content: 'You created the Tournament ' + this.currentLobby
		};
		this.chat.messages = [...this.chat.messages, data];
	}

	handleJoin(parsedMessage) {
    console.log(parsedMessage);
		this.currentPlayers = [...parsedMessage.players];
    console.log(this.currentPlayers);
		const data = {
			type: 'tournament',
			from: 'System',
			content: parsedMessage.player + ' joined the Tournament!'
		};
		this.chat.messages = [...this.chat.messages, data];
    console.log("chat:", this.chat.messages);
	}

	handleMessage(parsedMessage) {
		const data = {
			type: 'tournament',
			from: parsedMessage.sender,
			content: parsedMessage.message
		};
		this.chat.messages = [...this.chat.messages, data];
	}

	handleStart(parsedMessage) {
		const data = {
			type: 'tournament',
			from: 'System',
			content: parsedMessage.message
		};
		this.chat.messages = [...this.chat.messages, data];
	}

	handleLeave(parsedMessage) {
		this.currentPlayers = [...parsedMessage.players];
		const data = {
			type: 'tournament',
			from: 'System',
			content: parsedMessage.player + ' left the Tournament!'
		};
		this.chat.messages = [...this.chat.messages, data];
	}

	handleMatch(parsedMessage) {
		const opponent = parsedMessage.player1;
		if (parsedMessage.player1 === this.user.profile.nickname)
			opponent = parsedMessage.player2;
		const data = {
			type: 'tournament',
			from: 'System',
			content: "Get ready! Your next game is against " + opponent + " and it starts in just 20 seconds!"
		};
		this.chat.messages = [...this.chat.messages, data];
		const roomdata = {
			roomname: parsedMessage.room,
			player1: parsedMessage.player1,
			player2: parsedMessage.player2
		};
		this.gameData.setGameData("tournament", roomdata);
        this.router.transitionTo('pong-game');
	}

	handleTournamentWinner(parsedMessage) {
		
	}

	onClose(event) {
		console.log('WebSocket connection closed:', event);
		this.currentLobby = null;
	}
}
