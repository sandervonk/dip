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

  // Create refs for each blurb group for tracking image visibility
  const blurbGroupRefs = Array(images.length)
    .fill(null)
    .map(() => useRef(null));

  // Create main scroll progress for mobile view
  const { scrollYProgress: mainScrollProgress } = useScroll({
    target: blurbsContainerRef,
    offset: ["-200px end", "end 50px"],
  });

  // Create scroll progress for each blurb group to control image visibility
  const blurbGroupScrollProgress = blurbGroupRefs.map(
    (ref) =>
      useScroll({
        target: ref,
        offset: ["start 70%", "end 30%"],
      }).scrollYProgress
  );

  // Create opacity values for each image based on its blurb group visibility
  // Special handling for first and last images
  const imageOpacityValues = blurbGroupScrollProgress.map((progress, index) => {
    if (index === 0) {
      // First image starts fully visible and fades out as we scroll past
      return useTransform(progress, [0.7, 0.9], [1, 0]);
    } else if (index === images.length - 1) {
      // Last image fades in but never fades out
      return useTransform(progress, [0.1, 0.3], [0, 1]);
    } else {
      // Middle images fade in and out normally
      return useTransform(progress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
    }
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

    return images.map((image, imageIndex) => {
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
        opacity: imageOpacityValues[imageIndex],
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
    imageOpacityValues,
  ]);

  return (
    <motion.div className={styles.container}>
      <div className={styles.imageContainer}>
        {processedImages.map((image, i) => (
          <motion.div
            key={i}
            className={styles.imageWrapper}
            style={{ opacity: image.opacity }}
          >
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
            ref={blurbGroupRefs[j]}
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
