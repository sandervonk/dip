import styles from "./CenterImage.module.scss";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { ColorText, useMediaQuery } from "@/app/constants";
import { useRef } from "react";
import Image from "next/image";
//* Disable react-hooks/rules-of-hooks for this file (until restructure)
/* eslint-disable react-hooks/rules-of-hooks */
export default function CenterImage(
  props: Readonly<{
    data: {
      images: Array<{
        src: string;
        alt: string;
        blurbs:
          | string[]
          | {
              text: string;
              index: number;
              ref: null | React.Ref<HTMLDivElement>;
              motion: {
                basis: MotionValue<number>; // mostly for reference
                transform: MotionValue<number>; // for mobile only
                opacity: MotionValue<number>;
                userSelect: MotionValue<string>;
              };
            }[];
        startLeft?: boolean;
      }>;
    };
  }>
) {
  const images = props.data.images;

  const isMobile = useMediaQuery("(max-width: 750px)");
  const blurbs = useRef(null);
  const blurbScrollProgress = useScroll({
    target: blurbs,
    offset: ["-200px end", "end 50px"],
  }).scrollYProgress;
  // Add properties to each blurb
  let isLeft = true,
    blurbIndex = 0;
  const numBlurbs = images.reduce((acc, image) => acc + image.blurbs.length, 0);
  const blurbScrollHeight = useMotionTemplate`${numBlurbs * 50}vh`;
  images.forEach((image) => {
    image.startLeft = isLeft;
    isLeft = image.blurbs.length % 2 === 0 ? isLeft : !isLeft;
    image.blurbs.forEach((blurb, i) => {
      if (typeof blurb === "string") {
        const blurbRef = useRef(null);
        const mobileBasis = useTransform(
          blurbScrollProgress,
          [blurbIndex / numBlurbs, (blurbIndex + 1) / numBlurbs],
          [0, 1]
        );
        const desktopBasis = useScroll({
          target: blurbRef,
          offset: ["start 70%", "end 30%"],
        }).scrollYProgress;
        const basis = isMobile ? mobileBasis : desktopBasis;

        image.blurbs[i] = {
          index: blurbIndex,
          text: blurb as string,
          ref: blurbRef,
          motion: {
            basis: basis,
            transform: useTransform(
              basis,
              [0, 0.25, 0.75, 1],
              [50, 10, -10, 1]
            ),
            opacity: useTransform(basis, [0, 0.25, 0.75, 1], [0, 1, 1, 0]),
            userSelect: useTransform(
              basis,
              [0, 0.25, 0.75, 1],
              ["none", "unset", "unset", "none"]
            ),
          },
        };
        blurbIndex += 1;
      }
    });
  });

  return (
    <motion.div className={styles.container}>
      <div className={styles.imageContainer}>
        {images.map((image, i) => (
          <motion.div key={i} className={styles.imageWrapper}>
            <Image
              src={image.src}
              alt={image.alt}
              className={styles.image}
              width="500"
              height="500"
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        className={styles.blurbContainer}
        ref={blurbs}
        style={isMobile ? { height: blurbScrollHeight } : {}}
      >
        {images.map((image, j) => (
          <div
            key={j}
            className={`${styles.blurbGroup} ${
              image.startLeft ? styles.startLeft : styles.startRight
            }`}
          >
            {image.blurbs.map((blurb, k) =>
              typeof blurb == "string" ? (
                <div key={k} className={styles.blurb}></div>
              ) : (
                <motion.div
                  key={k}
                  ref={blurb.ref}
                  className={styles.blurb}
                  style={{
                    opacity: 1, //blurb.motion.opacity,
                    y: blurb.motion.transform,
                    userSelect: blurb.motion.userSelect,
                  }}
                >
                  {ColorText(typeof blurb == "string" ? blurb : blurb.text)}
                </motion.div>
              )
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
