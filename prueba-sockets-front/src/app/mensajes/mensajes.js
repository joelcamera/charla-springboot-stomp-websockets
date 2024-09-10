"use client";

import styles from "./mensajes.module.css";
import { tipoMensajes } from "@/app/mensajes/tipoMensajes";

const Texto = ({ texto, className }) => <p className={className}>{texto}</p>;

export function Mensajes({mensajes}) {
  const listaMensajes = mensajes.map((mensaje, idx) => {
    let className;
    if(mensaje.tipo === tipoMensajes.COMUN) {
      className = styles.mensajeComun;
    } else if(mensaje.tipo === tipoMensajes.BROADCAST || mensaje.tipo === tipoMensajes.JOIN || mensaje.tipo === tipoMensajes.LEAVE) {
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