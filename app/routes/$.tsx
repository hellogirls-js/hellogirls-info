import { DarkModeContext } from "@/contexts/DarkModeContext";
import MainLayout from "@/layouts/MainLayout";
import { useContext } from "react";
import styles from "@/styles/MainLayout.module.scss";

export default function NotFound() {
  const {colorTheme} = useContext(DarkModeContext);
  return (
    <MainLayout heading="404 :(">
      <div className={styles[colorTheme]}>
        <h2>404 :(</h2>
        <p>Page not found</p>
      </div>
    </MainLayout>
  );
}
