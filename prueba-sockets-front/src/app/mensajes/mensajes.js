"use client";

import styles from "./mensajes.module.css";
import { useState } from "react";

const tipoMensajes = {
  COMUN: "COMUN",
  BROADCAST: "BROADCAST",
  PRIVADO: "PRIVADO",
}

const Texto = ({ texto, className }) => <p className={className}>{texto}</p>;

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
    let className;
    if(mensaje.tipo === tipoMensajes.COMUN) {
      className = styles.mensajeComun;
    } else if(mensaje.tipo === tipoMensajes.BROADCAST) {
      className = styles.mensajeBroadcast;
    } else if(mensaje.tipo === tipoMensajes.PRIVADO) {
      className = styles.mensajePrivado;
    }

    return <Texto texto={mensaje.texto} key={idx} className={className}/>;
  });

  return (
    <div className={styles.chat}>
      {listaMensajes}
    </div>
  );
}