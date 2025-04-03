import { ColorText } from "@/app/constants";
import styles from "./StatMediaSplit.module.scss";
import Image from "next/image";
import { AnimateNumber } from "motion-plus/react";
export default function StatMediaSplit(
  props: Readonly<{
    data: {
      statsTitle: string;
      stats: Array<{
        stat: {
          before?: string;
          number: number;
          after?: string;
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

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{data.statsTitle}</h2>
      <div className={styles.container}>
        <div className={styles.stats}>
          {data.stats.map((entry, i) => (
            <div key={i} className={styles.stat}>
              <h3 className={styles.statNumber}>
                {entry.stat.before && (
                  <span className={styles.decor}>{entry.stat.before}</span>
                )}
                <AnimateNumber className={styles.number}>
                  {entry.stat.number}
                </AnimateNumber>
                {entry.stat.after && (
                  <span className={styles.decor}>{entry.stat.after}</span>
                )}
              </h3>
              <p className={styles.statText}>{ColorText(entry.text)}</p>
            </div>
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
    </div>
  );
}
