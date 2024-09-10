import { useState } from "react";
import styles from "./modal.module.css";

export const CardIngreso = ({ mostrar, onClickAgregarNombre }) => {
  const [nombre, setNombre] = useState("");

  if (!mostrar) return null;

  const cambiarTexto = (event) => {
    setNombre(event.target.value)
  };

  const teclaPresionada = (event) => {
    if (event.key === "Enter") {
      onClickAgregarNombre(nombre);
    }
  }

  return (
    <div className={styles.modal}>
      <h3 className={styles.titulo}>Ingresar el nombre</h3>
      <input type="text" value={nombre} onChange={cambiarTexto} className={styles.input} onKeyPress={teclaPresionada}/>
      <button
        onClick={() => onClickAgregarNombre(nombre)}
        className={styles.boton}
      >
        Comenzar!
      </button>
    </div>
  );

}