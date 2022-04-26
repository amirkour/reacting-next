import React from "react";

const L2MoveDivs = () => (
  <>
    <h1 className="text-center">Learn To Move Divs!?</h1>
    <div className="flex flex-col md:flex-row w-full items-center md:justify-evenly border-2 border-blue-600 border-solid">
      <div className="flex justify-center items-center w-full h-32 md:h-48 my-4 md:my-0 md:mx-4 border-solid border-2 border-red-600">
        box 1
      </div>
      <div className="flex justify-center items-center w-full h-32 md:h-48 my-4 md:my-0 md:mx-4 border-solid border-2 border-red-600">
        box 2
      </div>
    </div>
  </>
);

export default L2MoveDivs;
