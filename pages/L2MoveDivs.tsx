import React, { useState, useRef } from "react";

const width = 80;
const height = 80;
const halfWidth = width / 2;
const halfHeight = height / 2;

const Movable = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  const onMouseDown = () => {
    if (divRef && divRef.current) {
      setClicked(true);
      divRef.current.style.position = "absolute";
    }
  };

  const onMouseUp = (e) => {
    setClicked(false);
  };

  const onMouseMove = (e) => {
    if (!clicked) return;
    if (divRef.current) {
      divRef.current.style.left = e.clientX - halfWidth + "px";
      divRef.current.style.top = e.clientY - halfHeight + "px";
    }
  };

  return (
    <div
      ref={divRef}
      className="bg-green-500 w-20 h-20 cursor-pointer rounded"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    ></div>
  );
};

const L2MoveDivs = () => {
  return (
    <>
      <h1 className="text-center">Learn To Move Divs!?</h1>
      <div className="flex flex-col md:flex-row w-full items-center md:justify-evenly border-2 border-blue-600 border-solid">
        <h3>box 1</h3>
        <div className="flex justify-center items-center w-full h-32 md:h-48 my-4 md:my-0 md:mx-4 border-solid border-2 border-red-600">
          <Movable />
        </div>
        <h3>box 2</h3>
        <div className="flex justify-center items-center w-full h-32 md:h-48 my-4 md:my-0 md:mx-4 border-solid border-2 border-red-600"></div>
      </div>
    </>
  );
};

export default L2MoveDivs;
