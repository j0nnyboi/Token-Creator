import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Safecoin</title>
        <meta
          name="description"
          content="Safecoin"
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Basics;
