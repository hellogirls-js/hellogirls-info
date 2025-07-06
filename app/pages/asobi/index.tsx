import React from "react";
import AsobiLayout from "@/layouts/AsobiLayout";
import { Link } from "react-router";


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
