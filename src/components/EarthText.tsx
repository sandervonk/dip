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

import {
  easeOut,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
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
    offset: ["start end", "end 50px"],
  });

  const positionKeys: PositionKey[] = ["pan", "pos", "rot", "sun"];

  // Create a normalized input range from the transform values
  const inputRange = data.positions.map((position) => position.transform);

  // Create MotionValues for each axis of each position type
  const [pan, pos, rot, sun] = positionKeys.map((key) => {
    // Determine which axes to use based on the position type
    const axes = key === "pan" ? ["x", "y"] : ["x", "y", "z"];

    // Extract values for this position key from the data
    const values = data.positions.map((position) => position[key]);

    // Create a MotionValue for each axis
    return axes.reduce((acc, axis) => {
      // Extract output range for this axis
      // @ts-expect-error axis is a string that can be used as a key for the data
      const outputRange = values.map((value) => value[axis]);

      // Create motionvalue
      return {
        ...acc,
        // eslint-disable-next-line react-hooks/rules-of-hooks
        [axis as string]: useTransform(
          scrollYProgress,
          inputRange,
          outputRange,
          {
            ease: easeOut,
          }
        ),
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
        animate="visible"
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
          initialPosition={pos as position3D}
          initialRotation={rot as position3D}
          sunPosition={sun as position3D}
          autoRotate={false}
        />
      </motion.div>
    </div>
  );
}
