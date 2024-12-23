import { motion } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";

import {
  IconFramer,
  IconMDX,
  IconNextJS,
  IconSass,
} from "@/components/utility/AnimatedIcons";

export default function Tech({ styles }: { styles: CSSModuleClasses }) {
  const TECH_LIST = [
    {
      name: "remix",
      icon: IconNextJS,
      description:
        "remix was used to create the front-end code for this site. this library is built off of react-router.",
    },
    {
      name: "sass",
      icon: IconSass,
      description:
        "sass is a variation of css that allows for more versatility and functionality. this is my first time using sass and i don't see myself going back to vanilla css any time soon.",
    },
    {
      name: "framer motion",
      icon: IconFramer,
      description:
        "this library was used to create the animations present on the site. great for someone like me who is not the best with css animations!",
    },
    {
      name: "mdx",
      icon: IconMDX,
      description:
        "mdx is an upgraded version of markdown that allows for the use of react components in the file. this will be used to create blog-like posts on the site.",
    },
  ];

  function TechItem({ tech, custom }: { tech: any; custom: number }) {
    const isDesktop = useMediaQuery("(min-width: 810px)");

    const ICON_SIZE = isDesktop ? 60 : 50;
    return (
      <motion.div
        className={styles.techItem}
        initial={{ opacity: 0, x: -200 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { delay: custom * 0.5, duration: 0.5 },
        }}
        viewport={{ once: true }}
      >
        <motion.div
          className={styles.techIcon}
          whileHover={{
            scale: 1.4,
            rotate: [null, 90, 0],
            transition: { duration: 0.6, times: [0, 0.6, 1] },
          }}
        >
          <tech.icon size={ICON_SIZE} strokeWidth={1} />
        </motion.div>
        <div className={styles.techName}>{tech.name}</div>
        <div className={styles.techDescription}>{tech.description}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.technologies}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { delay: 0.1, duration: 0.3 } }}
      viewport={{ once: true }}
    >
      <motion.h2
        className={styles.heading2}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.5, duration: 0.5 },
        }}
        viewport={{ once: true }}
      >
      technologies used
      </motion.h2>
      <motion.div
        className={styles.tech}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 1.5, duration: 0.5 } }}
        viewport={{ once: true }}
      >
        {TECH_LIST.map((tech, index) => (
          <TechItem tech={tech} key={tech.name} custom={index + 2} />
        ))}
      </motion.div>
    </motion.div>
  );
}
