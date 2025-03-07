"use client";
// import { motion } from "framer-motion";
import styles from "./page.module.css";
import { pages } from "../app/constants";

export default function Home() {
  return (
    <div className={styles.container}>
      {pages.map((page, i) => {
        const Component = page.component;
        return Component && <Component key={i} data={page.data} />;
      })}
      <div style={{ height: 10000 }}>scroll me</div>
    </div>
  );
}
