import { PageParts } from "@/app/constants";
import styles from "./StatMedia.module.scss";
import Image from "next/image";
import Stats, { Stat } from "./Stats";

export interface StatMediaProps extends PageParts {
  data: {
    /** If the content direction should be reversed */
    reverse?: boolean;
    /** The title of the stats section */
    statsTitle: string;
    /** The stats to be displayed */
    stats: Stat[];
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
            <Stats stats={data.stats} styles={styles} />
          </>
        ) : (
          <>
            <Stats stats={data.stats} styles={styles} />
            {renderMedia()}
          </>
        )}
      </div>
    </div>
  );
}
