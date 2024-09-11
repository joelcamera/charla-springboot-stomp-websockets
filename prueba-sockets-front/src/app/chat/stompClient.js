import SocksJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { tipoMensajes } from "@/app/mensajes/tipoMensajes";

export class StompClient {

  _stompClient;

  constructor({ nombre, nuevoMensajeRecibido, setearUsuariosConectados }) {
    this._stompClient = Stomp.over(() => new SocksJS("http://localhost:8080/websocket"));
    this._nombre = nombre;
    this._nuevoMensajeRecibido = nuevoMensajeRecibido;
    this._setearUsuariosConectados = setearUsuariosConectados;
  }

  connect() {
    this._stompClient.connect({}, () => {
      this._stompClient.subscribe("/topic/public", (mensajeDelBack) => {
        this._nuevoMensajeRecibido(JSON.parse(mensajeDelBack.body));
      });

      this._stompClient.subscribe(`/queue/private/${this._nombre}`, (mensajeDelBack) => {
        this._nuevoMensajeRecibido(JSON.parse(mensajeDelBack.body));
      });

      this._stompClient.subscribe(`/topic/conectados/${this._nombre}`, (mensajeDelBack) => {
        this._setearUsuariosConectados(JSON.parse(mensajeDelBack.body));
      });

      this._stompClient.send("/app/chat.register", {}, JSON.stringify({sender: this._nombre, type: tipoMensajes.JOIN}));
    });
  }

  disconnect() {
    this._stompClient.disconnect();
  }

  send(sender, texto) {
    this._stompClient.send("/app/chat.send", {}, JSON.stringify({sender, texto, tipo: tipoMensajes.COMUN}));
  }

  sendPrivate(sender, texto, receiver) {
    this._stompClient.send("/app/chat.private", {}, JSON.stringify({sender, texto, tipo: tipoMensajes.PRIVADO, receiver}));
  }
}