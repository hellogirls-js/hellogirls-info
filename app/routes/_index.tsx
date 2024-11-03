import React from "react";
import Profile from "@/components/Home/Profile";
import MainLayout from "@/layouts/MainLayout";
import { json, type MetaFunction } from "@remix-run/node";

import styles from "@/styles/Home.module.scss";
import Tech from "@/components/Home/Tech";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "welcome! ♡ hellogirls.info" },
    { name: "son", content: "welcome to son's personal website!" },
  ];
};

export async function loader() {
  return json({birthday: process.env.BIRTHDAY});
}

export async function clientLoader({serverLoader}: ClientLoaderFunctionArgs) {
  const data = await serverLoader();
  return data as Env;
}
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <MainLayout heading="loading...">Loading...</MainLayout>;
}

export default function Index() {
  const env = useLoaderData<typeof clientLoader>();
  const birthday = React.useRef((env as {birthday: string | undefined}).birthday ?? "");
  const { colorTheme } = React.useContext(DarkModeContext);

  return (
    <MainLayout heading="welcome!">
      <div className={styles[colorTheme]}>
        <Profile birthday={birthday.current} {...{styles}} />
        <Tech {...{styles}} />
      </div>
    </MainLayout>
  );
}

