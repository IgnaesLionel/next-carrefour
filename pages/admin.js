import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function admin() {
  const uploadFile = () => {
    console.log("sended");
  };
  const onFileChange = () => {
    console.log("selectionned");
  };

  return (
    <div className={styles.container}>
      horraire
      <div>
        <input
          type="file"
          onChange={() => {
            onFileChange();
          }}
        />
        <button
          onClick={() => {
            uploadFile();
          }}
        >
          Upload!
        </button>
      </div>
      <footer className={styles.footer}>dev by Lionel Ignaes</footer>
    </div>
  );
}
