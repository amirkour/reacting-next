import React from "react";

const L2MoveDivs = () => (
  <>
    <h1 style={{ textAlign: "center" }}>Learn To Move Divs!?</h1>
    <div className="container">
      <div className="box">box 1</div>
      <div className="box">box 2</div>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-evenly;
        border: 2px solid blue;
        @media (min-width: 768px) {
          flex-direction: column;
          align-items: center;
        }
      }

      .box {
        width: 370px;
        height: 370px;
        border: 1px solid red;
      }
    `}</style>
  </>
);

export default L2MoveDivs;
