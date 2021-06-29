import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function DetailPage({ res }) {
  const router = useRouter();
  const semaineId = router.query.id;
  const [selectedWeek, setSelectedWeek] = useState(semaineId);
  const [selectedFile, setSelectedFile] = useState("");

  /*   const logo = require('./logo.jpeg); */

  /*   useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://35.169.149.148:1337/epiceries/`, {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "default",
      }).then((r) => r.json());
      setData(result);
    };

    fetchData();
  }, []); */

  const selectFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    await sendInfoToBD()
      .then(function (res) {
        //handle success
        console.log("info to BD : success");
      })
      .catch(function (err) {
        //handle error
        console.log("info to BD  : failed");
      });

    const myNewFile = new File([selectedFile], `semaine-${selectedWeek}.jpg`, {
      type: selectedFile.type,
    });

    const formData = new FormData();
    formData.append("file", myNewFile);

    await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}api/files`,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then(function (res) {
        //handle success
        console.log("sended pic : success");
      })
      .catch(function (err) {
        //handle error
        console.log("sended pic : failed");
      });
  };

  const sendInfoToBD = async (date) => {
    await fetch(`${process.env.NEXT_PUBLIC_DB_URL}epiceries/${selectedWeek}`, {
      method: "PUT",
      body: JSON.stringify({
        semaine: `${selectedWeek}`,
        url: `/images/semaine-${selectedWeek}.jpg`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <div className={styles.containerId}>
      <h1>Horraire de la semaine {res.semaine} </h1>
      <Link href={`${res.url}`}>
        <Image
          quality={40}
          width={1000}
          height={800}
          src={`${res.url}`}
          alt="horraire"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        ></Image>
      </Link>
      <form>
        <label> image</label>
        <input type="file" accept=".jpg, .jpeg, .png" onChange={selectFile} />
        <button disabled={!selectedFile} onClick={uploadFile}>
          Envoyer image
        </button>
      </form>
    </div>
  );
}

export async function getStaticProps(context) {
  const pid = context.params.id;
  const res = await fetch(`http://35.169.149.148:1337/epiceries/${pid}`).then(
    (r) => r.json()
  );

  return {
    props: {
      res,
    },

    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const data = await fetch("http://35.169.149.148:1337/epiceries/").then((r) =>
    r.json()
  );

  const paths = data.map((page) => ({
    params: { id: page.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}
