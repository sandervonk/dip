import styles from "./TitleSplash.module.scss";
import Image, { StaticImageData } from "next/image";
import { motion, MotionConfig, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
export default function TitleSplash(
  props: Readonly<{
    data: {
      primary: string[3];
      secondary: string;
      image: string | StaticImageData;
    };
  }>
) {
  const { data } = props;
  const container = useRef(null);
  const primary = useRef(null);
  const secondary = useRef(null);
  const { scrollYProgress } = useScroll({
    target: primary,
    offset: ["center center", "start 50px"],
  });
  const opacity = useTransform(scrollYProgress, [0.25, 1], [1, 0.75]);
  return (
    <motion.div
      className={styles.container}
      ref={container}
      style={{ opacity }}
    >
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
        <MotionConfig
          transition={{ delay: 1.5, duration: 0.4, ease: "easeInOut" }}
        >
          <motion.span
            className={styles.titleWord}
            initial={{ width: "1em" }}
            animate={{ width: "auto" }}
          >
            {data.primary[0]}
          </motion.span>{" "}
          <span className={styles.titleWord}>{data.primary[1]}</span>{" "}
          <motion.span
            className={styles.titleWord}
            initial={{ width: "0.75em" }}
            animate={{ width: "auto" }}
          >
            {data.primary[2]}
          </motion.span>
        </MotionConfig>
      </motion.h1>
      <motion.h2
        ref={secondary}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className={styles.secondary}
      >
        {data.secondary}
      </motion.h2>
    </motion.div>
  );
}
