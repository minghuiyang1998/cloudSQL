import React from "react";
import Tree from "../../components/Tree";
import style from "./index.scss";

export default function Home() {
  return (
    <>
      <style jsx>{style}</style>
      <h1 className="text">home</h1>
      <Tree />
    </>
  );
}
