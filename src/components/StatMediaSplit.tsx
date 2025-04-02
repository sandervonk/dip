import { ColorText } from "@/app/constants";
import styles from "./StatMediaSplit.module.scss";
export default function StatMediaSplit(
  props: Readonly<{
    data: {
      statsTitle: string;
      stats: Array<[string, string]>;
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
          {data.stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <h3 className={styles.statNumber}>
                {
                  // stat[0] is the number with decorators like > and %; put them in span.number or span.decor based on if it is a charcter or a number
                  stat[0].split("").map((char, i) => (
                    <span
                      key={i}
                      className={
                        isNaN(parseInt(char)) ? styles.decor : styles.number
                      }
                    >
                      {char}
                    </span>
                  ))
                }
              </h3>
              <p className={styles.statText}>{ColorText(stat[1])}</p>
            </div>
          ))}
        </div>
        <div className={styles.media}>
          {data.media.type === "img" ? (
            <img src={data.media.src} alt={data.media.alt} />
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
