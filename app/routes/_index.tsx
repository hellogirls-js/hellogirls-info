import React from "react";
import Profile from "@/components/Home/Profile";
import MainLayout from "@/layouts/MainLayout";
import {
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";

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

export async function loader({ context }: LoaderFunctionArgs) {
  console.log("birthday: ", context.cloudflare.env.BIRTHDAY);
  return json({ BIRTHDAY: context.cloudflare.env.BIRTHDAY });
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const data = await serverLoader();
  return data as Env;
}
clientLoader.hydrate = true;

export function HydrateFallback() {
  return <MainLayout>Loading...</MainLayout>;
}

export default function Index() {
  const env = useLoaderData<typeof clientLoader>();
  const birthday = React.useRef((env as Env).BIRTHDAY ?? "");
  const { colorTheme } = React.useContext(DarkModeContext);

  React.useEffect(() => {
    if (env.BIRTHDAY?.length) birthday.current = env.BIRTHDAY;
  }, [env]);

  return (
    <MainLayout heading="welcome!">
      <div className={styles[colorTheme]}>
        <Profile birthday={birthday.current} {...{ styles }} />
        <Tech {...{ styles }} />
      </div>
    </MainLayout>
  );
}
