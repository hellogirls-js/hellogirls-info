import dayjs from "dayjs";

import styles from "@/styles/MDXLayout.module.scss";
import { Link } from "@remix-run/react";

export default function PostInfo({ meta }: { meta: PostMeta }) {
  return (
    <div className={styles.postInfo}>
      <span>
        written by: <Link to={meta.url}>{meta.author}</Link>
      </span>
      {meta.dateCreated && (
        <div>{dayjs(meta.dateCreated).format("MM/DD/YYYY h:mma")}</div>
      )}
      {meta.dateUpdated && meta.dateCreated !== meta.dateUpdated && (
        <div>
          last updated: {dayjs(meta.dateUpdated).format("MM/DD/YYYY h:mma")}
        </div>
      )}
    </div>
  );
}
