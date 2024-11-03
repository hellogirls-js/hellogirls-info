import React from "react";
import { motion } from "framer-motion";

export default function Strong({
  children,
}: {
  children: JSX.Element | string | number;
}) {
  return <motion.strong whileHover={{ scale: 1.2 }}>{children}</motion.strong>;
}
