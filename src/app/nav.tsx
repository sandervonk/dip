"use client";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import styles from "./nav.module.scss";
import { useState } from "react";
export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 0 && !scrolled) {
      setScrolled(true);
    } else if (y === 0 && scrolled) {
      setScrolled(false);
    }
  });

  const pages = {
    "/": "About",
    "/contact": "Connect",
  };

  return (
    <motion.header
      className={styles.container}
      animate={scrolled ? "scrolled" : "animate"}
      variants={{
        initial: {},
        animate: {},
        scrolled: {
          background: "#ffffff15",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>World x Change</h1>
        <nav className={styles.nav}>
          <ul>
            {Object.entries(pages).map(([path, name]) => (
              <li key={path}>
                <Link href={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <motion.hr
          className={styles.separator}
          animate={scrolled ? "scrolled" : "animate"}
          variants={{
            initial: { width: 0 },
            animate: {
              width: "min(100vw, 800px)",
            },
            scrolled: {
              width: "100vw",
            },
          }}
        ></motion.hr>
      </div>
    </motion.header>
  );
}
