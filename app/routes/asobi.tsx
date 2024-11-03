import AsobiLayout from "@/layouts/AsobiLayout";
import { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "ASOBI! ♡ hellogirls.info" },
    {
      name: "son",
      content:
        "ASOBI! is a collection of games inspired by the Asobi circle in Ensemble Stars.",
    },
  ];
};

export default function Asobi() {
  return (
    <AsobiLayout title="Welcome!">
      <div
        style={{
          width: "min(100%, 810px)",
          margin: "auto",
          boxSizing: "border-box",
          padding: "2%",
        }}
      >
        <Link to="/asobi/madlibs">
          <h3>Mad Libs!</h3>
        </Link>
        <Link to="/asobi/ninjaman">
          <h3>Ninjaman!</h3>
        </Link>
      </div>
    </AsobiLayout>
  );
}
