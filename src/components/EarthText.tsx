import styles from "./EarthText.module.scss";

import TextHeader from "./TextHeader";
import Earth from "./Earth";

import { motion } from "motion/react";
export default function TitleSplash(
  props: Readonly<{
    data: {
      position3D: {};
      section: string;
      header: string;
      text: string;
    };
  }>
) {
  const { data } = props;
  return (
    <div className={styles.container}>
      <TextHeader
        data={{
          section: data.section,
          header: data.header,
          text: data.text,
        }}
      />
      <motion.div
        className={styles.earthWrapper}
        style={{ zIndex: 0, position: "sticky", top: 0, marginTop: "-50vh" }}
      >
        <Earth
          className={styles.earthContainer}
          initialPanning={{ x: 0, y: 1.25 }}
          initialPosition={{ x: 0.5, y: 0, z: 2 }}
          initialRotation={{ x: 0, y: 0, z: 0 }}
          sunPosition={{ x: 1, y: 2, z: 2 }}
          autoRotate={false}
        />
      </motion.div>
    </div>
  );
}
