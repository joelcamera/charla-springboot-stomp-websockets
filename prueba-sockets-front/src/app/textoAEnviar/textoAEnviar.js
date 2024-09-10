"use client";

import styles from "./textoAEnviar.module.css"
import { useState } from "react";

export function TextoAEnviar({enviar}) {
  const [texto, setTexto] = useState("");

  const cambiarTexto = (event) => {
    setTexto(event.target.value)
  };

  const teclaPresionada = (event) => {
    if (event.key === "Enter") {
      enviar(texto);
      setTexto("");
    }
  }


  return (
    <input type="text" className={styles.textoAEnviar} onChange={cambiarTexto} value={texto}
           onKeyPress={teclaPresionada}/>
  );
}