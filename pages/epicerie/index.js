import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

import moment from "moment";
import "moment/locale/fr";

export default function Epicerie({ data }) {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://35.169.149.148:1337/epiceries/");
    };

    fetchData();
  }, []);

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

  moment.locale("fr");
  let now = moment().format();
  let weekNumber = moment(now, "DD-MM-YYYY").isoWeek();
  weekNumber += 1;

  const style1 = {
    border: "2px solid rgba(0, 0, 0, 0.05)",
    borderColor: "#7FFF00",
    background: "green",
    borderRadius: "40px",
    margin: "0  5px",
  };

  const style2 = {
    border: "2px solid rgba(0, 0, 0, 0.05)",
    borderColor: "red",
    background: "#B22222",
    borderRadius: "40px",
    margin: "0  5px",
  };

  return (
    <div className={styles.containerId}>
      <h3>Nous sommes la semaine {`${weekNumber}`}</h3>
      <div className={styles.container}>
        {data.map((semaine) => {
          return (
            <div
              style={
                weekNumber == semaine.semaine
                  ? {
                      background: "rgba(160, 196, 255,0.5)",
                      borderColor: "#0096c7",
                    }
                  : {
                      background: "rgba(160, 196, 255,0.2)",
                      borderColor: "rgba(160, 196, 255,0.3)",
                    }
              }
              className={styles.card}
              key={semaine.semaine}
            >
              <Link href={`/epicerie/${semaine.semaine}`}>
                <p>{`${semaine.semaine}`} </p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles.container2}>
        <form>
          <label> image</label>
          <input type="file" accept=".jpg, .jpeg, .png" onChange={selectFile} />
          <button disabled={!selectedFile} onClick={uploadFile}>
            Envoyer image
          </button>
        </form>

        <select
          name="pets"
          id="pet-select"
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          <option value={selectedWeek} defaultValue={selectedWeek}>
            {selectedWeek}
          </option>
          <option value="01">Semaine 01</option>
          <option value="02">Semaine 02</option>
          <option value="03">Semaine 03</option>
          <option value="04">Semaine 04</option>
          <option value="05">Semaine 05</option>
          <option value="06">Semaine 06</option>
          <option value="07">Semaine 07</option>
          <option value="08">Semaine 08</option>
          <option value="09">Semaine 09</option>
          <option value="10">Semaine 10</option>
          <option value="11">Semaine 11</option>
          <option value="12">Semaine 12</option>
          <option value="13">Semaine 13</option>
          <option value="14">Semaine 14</option>
          <option value="15">Semaine 15</option>
          <option value="16">Semaine 16</option>
          <option value="17">Semaine 17</option>
          <option value="18">Semaine 18</option>
          <option value="19">Semaine 19</option>
          <option value="20">Semaine 20</option>
          <option value="21">Semaine 21</option>
          <option value="22">Semaine 22</option>
          <option value="23">Semaine 23</option>
          <option value="24">Semaine 24</option>
          <option value="25">Semaine 25</option>
          <option value="26">Semaine 26</option>
          <option value="27">Semaine 27</option>
          <option value="28">Semaine 28</option>
          <option value="29">Semaine 29</option>
          <option value="30">Semaine 30</option>
          <option value="31">Semaine 31</option>
          <option value="32">Semaine 32</option>
          <option value="33">Semaine 33</option>
          <option value="34">Semaine 34</option>
          <option value="35">Semaine 35</option>
          <option value="36">Semaine 36</option>
          <option value="37">Semaine 37</option>
          <option value="38">Semaine 38</option>
          <option value="39">Semaine 39</option>
          <option value="40">Semaine 40</option>
          <option value="41">Semaine 41</option>
          <option value="42">Semaine 42</option>
          <option value="43">Semaine 43</option>
          <option value="44">Semaine 44</option>
          <option value="45">Semaine 45</option>
          <option value="46">Semaine 46</option>
          <option value="47">Semaine 47</option>
          <option value="48">Semaine 48</option>
          <option value="49">Semaine 49</option>
          <option value="50">Semaine 50</option>
          <option value="51">Semaine 51</option>
          <option value="52">Semaine 52</option>
          <option value="53">Semaine 53</option>
        </select>
        <footer className={styles.footer}>dev by Lionel Ignaes</footer>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  //ou getServerSideProps pour des données tres dynamique
  //fetch Get Method coté serveur
  const data = await fetch("http://35.169.149.148:1337/epiceries/").then((r) =>
    r.json()
  ); //  stream object  ----> body headers __proto__

  return {
    props: {
      data: data,
    },
    revalidate: 60,
  };
}
