import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DetailPage({ res }) {
  const router = useRouter();
  const semaineId = router.query.id;

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

  return (
    <div>
      <h1>Horraire de la semaine {res.semaine} </h1>
      <Image
        quality={40}
        width={1000}
        height={800}
        src={`${res.url}`}
        alt="horraire"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      ></Image>
      <
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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const data = await fetch("http://35.169.149.148:1337/epiceries/").then((r) =>
    r.json()
  );
  // Get the paths we want to pre-render based on posts
  const paths = data.map((page) => ({
    params: { id: page.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
