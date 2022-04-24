import Link from "next/link";
import React from "react";

interface DefaultProps {
  children: React.ReactNode;
}

export const DefaultContainer = ({ children }: DefaultProps) => {
  return (
    <>
      <div className="container">{children}</div>
      <style jsx>{`
        .container {
          margin: 0 auto;
          max-width: 1200px;
        }
      `}</style>
    </>
  );
};

export const DefaultNav = () => {
  return (
    <>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/tic-tac-toe">
          <a>Play Tac Tac Toe!</a>
        </Link>
      </nav>
      <style jsx>{`
        nav {
          padding: 1rem 2rem;
        }
        a {
          margin: 0 1rem;
        }
      `}</style>
    </>
  );
};

const DefaultLayout = ({ children }: DefaultProps) => {
  return (
    <>
      <DefaultContainer>
        <DefaultNav />
        {children}
      </DefaultContainer>
    </>
  );
};

export default DefaultLayout;
