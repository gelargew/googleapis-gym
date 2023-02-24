"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

const fetchTest = async () => {
  const res = await fetch("/api/test_google");
  const data = await res.json();
  console.log(data);
};

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 onClick={fetchTest}>TEST</h1>
    </main>
  );
}
