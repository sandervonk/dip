import styles from "./EarthText.module.scss";

import { TextHeader } from "./TextHeader";
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
  cubicBezier,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
export default function EarthText(
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
  const [showEarth, setShowEarth] = useState(false);
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
            ease: cubicBezier(0.42, 0, 0.58, 1),
          }
        ),
      };
    }, {}) as position3D | position2D;
  });

  const scale = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.67, 0.7],
    [0, 1, 1, 0]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.6, 0.67],
    [0, 1.2, 1.5, 0]
  );
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.7, 0.75],
    [0, 46, 46, 0],
    {
      clamp: false,
    }
  );

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.textSection}
        ref={textRef}
        onViewportEnter={() => setShowEarth(true)}
        onViewportLeave={(entry) =>
          setShowEarth((entry?.boundingClientRect?.top || 0) < 0)
        }
        viewport={{
          amount: "all",
        }}
      >
        <div
          className={styles.markerWrapper}
          style={{
            overflow: "visible",
            height: 200,
          }}
        >
          <motion.svg className={styles.marker} width="100" height="550">
            <motion.circle
              style={{
                strokeDasharray: "60 10",
                strokeDashoffset,
              }}
              cx="50%"
              cy="calc(28.75px + 16px + 81px/2)"
              r="12px"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <motion.circle
              style={{ scale, originX: 0.5, originY: 0.5 }}
              cx="50%"
              cy="calc(28.75px + 16px + 81px/2)"
              r="6px"
              fill="white"
            />
            <motion.line
              style={{
                scaleY,
                originY: 0,
              }}
              x1="50%"
              y1="calc(28.75px + 16px + 81px/2)"
              x2="50%"
              y2="100%"
              stroke="white"
              strokeWidth="2"
            />
          </motion.svg>
        </div>
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
        initial="hidden"
        animate={showEarth ? "visible" : "hidden"}
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
