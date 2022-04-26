import Link from "next/link";
import React from "react";

interface DefaultProps {
  children: React.ReactNode;
}

export const DefaultContainer = ({ children }: DefaultProps) => (
  <div className="container">{children}</div>
);

export const DefaultNav = () => {
  return (
    <>
      <nav className="py-4 px-8">
        <Link href="/">
          <a className="mx-4">Home</a>
        </Link>
        <Link href="/tic-tac-toe">
          <a className="mx-4">Play Tac Tac Toe!</a>
        </Link>
        <Link href="/L2MoveDivs">
          <a className="mx-4">Learn to move divs!?</a>
        </Link>
      </nav>
    </>
  );
};

const DefaultLayout = ({ children }: DefaultProps) => (
  <DefaultContainer>
    <DefaultNav />
    {children}
  </DefaultContainer>
);

export default DefaultLayout;
