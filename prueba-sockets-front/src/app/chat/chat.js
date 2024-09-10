"use client";

import styles from "@/app/page.module.css";
import { Mensajes } from "@/app/mensajes/mensajes";
import { Conectados } from "@/app/conectados/conectados";
import { TextoAEnviar } from "@/app/textoAEnviar/textoAEnviar";
import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SocksJS from "sockjs-client";
import { tipoMensajes } from "@/app/mensajes/tipoMensajes";


class StompClient {

  _stompClient;

  constructor({ nombre, nuevoMensajeRecibido, setearUsuariosConectados }) {
    const socket = new SocksJS("http://localhost:8080/websocket");
    this._stompClient = Stomp.over(socket);
    this._nombre = nombre;
    this._nuevoMensajeRecibido = nuevoMensajeRecibido;
    this._setearUsuariosConectados = setearUsuariosConectados;
  }

  connect() {
    this._stompClient.connect({}, () => {
      this._stompClient.subscribe("/topic/public", (mensajeDelBack) => {
        this._nuevoMensajeRecibido(JSON.parse(mensajeDelBack.body));
      });

      this._stompClient.subscribe(`/topic/private/${this._nombre}`, (mensajeDelBack) => {
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


export function Chat({encendido, nombre}) {
  if(!encendido) return null;

  const [mensajes, setMensajes] = useState([]);
  const [conectados, setConectados] = useState([]);
  const [contactoSeleccionado, setContactoSeleccionado] = useState("");

  const nuevoMensajeRecibido = (mensaje) => {
    setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    if(mensaje.tipo === tipoMensajes.JOIN) {
      setConectados(prevState => [...prevState, mensaje.sender]);
    }
  }

  const [stompClient, _] = useState(new StompClient({nombre, nuevoMensajeRecibido, setearUsuariosConectados: setConectados}));

  const enviarMensaje = (texto) => {
    if(contactoSeleccionado !== "") {
      stompClient.sendPrivate(nombre, texto, contactoSeleccionado);
    } else {
      stompClient.send(nombre, texto);
    }
  }

  useEffect(() => {
    stompClient.connect();
    return () => {
      stompClient.disconnect();
    }
  }, [nombre]);


  return <>
    <div className={styles.container}>
      <div className={styles.mensajesYConectados}>
        <Mensajes mensajes={mensajes} />
        <Conectados nombreUsuarie={nombre} conectados={conectados}
                    seleccionarContacto={(contactoSeleccionado) => setContactoSeleccionado(contactoSeleccionado)}
                    contactoSeleccionado={contactoSeleccionado}/>
      </div>
      <TextoAEnviar enviar={enviarMensaje}/>
    </div>
  </>;
}