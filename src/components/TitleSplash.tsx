import styles from "./TitleSplash.module.scss";
import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
export default function TitleSplash(
  props: Readonly<{
    data: {
      primary: string;
      secondary: string;
      image: string;
    };
  }>
) {
  const { data } = props;
  const container = useRef(null);
  const primary = useRef(null);
  const secondary = useRef(null);
  //   const { scrollYProgress } = useScroll({
  //     target: primary,
  //     offset: ["center center", "start 40px"],
  //   });
  return (
    <div className={styles.container} ref={container}>
      <Image
        className={styles.image}
        src={data.image}
        alt="Title Card Image"
        priority
      />
      <motion.h1
        layout
        ref={primary}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={styles.primary}
      >
        {data.primary}
      </motion.h1>
      <motion.h2
        ref={secondary}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className={styles.secondary}
      >
        {data.secondary}
      </motion.h2>
    </div>
  );
}
