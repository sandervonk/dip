import styles from "./CenterImage.module.scss";
import { motion } from "motion/react";
import { ColorText } from "@/app/constants";
export default function CenterImage(
  props: Readonly<{
    data: {
      images: Array<{
        src: string;
        alt: string;
        blurbs: string[];
      }>;
    };
  }>
) {
  const images = props.data.images;

  return (
    <motion.div className={styles.container}>
      {images.map((image, i) => (
        <div key={i} className={styles.imageContainer}>
          <img src={image.src} alt={image.alt} className={styles.image} />
        </div>
      ))}
      {images.map((image, i) => (
        <div key={i} className={styles.imageContainer}>
          <img src={image.src} alt={image.alt} className={styles.image} />
        </div>
      ))}
      <div className={styles.blurbContainer}>
        {images.map((image, j) => (
          <div
            key={j}
            className={`${styles.blurbGroup} ${
              j % 2 === 0 ? styles.evenNum : styles.evenNum
            }`}
          >
            {image.blurbs.map((blurb, k) => (
              <div key={k} className={styles.blurb}>
                {ColorText(blurb)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
    // parent container
    // -> sticky container for images
    // -> -> image for each
    // -> normal container for blurbs
    // -> -> blurb container for image
    // -> -> -> blurb text for each
  );
}
