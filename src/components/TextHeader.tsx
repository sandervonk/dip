import styles from "./TextHeader.module.scss";
import { motion, useScroll, useTransform } from "motion/react";
import { ColorText } from "@/app/constants";
import { useRef } from "react";
export function TextHeader(
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

export default function WrappedTextHeader(
  props: Readonly<{
    data: {
      section: string;
      header: string;
      text: string;
    };
  }>
) {
  const content = useRef(null);
  const { scrollYProgress } = useScroll({
    target: content,
    offset: ["center 55%", "end 50px"],
  });
  const y = useTransform(scrollYProgress, [0, 0.75], ["0%", "50dvh"]);

  return (
    <motion.div className={styles.wrapper} ref={content} style={{ y }}>
      <TextHeader data={props.data} />
    </motion.div>
  );
}
