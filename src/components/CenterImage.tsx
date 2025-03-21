/* eslint-disable react-hooks/rules-of-hooks */

import styles from "./CenterImage.module.scss";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { ColorText, useMediaQuery } from "@/app/constants";
import { useRef, useMemo } from "react";
import Image from "next/image";

export default function CenterImage(
  props: Readonly<{
    data: {
      images: Array<{
        src: string;
        alt: string;
        blurbs: string[];
        startLeft?: boolean;
      }>;
    };
  }>
) {
  // Get initial data
  const images = props.data.images;
  const isMobile = useMediaQuery("(max-width: 750px)");

  // Calculate total number of blurbs for scroll heights
  const totalBlurbCount = images.reduce(
    (sum, image) => sum + image.blurbs.length,
    0
  );

  // Create refs for scroll containers
  const blurbsContainerRef = useRef(null);

  // Create main scroll progress for mobile view
  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: blurbsContainerRef,
    offset: ["-200px end", "end 50px"],
  });

  // Create scroll height template for mobile
  const blurbScrollHeight = useMotionTemplate`${totalBlurbCount * 50}dvh`;

  // Pre-create ALL required refs and motion values
  // This ensures consistent hook ordering
  const blurbRefs = Array(totalBlurbCount)
    .fill(null)
    .map(() => useRef(null));

  // Create ALL scroll progress values for desktop view
  const desktopScrollProgressValues = blurbRefs.map(
    (ref) =>
      useScroll({
        target: ref,
        offset: ["start 70%", "end 30%"],
      }).scrollYProgress
  );

  // Create ALL mobile basis motion values
  const mobileBasisValues = Array(totalBlurbCount)
    .fill(null)
    .map((_, i) =>
      useTransform(
        mainScrollProgress,
        [i / totalBlurbCount, (i + 1) / totalBlurbCount],
        [0, 1]
      )
    );

  // Create transform, opacity, and userSelect motion values for BOTH mobile and desktop
  const mobileTransformValues = mobileBasisValues.map((basis) =>
    useTransform(basis, [0, 0.25, 0.75, 1], [10, 5, -5, -30])
  );

  const mobileOpacityValues = mobileBasisValues.map((basis) =>
    useTransform(basis, [0, 0.25, 0.75, 0.85, 1], [0, 1, 1, 0.2, 0])
  );

  const mobileUserSelectValues = mobileBasisValues.map((basis) =>
    useTransform(basis, [0, 0.25, 0.75, 1], ["none", "unset", "unset", "none"])
  );

  const desktopTransformValues = desktopScrollProgressValues.map((basis) =>
    useTransform(basis, [0, 0.25, 0.75, 1], [0, 0, 0, 0])
  );

  const desktopOpacityValues = desktopScrollProgressValues.map((basis) =>
    useTransform(basis, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0])
  );

  const desktopUserSelectValues = desktopScrollProgressValues.map((basis) =>
    useTransform(basis, [0, 0.25, 0.75, 1], ["none", "unset", "unset", "none"])
  );

  // Process the images data structure
  const processedImages = useMemo(() => {
    let isLeft = true;
    let globalBlurbIndex = 0;

    return images.map((image) => {
      const startLeft = isLeft;
      // Toggle left/right based on number of blurbs
      isLeft = image.blurbs.length % 2 === 0 ? isLeft : !isLeft;

      const processedBlurbs = image.blurbs.map((blurbText) => {
        const index = globalBlurbIndex;
        globalBlurbIndex++;

        return {
          text: blurbText,
          index,
          ref: blurbRefs[index],
          motion: {
            basis: isMobile
              ? mobileBasisValues[index]
              : desktopScrollProgressValues[index],
            transform: isMobile
              ? mobileTransformValues[index]
              : desktopTransformValues[index],
            opacity: isMobile
              ? mobileOpacityValues[index]
              : desktopOpacityValues[index],
            userSelect: isMobile
              ? mobileUserSelectValues[index]
              : desktopUserSelectValues[index],
          },
        };
      });

      return {
        ...image,
        startLeft,
        blurbs: processedBlurbs,
      };
    });
  }, [
    images,
    isMobile,
    mobileBasisValues,
    mobileTransformValues,
    mobileOpacityValues,
    mobileUserSelectValues,
    desktopScrollProgressValues,
    desktopTransformValues,
    desktopOpacityValues,
    desktopUserSelectValues,
  ]);

  return (
    <motion.div className={styles.container}>
      <div className={styles.imageContainer}>
        {processedImages.map((image, i) => (
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
        ref={blurbsContainerRef}
        style={
          isMobile ? { height: blurbScrollHeight, marginBottom: "100dvh" } : {}
        }
      >
        {processedImages.map((image, j) => (
          <div
            key={j}
            className={`${styles.blurbGroup} ${
              image.startLeft ? styles.startLeft : styles.startRight
            }`}
          >
            {image.blurbs.map((blurb, k) => (
              <motion.div
                key={k}
                ref={blurb.ref}
                className={styles.blurb}
                style={{
                  opacity: blurb.motion.opacity,
                  y: blurb.motion.transform,
                  userSelect: blurb.motion.userSelect,
                }}
              >
                {ColorText(blurb.text)}
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
