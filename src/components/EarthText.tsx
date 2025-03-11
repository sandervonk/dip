import styles from "./EarthText.module.scss";

import TextHeader from "./TextHeader";
import Earth from "./Earth";

export type position2D = { x: MotionValue<number>; y: MotionValue<number> };
export type position3D = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  z: MotionValue<number>;
};
export type PositionData = {
  pan: position2D;
  pos: position3D;
  rot: position3D;
  sun: position3D;
};
type PositionKey = "pan" | "pos" | "rot" | "sun";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
export default function TitleSplash(
  props: Readonly<{
    data: {
      // array of positions (pan, pos, rot, sun, transform coeff) for the earth
      positions: Array<{ transform: number } & PositionData>;
      section: string;
      header: string;
      text: string;
    };
  }>
) {
  const { data } = props;

  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["center center", "start 50px"],
  });
  const positionKeys: PositionKey[] = ["pan", "pos", "rot", "sun"];
  const inputRange = data.positions.map((positions) => positions.transform);
  const [pan, pos, rot, sun] = positionKeys.map((key) => {
    const axis = key === "pan" ? ["x", "y"] : ["x", "y", "z"];
    const values = data.positions.map((positions) => positions[key]);
    return axis.reduce((acc, axis) => {
      //@ts-expect-error axis is a string that can be used as a key for the data
      const range = values.map((value) => value[axis]);
      return {
        ...acc,
        [axis as string]: useTransform(scrollYProgress, inputRange, range),
      };
    }, {}) as position3D | position2D;
  });
  return (
    <div className={styles.container}>
      <motion.div style={{ zIndex: 1, position: "relative" }} ref={textRef}>
        <TextHeader
          data={{
            section: data.section,
            header: data.header,
            text: data.text,
          }}
        />
      </motion.div>
      <motion.div
        className={styles.earthWrapper}
        style={{ zIndex: 0, position: "fixed", bottom: 0, marginTop: "-50vh" }}
        initial="hidden"
        variants={{
          hidden: {
            y: "100%",
          },
          visible: {
            y: 0,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 1,
        }}
      >
        <Earth
          className={styles.earthContainer}
          initialPanning={pan}
          initialPosition={pos}
          initialRotation={rot}
          sunPosition={sun}
          autoRotate={false}
        />
      </motion.div>
    </div>
  );
}
