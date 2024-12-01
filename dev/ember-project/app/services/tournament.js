import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TournamentService extends Service {
	@service websockets;
	@service user;
	@service session;

	@tracked currentLobby = null; // Current lobby details
	@tracked messages = [];
	@tracked currentPlayers = [];
	socketRef = null;

	@action
	async connectToLobby(tournamentName) {
		const token = this.session.data.authenticated.access;
		const wsUrl = `wss://localhost/ws/tournament/${tournamentName}/?token=${encodeURIComponent(token)}`;
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


	sendMessage(data) {
		if (this.socketRef) {
			this.socketRef.send(JSON.stringify(data));
		} else {
			console.error('WebSocket is not connected.');
		}
	}

	onOpen(tournamentName) {
		const data = {
			action: 'create_or_join', // message/start
			tournament_name: tournamentName,
			username: this.user.profile.nickname,
			message: "",
		};

		console.log('WebSocket connection opened:');
		this.sendMessage(data);
		this.currentLobby = tournamentName;
		console.log(this.currentLobby);
	}

	onMessage(event) {
		console.log('WebSocket message received:', event.data);
		const parsedMessage = JSON.parse(event.data);
		this.messages = [...this.messages, parsedMessage];
		if (parsedMessage.message === "Player added to the tournament.") {
			this.currentPlayers = [...this.currentPlayers, "user"];
		}

	}

	onClose(event) {
		console.log('WebSocket connection closed:', event);
		this.currentLobby = null;
	}
}
