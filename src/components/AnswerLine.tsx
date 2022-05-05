import { CSSProperties } from "react";

const answerLineStyle: CSSProperties = {
  height: "50px",
  width: "90%",
  backgroundColor: "grey",
  margin: "10px",
};

// ssh user@ip -L x:x:x

export function AnswerLine() {
  return (
    <div style={answerLineStyle}>
      {`ssh `}
      <input placeholder="user"></input>
      {`@`}
      <input placeholder="ip"></input>
      {` `}
      <input placeholder="forward"></input>
    </div>
  );
}
