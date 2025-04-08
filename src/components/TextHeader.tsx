import styles from "./TextHeader.module.scss";
import { motion, useScroll, useTransform } from "motion/react";
import { ColorText, PageParts } from "@/app/constants";
import { useRef } from "react";
export interface TextHeaderProps extends PageParts {
  data: {
    /** The section (short 1-3 word summary of the title / text) */
    section: string;
    /** The header (the title of the text) */
    header: string;
    /** The text (the main body copy of the text) */
    text: string;
  };
}

/**
 * TextHeader component, renders a section header with a title and body text.
 *
 * @param {TextHeaderProps} props - The dynamic data (props.data).
 * @returns {JSX.Element} - The TextHeader component.
 */
export function TextHeader(props: TextHeaderProps) {
  const { data } = props;

  return (
    <motion.div className={styles.container}>
      <h1 className={styles.section}>{data.section}</h1>
      <h2 className={styles.header}>{data.header}</h2>
      <p className={styles.text}>{ColorText(data.text, false)}</p>
    </motion.div>
  );
}

export default function WrappedTextHeader(props: TextHeaderProps) {
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
