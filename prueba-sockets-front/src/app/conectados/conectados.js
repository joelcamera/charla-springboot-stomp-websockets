"use client";

import { useState } from "react";
import styles from "./conectados.module.css";

export function Conectados({nombreUsuarie}) {
  const [conectados, setConectados] = useState([
    "tyurderia",
    "tyurd",
  ]);
  const [seleccionado, setSeleccionado] = useState("empty");

  const seleccionarConectado = (conectado) => {
    setSeleccionado(prevState => prevState === conectado ? "empty" : conectado);
  }

  const listaConectados = conectados.map((conectado, idx) => {
    const className = seleccionado === conectado ? styles.seleccionado : styles.noSeleccionado;
    return (
      <div key={idx} onClick={() => seleccionarConectado(conectado)} className={className}>
        <p className={styles.texto}>{conectado}</p>
      </div>
    );
  });

  return (
    <div className={styles.conectados}>
      <p className={styles.textoUsuarie}>{nombreUsuarie}</p>
      {listaConectados}
    </div>
  );
}