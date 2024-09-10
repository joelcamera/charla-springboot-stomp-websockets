"use client";

import styles from "@/app/page.module.css";
import { Mensajes } from "@/app/mensajes/mensajes";
import { Conectados } from "@/app/conectados/conectados";
import { TextoAEnviar } from "@/app/textoAEnviar/textoAEnviar";
import { useEffect, useState } from "react";
import { tipoMensajes } from "@/app/mensajes/tipoMensajes";
import { StompClient } from "@/app/chat/stompClient";


export function Chat({nombre}) {

  const [mensajes, setMensajes] = useState([]);
  const [conectados, setConectados] = useState([]);
  const [contactoSeleccionado, setContactoSeleccionado] = useState("");

  const nuevoMensajeRecibido = (mensaje) => {
    setMensajes(prevMensajes => [...prevMensajes, mensaje]);
    if(mensaje.tipo === tipoMensajes.JOIN) {
      setConectados(prevState => [...prevState, mensaje.sender]);
    } else if(mensaje.tipo === tipoMensajes.LEAVE) {
      setConectados(prevState => prevState.filter(conectado => conectado !== mensaje.sender))
    }
  }

  const [stompClient, _] = useState(new StompClient({
    nombre,
    nuevoMensajeRecibido,
    setearUsuariosConectados: setConectados,
  }));

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