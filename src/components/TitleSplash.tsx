export default function TitleSplash(
  props: Readonly<{
    data: {
      primary: string;
      secondary: string;
      image: string;
    };
  }>
) {
  const { data } = props;
  return (
    <div className="title-splash">
      <h1 className={styles.primary}>{data.primary}</h1>
      <h2 className={styles.secondary}>{data.secondary}</h2>
      <img className={styles.image} src={data.image} alt="Title Card Image" />
    </div>
  );
}
