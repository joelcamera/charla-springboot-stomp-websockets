"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { Modal } from "@/app/modal/modal";
import { Chat } from "@/app/chat/chat";


export default function Home() {
  const [nombre, setNombre] = useState("");
  const [mostrarModal, setMostrarModal] = useState(true);

  const onClickAgregarNombre = (nombre) => {
    setNombre(nombre);
    setMostrarModal(false);
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.titulo}>mIRCo</h1>
        <Chat encendido={!mostrarModal} nombre={nombre} />
      </div>
      <Modal mostrarModal={mostrarModal} onClickAgregarNombre={onClickAgregarNombre}/>
    </div>
  );
}
