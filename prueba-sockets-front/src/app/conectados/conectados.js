"use client";

import { useState } from "react";
import styles from "./conectados.module.css";

export function Conectados({nombreUsuarie, conectados, seleccionarContacto, contactoSeleccionado}) {
  const onClickSeleccionar = (contacto) => {
    if(contactoSeleccionado === contacto) {
      seleccionarContacto("");
    } else {
      seleccionarContacto(contacto);
    }
  }

  const listaConectados = conectados.filter(conectado => conectado !== nombreUsuarie).map((conectado, idx) => {
    const className = contactoSeleccionado === conectado ? styles.seleccionado : styles.noSeleccionado;
    return (
      <div key={idx} onClick={() => onClickSeleccionar(conectado)} className={className}>
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