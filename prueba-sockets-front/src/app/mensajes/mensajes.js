"use client";

import styles from "./mensajes.module.css";
import { useState } from "react";

const tipoMensajes = {
  COMUN: "COMUN",
  BROADCAST: "BROADCAST",
  PRIVADO: "PRIVADO",
}

const MensajeComun = ({ mensaje }) => {
  return (
    <p className={styles.mensajeComun}>
      {mensaje}
    </p>
  );
};

const MensajeBroadcast = ({ mensaje }) => {
  return (
    <p className={styles.mensajeBroadcast}>
      {mensaje}
    </p>
  );
};

const MensajePrivado = ({ mensaje }) => {
  return (
    <p className={styles.mensajePrivado}>
      {mensaje}
    </p>
  );
};

export function Mensajes() {
  const [mensajes, setMensajes] = useState([
    {
      tipo: tipoMensajes.COMUN,
      texto: "[19.07.2016 08:42:28] <tyurderia> b a b a b ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab  ab ab ab",
    },
    {
      tipo: tipoMensajes.PRIVADO,
      texto: "[19.07.2016 08:42:38] [Private] <tyurd> lellel",
    },
    {
      tipo: tipoMensajes.COMUN,
      texto: "[19.07.2016 08:42:38] <tyurd> wazzup",
    },
    {
      tipo: tipoMensajes.BROADCAST,
      texto: "[19.07.2016 08:42:38] <Server> Saludos de su servidor amigue!",
    },
  ])

  const listaMensajes = mensajes.map((mensaje, idx) => {
    if(mensaje.tipo === tipoMensajes.COMUN) {
      return <MensajeComun mensaje={mensaje.texto} key={idx}/>;
    } else if(mensaje.tipo === tipoMensajes.BROADCAST) {
      return <MensajeBroadcast mensaje={mensaje.texto} key={idx}/>;
    } else if(mensaje.tipo === tipoMensajes.PRIVADO) {
      return <MensajePrivado mensaje={mensaje.texto} key={idx}/>;
    }
  });

  return (
    <div className={styles.chat}>
      {listaMensajes}
    </div>
  );
}