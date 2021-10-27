import { useState } from "react";

function Triangle({ position, isAnswer, ...rest }) {
  const points = {
    lefttop: "50,16 85,85 15,85 50,16",
    righttop: "160,16 195,85 125,85 160,16",
    leftbottom: "50,126 85,195 15,195 50,126",
    rightbottom: "160,126 195,195 125,195 160,126"
  };

  const strokes = isAnswer
    ? {
        strokeWidth: "2",
        stroke: "#383E42",
        strokeDasharray: "5 5"
      }
    : {
        strokeWidth: "5",
        stroke: "red"
      };

  return <polygon points={points[position]} {...strokes} {...rest} />;
}

function Circle({ position, isAnswer, ...rest }) {
  const coords = {
    lefttop: { x: 50, y: 50 },
    righttop: { x: 160, y: 50 },
    leftbottom: { x: 50, y: 160 },
    rightbottom: { x: 160, y: 160 }
  };

  const strokes = isAnswer
    ? {
        strokeWidth: "2",
        stroke: "#383E42",
        strokeDasharray: "5 5"
      }
    : {
        strokeWidth: "5",
        stroke: "red"
      };

  return (
    <circle
      cx={coords[position].x}
      cy={coords[position].y}
      r="35"
      {...strokes}
      {...rest}
    />
  );
}

function Rectangle({ position, isAnswer, ...rest }) {
  const coords = {
    lefttop: { x: 15, y: 15 },
    righttop: { x: 125, y: 15 },
    leftbottom: { x: 15, y: 125 },
    rightbottom: { x: 125, y: 125 }
  };

  const strokes = isAnswer
    ? {
        strokeWidth: "2",
        stroke: "#383E42",
        strokeDasharray: "5 5"
      }
    : {
        strokeWidth: "5",
        stroke: "red"
      };

  return (
    <rect
      x={coords[position].x}
      y={coords[position].y}
      width="70"
      height="70"
      {...strokes}
      {...rest}
    />
  );
}

const noop = () => null;

export default function App() {
  const [status, setStatus] = useState("");

  const expectedShapes = {
    LeftTop: Circle,
    RightTop: Rectangle,
    LeftBottom: Triangle,
    RightBottom: noop
  };

  const [actualShapes, setActualShapes] = useState({
    LeftTop: Rectangle,
    RightTop: Triangle,
    LeftBottom: Circle,
    RightBottom: noop
  });

  function move(from) {
    const newActualShapes = { ...actualShapes };

    const available = Object.keys(actualShapes).find(
      (key) => actualShapes[key] === noop
    );
    newActualShapes[available] = newActualShapes[from];
    newActualShapes[from] = noop;

    setActualShapes(newActualShapes);
  }

  function checkAnswer() {
    const correct =
      actualShapes.LeftTop === expectedShapes.LeftTop &&
      actualShapes.RightTop === expectedShapes.RightTop &&
      actualShapes.LeftBottom === expectedShapes.LeftBottom &&
      actualShapes.RightBottom === expectedShapes.RightBottom;
    setStatus(correct ? "Correct!" : "Incorrect");
  }

  return (
    <div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="transparent"
          width="600"
          height="250"
        >
          <rect x="0" y="0" width="100" height="100" fill="#f6f6f6" />
          <expectedShapes.LeftTop isAnswer position="lefttop" />
          <actualShapes.LeftTop
            position="lefttop"
            onClick={() => move("LeftTop")}
          />

          <rect x="110" y="0" width="100" height="100" fill="#f6f6f6" />
          <expectedShapes.RightTop isAnswer position="righttop" />
          <actualShapes.RightTop
            position="righttop"
            onClick={() => move("RightTop")}
          />

          <rect x="0" y="110" width="100" height="100" fill="#f6f6f6" />
          <expectedShapes.LeftBottom isAnswer position="leftbottom" />
          <actualShapes.LeftBottom
            position="leftbottom"
            onClick={() => move("LeftBottom")}
          />

          <rect x="110" y="110" width="100" height="100" fill="#f6f6f6" />
          <expectedShapes.RightBottom isAnswer position="rightbottom" />
          <actualShapes.RightBottom
            position="rightbottom"
            onClick={() => move("RightBottom")}
          />
        </svg>
      </div>
      <div>
        <h1>{status}</h1>
        <button onClick={checkAnswer}>Done</button>
      </div>
    </div>
  );
}
