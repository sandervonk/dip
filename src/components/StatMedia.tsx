import { ColorText, PageParts } from "@/app/constants";
import styles from "./StatMedia.module.scss";
import Image from "next/image";
import { motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useState } from "react";

type FormatOptions = Omit<Intl.NumberFormatOptions, "notation"> & {
  notation?: Exclude<
    Intl.NumberFormatOptions["notation"],
    "scientific" | "engineering"
  >;
};
export interface StatMediaProps extends PageParts {
  data: {
    /** If the content direction should be reversed */
    reverse?: boolean;
    /** The title of the stats section */
    statsTitle: string;
    /** The stats to be displayed */
    stats: Array<{
      /** The stat number and its formatting */
      stat: {
        /** The small text that renders above the number line (use VERY sparingly) */
        first?: string;
        /** Symbols that prefix the number on the AnimateNumber line */
        before?: string;
        /** The number that renders and animates up from 0 on the AnimateNumber line */
        number: number;
        /** Symbols that suffix the number on the AnimateNumber line */
        after?: string;
        /** The formatting options for the number */
        format?: FormatOptions;
      };
      /** The main body text for the stat that renders below the number line */
      text: string;
    }>;
    /** The media to be displayed alongside the stats */
    media: {
      /** Path to the source media */
      src: string;
      /** Alt text for if the media cannot load */
      alt: string;
      /** Caption to be shown below the media (optional) */
      caption?: string;
    } & (
      | {
          /** The type of media (video or image) */
          type: "video";
          /** Path to a placeholder/cover image for the video before play */
          placeholder: string;
        }
      | {
          /** The type of media (video or image) */
          type: "img";
        }
    );
  };
}

/**
 * StatMedia component, renders a title, a set of stats with various
 * text formatting options, and a media element (image or video) with a caption.
 *
 * @param {StatMediaProps} props - The props for the StatMedia component (props.data).
 * @returns {JSX.Element} - The StatMedia component.
 */
export default function StatMedia(props: StatMediaProps) {
  const { data } = props;

  const counts = data.stats.map((entry) => {
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const [viewed, setViewed] = useState(false);
    return { number: entry.stat.number, viewed, setViewed };
  });

  const renderStats = () => (
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
          {entry.stat.first && (
            <p className={`${styles.statFirst} gray`}>
              {ColorText(entry.stat.first)}
            </p>
          )}
          <h3 className={styles.statNumber}>
            <AnimateNumber
              className={styles.number}
              format={{ ...entry.stat.format, numberingSystem: "latn" }}
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
  );

  const renderMedia = () => (
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
      {data.media.caption && (
        <p className={styles.caption}>{data.media.caption}</p>
      )}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{data.statsTitle}</h2>
      <div className={styles.container}>
        {data.reverse ? (
          <>
            {renderMedia()}
            {renderStats()}
          </>
        ) : (
          <>
            {renderStats()}
            {renderMedia()}
          </>
        )}
      </div>
      <style>{`.number-section-pre, .number-section-post {font-size: var(--decor-size); color: var(--foreground); align-items: center;}`}</style>
    </div>
  );
}
