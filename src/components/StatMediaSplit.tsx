import { ColorText } from "@/app/constants";
import styles from "./StatMediaSplit.module.scss";
import Image from "next/image";
import { motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useState } from "react";
export default function StatMediaSplit(
  props: Readonly<{
    data: {
      statsTitle: string;
      stats: Array<{
        stat: {
          before?: string;
          number: number;
          after?: string;
          format?: Omit<Intl.NumberFormatOptions, "notation"> & {
            notation?: Exclude<
              Intl.NumberFormatOptions["notation"],
              "scientific" | "engineering"
            >;
          };
        };
        text: string;
      }>;
      media: {
        type: "video" | "img";
        placeholder?: string;
        src: string;
        alt: string;
      };
    };
  }>
) {
  const { data } = props;

  const counts = data.stats.map((entry) => {
    const [viewed, setViewed] = useState(false);
    return { number: entry.stat.number, viewed, setViewed };
  });

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{data.statsTitle}</h2>
      <div className={styles.container}>
        <div className={styles.stats}>
          {data.stats.map((entry, i) => (
            <motion.div
              key={i}
              className={styles.stat}
              onViewportEnter={() => {
                counts[i].setViewed(true);
              }}
              viewport={{
                once: true,
                // wait for halfway through the viewport
                amount: "some",
                margin: "0px 0px -20% 0px",
              }}
            >
              <h3 className={styles.statNumber}>
                <AnimateNumber
                  className={styles.number}
                  format={entry.stat.format || {}}
                  prefix={entry.stat.before}
                  suffix={entry.stat.after}
                  transition={{
                    duration: 0.75,
                  }}
                >
                  {counts[i].viewed ? counts[i].number : 0}
                </AnimateNumber>
              </h3>
              <motion.p
                className={styles.statText}
                initial={{
                  opacity: 0.25,
                  scale: 0.9,
                }}
                animate={counts[i].viewed ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  opacity: {
                    delay: 0.1 * (i + 1),
                    duration: 0.5,
                  },
                  scale: {
                    type: "easeOut",
                    delay: 0.1 * (i + 1),
                    duration: 0.5,
                  },
                }}
              >
                {ColorText(entry.text)}
              </motion.p>
            </motion.div>
          ))}
        </div>
        <div className={styles.media}>
          {data.media.type === "img" ? (
            <Image
              src={data.media.src}
              alt={data.media.alt}
              width={898}
              height={898}
            />
          ) : (
            <video
              src={data.media.src}
              title={data.media.alt}
              controls={true}
              controlsList="nodownload noremoteplayback"
              poster={data.media.placeholder}
            />
          )}
        </div>
      </div>
      <style>{`.number-section-pre, .number-section-post {font-size: var(--decor-size); color: var(--foreground); align-items: center;}`}</style>
    </div>
  );
}
