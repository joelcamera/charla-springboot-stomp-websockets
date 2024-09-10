"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { CardIngreso } from "@/app/cardIngreso/cardIngreso";
import { Chat } from "@/app/chat/chat";


export default function Home() {
  const [nombre, setNombre] = useState("");
  const [mostrarCardIngreso, setMostrarCardIngreso] = useState(true);

  const onClickAgregarNombre = (nombre) => {
    setNombre(nombre);
    setMostrarCardIngreso(false);
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.titulo}>mIRCo</h1>
        {!mostrarCardIngreso && <Chat nombre={nombre}/>}
      </div>
      <CardIngreso mostrar={mostrarCardIngreso} onClickAgregarNombre={onClickAgregarNombre}/>
    </div>
  );
}
