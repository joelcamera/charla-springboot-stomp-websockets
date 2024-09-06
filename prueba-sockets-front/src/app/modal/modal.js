import { useState } from "react";
import styles from "./modal.module.css";
export const Modal = ({ mostrarModal, onClickAgregarNombre }) => {
  const [nombre, setNombre] = useState("");

  if(!mostrarModal) return null;

  const cambiarTexto = (event) => {
    setNombre(event.target.value)
  };

  return (
    <div className={styles.modal}>
      <h3 className={styles.titulo}>Ingresar el nombre</h3>
      <input type="text" value={nombre} onChange={cambiarTexto} className={styles.input}/>
      <button
        onClick={() => onClickAgregarNombre(nombre)}
        className={styles.boton}
      >
        Comenzar!
      </button>
    </div>
  );

}