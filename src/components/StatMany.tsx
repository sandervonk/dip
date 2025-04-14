import { PageParts } from "@/app/constants";
import styles from "./StatMany.module.scss";
import Stats, { Stat } from "./Stats";

type FormatOptions = Omit<Intl.NumberFormatOptions, "notation"> & {
  notation?: Exclude<
    Intl.NumberFormatOptions["notation"],
    "scientific" | "engineering"
  >;
};
export interface StatManyProps extends PageParts {
  data: {
    /** The title of the stats section */
    statsTitle: string;
    /** The stats to be displayed */
    stats: Stat[];
  };
}

/**
 * StatMedia component, renders a title, a set of stats with various
 * text formatting options, and a media element (image or video) with a caption.
 *
 * @param {StatManyProps} props - The props for the StatMany component (props.data).
 * @returns {JSX.Element} - The StatMany component.
 */
export default function StatMedia(props: StatManyProps) {
  const { data } = props;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{data.statsTitle}</h2>
      <div className={styles.container}>
        <Stats stats={data.stats} styles={styles} />
      </div>
    </div>
  );
}
