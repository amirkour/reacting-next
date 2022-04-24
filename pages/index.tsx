import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div>hi world</div>
      <div>
        <Link href="/tic-tac-toe">
          <a>Play Tac Tac Toe!</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
