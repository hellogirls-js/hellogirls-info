import { useContext, useState } from "react";

import styles from "@/styles/Tabs.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import clsx from "clsx";

interface TabContent {
  value: string;
  name: string;
  content: JSX.Element | string;
}

export default function Tabs({
  content,
  defaultValue,
}: {
  content: TabContent[];
  defaultValue?: string;
}) {
  const { colorTheme } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState<TabContent>(
    content.find((c) => c.value === defaultValue) || content[0]
  );

  function TabHeadingItem({ tab }: { tab: TabContent }) {
    return (
      <button
        className={clsx(styles.tabHeadingItem, activeTab.value === tab.value ? styles.active : styles.inactive)}
        onClick={() => {
          setActiveTab(tab);
        }}
      >
        {tab.name}
      </button>
    );
  }

  function TabPanel() {
    return <div className={styles.tabPanel}>{activeTab.content}</div>;
  }

  return (
    <div className={`${styles.tabs} ${styles[colorTheme]}`}>
      <div className={styles.tabHeading}>
        {content.map((c) => (
          <TabHeadingItem key={c.value} tab={c} />
        ))}
      </div>
      <div className={styles.tabContent}>
        <TabPanel />
      </div>
    </div>
  );
}
