import styles from "./TitleSplash.module.scss";
import Image, { StaticImageData } from "next/image";
import {
  easeIn,
  motion,
  MotionConfig,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { PageParts } from "@/app/constants";

export interface TitleSplashProps extends PageParts {
  data: {
    /** An array of 3 strings that make up the header (with the outer two expanding) */
    primary: string[]; //string[3]
    /** The secondary text that renders below the header */
    secondary: string;
    /** The image that renders behind the header (faded out until loading is complete) */
    image: string | StaticImageData;
  };
}

/**
 * TitleSplash component, renders a title splash page with a background image and some text.
 * @param props - The props for the TitleSplash component (props.data).
 * @returns {JSX.Element} - The TitleSplash component.
 */
export default function TitleSplash(props: TitleSplashProps) {
  const { data } = props;
  const container = useRef(null);
  const primary = useRef(null);
  const secondary = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: primary,
    offset: ["center center", "start 50px"],
  });
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.75]);
  return (
    <motion.div
      className={styles.container}
      ref={container}
      style={{ opacity }}
    >
      <motion.div
        className={styles.imageWrapper}
        initial="initial"
        animate={loaded ? "show" : "initial"}
        variants={{ initial: { opacity: 0 }, show: { opacity: 1 } }}
        transition={{ duration: 0.5 }}
      >
        <Image
          className={styles.image}
          src={data.image}
          alt="Title Card Image"
          onLoad={() => setLoaded(true)}
          priority
        />
      </motion.div>
      <motion.h1
        layout
        ref={primary}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={styles.primary}
      >
        <div className={styles.words}>
          <MotionConfig
            transition={{
              delay: 1.5,
              duration: 0.4,
              ease: easeIn,
            }}
          >
            <motion.span
              className={styles.titleWord}
              style={{ textAlign: "right" }}
              initial={{ width: "0.7em", marginLeft: "calc(1.59em - 0.7em)" }}
              animate={{
                width: "1.59em",
                marginLeft: 0,
              }}
            >
              {data.primary[0]}
            </motion.span>
            <motion.span
              initial={{ margin: "0 0.1em" }}
              animate={{ margin: " 0 0.25em" }}
              className={styles.titleWord}
            >
              {data.primary[1]}
            </motion.span>
            <motion.span
              className={styles.titleWord}
              style={{ textAlign: "left" }}
              initial={{
                width: "0.58em",
                marginRight: "calc(4.22em - 0.58em)",
              }}
              animate={{ width: "4.22em", marginRight: 0 }}
            >
              {data.primary[2]}
            </motion.span>
          </MotionConfig>
        </div>
      </motion.h1>
      <motion.h2
        ref={secondary}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className={styles.secondary}
      >
        {data.secondary}
      </motion.h2>
    </motion.div>
  );
}
