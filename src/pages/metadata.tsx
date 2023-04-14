import type { NextPage } from "next";
import Head from "next/head";
import { MetadataView } from "../views";

const Metadata: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Safecoin</title>
        <meta
          name="description"
          content="Safecoin"
        />
      </Head>
      <MetadataView />
    </div>
  );
};

export default Metadata;