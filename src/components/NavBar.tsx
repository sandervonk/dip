"use client";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import styles from "./NavBar.module.scss";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/app/constants";

/**
 * NavBar component, renders a header with a title and navigation links.
 * Pulls in much of its data from the constants file.
 *
 * @returns {JSX.Element} - The NavBar component.
 */
export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 0 && !scrolled) {
      setScrolled(true);
    } else if (y === 0 && scrolled) {
      setScrolled(false);
    }
  });

  return (
    <motion.header
      className={styles.container}
      animate={scrolled ? "scrolled" : "animate"}
      variants={{
        initial: {
          background: "#1E212B00",
          color: "#1E212B",
        },
        animate: {
          background: "#1E212B00",
          color: "#1E212B",
        },
        scrolled: {
          background: "#1E212B",
          color: "#fff",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Link
            href="/"
            onClick={(e) => {
              if (pathname == "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            {nav.title}
          </Link>
        </h1>
        <nav className={styles.nav}>
          <ul>
            {nav.pages.map((page) => (
              <motion.li
                key={page.path}
                className={`${
                  page.path == pathname ? styles.active : undefined
                } ${page.action ? styles.action : undefined}`}
                animate={
                  page.path == pathname
                    ? {
                        opacity: 1,
                        borderBottomColor: "var(--foreground)",
                      }
                    : {
                        opacity: 1,
                      }
                }
              >
                <Link href={page.path}>{page.name}</Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <motion.hr
          className={styles.separator}
          animate={scrolled ? "scrolled" : "animate"}
          variants={{
            initial: {
              width: 0,
              background: "#1E212B",
            },
            animate: {
              width: "min(calc(100vw - 2 * 20px), 800px)",
              background: "#1E212B",
            },
            scrolled: {
              width: "100vw",
              opacity: 0.5,
              background: "#1E212B",
            },
          }}
        ></motion.hr>
      </div>
    </motion.header>
  );
}
