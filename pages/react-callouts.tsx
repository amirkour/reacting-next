import React from "react";
import { NextPage } from "next";

interface CalloutProps {
  className?: string;
}
const Callout = ({ className }: CalloutProps) => {
  return <div className={className}>this is a callout!?</div>;
};

const CalloutDemo = () => {
  return (
    <div className="m-4">
      <button className="w-full">Callout</button>
      <Callout className="my-2 p-2" />
    </div>
  );
};

const ReactCallouts: NextPage = () => {
  return (
    <>
      <h1 className="text-center">Callouts!?</h1>
      <CalloutDemo />
    </>
  );
};

export default ReactCallouts;
