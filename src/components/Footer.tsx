"use client";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { motion } from "motion/react";
import { Fragment } from "react";

const links = {
  "/": "Home",
  "/contact": "Connect",
  "/team": "People",
};

/**
 * Footer component
 *
 * @returns {JSX.Element} - The Footer component.
 */
export default function Footer() {
  return (
    <motion.footer className={styles.container}>
      <div className={styles.alt}>
        <span>
          &copy; 2024-{new Date().getFullYear()}. All rights reserved.
        </span>
      </div>
      <div className={styles.links}>
        {/* links with separators between */}

        {Object.entries(links).map(([href, name], i) => (
          <Fragment key={i}>
            {i > 0 && <span className={styles.linkSeparator}></span>}
            <Link className={styles.link} href={href}>
              {name}
            </Link>
          </Fragment>
        ))}
      </div>
      <div className={styles.alt}>
        Website by{" "}
        <Link className={styles.link} href="//svonk.me" target="_blank">
          Sander Vonk
        </Link>
      </div>
    </motion.footer>
  );
}
