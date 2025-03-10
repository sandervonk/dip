import styles from "./TextHeader.module.scss";
import { motion } from "motion/react";
import { ColorText } from "@/app/constants";
export default function TitleSplash(
  props: Readonly<{
    data: {
      section: string;
      header: string;
      text: string;
    };
  }>
) {
  const { data } = props;

  return (
    <motion.div className={styles.container}>
      <h1 className={styles.section}>{data.section}</h1>
      <h2 className={styles.header}>{data.header}</h2>
      <p className={styles.text}>{ColorText(data.text, false)}</p>
    </motion.div>
  );
}
