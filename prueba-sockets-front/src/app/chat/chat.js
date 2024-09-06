import styles from "@/app/page.module.css";
import { Mensajes } from "@/app/mensajes/mensajes";
import { Conectados } from "@/app/conectados/conectados";
import { TextoAEnviar } from "@/app/textoAEnviar/textoAEnviar";

export function Chat({encendido, nombre}) {
  if(!encendido) return null;

  return <>
    <div className={styles.container}>
      <div className={styles.mensajesYConectados}>
        <Mensajes/>
        <Conectados nombreUsuarie={nombre}/>
      </div>
      <TextoAEnviar/>
    </div>
  </>;
}