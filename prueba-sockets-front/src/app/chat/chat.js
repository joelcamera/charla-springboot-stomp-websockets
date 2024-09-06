import styles from "@/app/page.module.css";
import { Mensajes } from "@/app/mensajes/mensajes";
import { Conectados } from "@/app/conectados/conectados";
import { TextoAEnviar } from "@/app/textoAEnviar/textoAEnviar";

export function Chat() {
  return <>
    <div className={styles.container}>
      <div className={styles.mensajesYConectados}>
        <Mensajes/>
        <Conectados/>
      </div>
      <TextoAEnviar/>
    </div>
  </>;
}