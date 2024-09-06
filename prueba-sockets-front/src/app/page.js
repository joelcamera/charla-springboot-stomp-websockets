import styles from "./page.module.css";
import { Chat } from "@/app/chat/chat";

export default function Home() {
  return (
    <div>
      <h1 className={styles.titulo}>mIRCo</h1>
      <Chat />
    </div>
  );
}
