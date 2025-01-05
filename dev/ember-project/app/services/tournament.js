import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TournamentService extends Service {
	@service websockets;
	@service user;
	@service session;
	@service chat;
	@service gameData;
	@service router;

	@tracked currentLobby = null; // Current lobby details
	@tracked currentPlayers = [];
	@tracked playerProfiles = [];
	@tracked admin;
	@tracked playerInTournament = false;
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
		const token = this.session.data.authenticated.access;
		const wsUrl = `wss://localhost/ws/tournament/${tournamentName}/?token=${encodeURIComponent(token)}`;
		console.log("websocket to close:", tournamentName);
		this.websockets.closeSocketFor(wsUrl);
		console.log("websocket closed", this.websockets.sockets);
		
		// Remove event handlers
		this.socketRef.off('open', this.onOpen, this);
		this.socketRef.off('message', this.onMessage, this);
		this.socketRef.off('close', this.onClose, this);

		// Reset WebSocket reference
		this.socketRef = null;
		// Reset state or perform other cleanup as needed
		this.currentLobby = null;
		this.messages = [];
		this.currentPlayers = [];
		this.playerProfiles = [];
		this.playerInTournament = false;
	}

	startTournament = () => {
		const data = {
		  action: 'start_tournament',
		};
		this.sendMessage(data);
	  };

	sendMessage(data) {
		if (this.socketRef) {
			console.log('WebSocket message send:', JSON.stringify(data));
			this.socketRef.send(JSON.stringify(data));
		} else {
			console.error('WebSocket is not connected.');
		}
	}

	onOpen(tournamentName) {
		this.currentLobby = tournamentName;
		this.playerInTournament = true;
	}


	onMessage(event) {
		console.log('WebSocket message received:', event.data);
		const parsedMessage = JSON.parse(event.data);
		switch (parsedMessage.type) {
			case "create":
				this.handleCreate(parsedMessage)
				break;
		
			case "result":
				this.handleResult(parsedMessage)
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
		this.updateCurrentPlayers(parsedMessage);
		this.admin = parsedMessage.admin;
		const data = {
			type: 'tournament',
			from: 'System',
			content: 'You created the Tournament ' + this.currentLobby
		};
		this.chat.messages = [...this.chat.messages, data];
	}

	handleResult(parsedMessage) {
		const data = {
			type: 'tournament',
			from: 'System',
			content: parsedMessage.winner + 'won against ' + parsedMessage.loser + '!'
		};
		this.chat.messages = [...this.chat.messages, data];
	}

	handleJoin(parsedMessage) {
		this.updateCurrentPlayers(parsedMessage);
		this.admin = parsedMessage.admin;
		const data = {
			type: 'tournament',
			from: 'System',
			content: parsedMessage.player + ' joined the Tournament!'
		};
		this.chat.messages = [...this.chat.messages, data];
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
		this.admin = parsedMessage.admin;
		this.currentPlayers = this.currentPlayers.filter(player => player.nickname !== parsedMessage.player);
		const data = {
			type: 'tournament',
			from: 'System',
			content: parsedMessage.player + ' left the Tournament!'
		};
		this.chat.messages = [...this.chat.messages, data];
	}

	handleMatch(parsedMessage) {
		let opponent = parsedMessage.player1;
		if (parsedMessage.player1 === this.user.profile.nickname)
			opponent = parsedMessage.player2;
		const data = {
			type: 'tournament',
			from: 'System',
			content: "Get ready! Your next game is against " + opponent + " and it starts in just 20 seconds!"
		};
		this.chat.messages = [...this.chat.messages, data];
		const roomdata = {
			room_name: parsedMessage.room,
			player1: parsedMessage.player1,
			player2: parsedMessage.player2
		};
		this.gameData.setGameData("tournament", roomdata);
        this.router.transitionTo('pong-game');
	}

	handleTournamentWinner(parsedMessage) {
		
	}

	onClose(event) {
		this.disconnectFromLobby(this.tournamentName);

		console.log('onClose event triggered:', event);
//		this.currentLobby = null;
//		this.player_in_tournament = false;
//		this.currentPlayers = [];
	}

	async updateCurrentPlayers(parsedMessage) {
		if (!this.currentPlayers || this.currentPlayers.length === 0) {
		  this.currentPlayers = await Promise.all(
			parsedMessage.players.map(player => this.fetchUserData(player))
		  );
		} else {
		  const newPlayer = await this.fetchUserData(parsedMessage.player);
		  if (newPlayer) {
			this.currentPlayers = [...this.currentPlayers, newPlayer];
		  }
		}
	  }

	async fetchUserData(nickname) {
		try {
		  const response = await fetch('/users/users/profile-info/', {
			method: 'POST', 
			headers: {
			  Authorization: `Bearer ${this.session.data.authenticated.access}`, 
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ nickname }) 
		  });
	
		  if (!response.ok) {
			throw new Error('Failed to fetch user profile');
		  }
		  const data = await response.json();
		  return (data);
		} catch (error) {
		  console.error('Error fetching user profile:', error);
		}
	  }
}
