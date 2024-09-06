"use client";

import styles from "./mensajes.module.css";
import { useState } from "react";

const MensajeComun = ({ mensaje }) => {
  return (
    <p className={styles.mensajeComun}>
      {mensaje}
    </p>
  );
};

export function Mensajes() {
  const [mensajes, setMensajes] = useState([
    "[19.07.2016 08:42:28] <tyurderia> b a b a b ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab ab  ab ab ab",
    "[19.07.2016 08:42:38] <tyurd> wazzup",
  ])

  const listaMensajes = mensajes.map((mensaje, idx) =>
    <MensajeComun mensaje={mensaje} key={idx}/>);

  return (
    <div className={styles.chat}>
      {listaMensajes}
    </div>
  );
}