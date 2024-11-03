import { useContext } from "react";

import styles from "@/styles/Breadcrumbs.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import { Link } from "@remix-run/react";

export default function Breadcrumbs({
  title,
  pageId,
}: {
  title: string;
  pageId: number;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  return (
    <div className={`${styles.breadcrumbs} ${styles[colorTheme]}`}>
      <Link to="/">home</Link> / <Link to="/posts">posts</Link> /{" "}
      <Link to={`/posts/${pageId}`}>{title}</Link>
    </div>
  );
}
