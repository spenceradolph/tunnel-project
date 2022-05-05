import { CSSProperties } from "react";
import { NetworkTopology } from "./networkTypes";

const networkDiagramStyle: CSSProperties = {
  width: "100%",
  height: "100px",
  backgroundColor: "yellow",
  float: "left",
};

const boxStyle: CSSProperties = {
  float: "left",
  width: "40px",
  height: "40px",
  backgroundColor: "grey",
  marginRight: "20px",
};

export function NetworkDiagram({
  networkTopology,
}: {
  networkTopology: NetworkTopology;
}) {
  return (
    <div style={networkDiagramStyle}>
      <div style={boxStyle}>box 1</div>
      <div style={boxStyle}>box 2</div>
      <div style={boxStyle}>box 3</div>
    </div>
  );
}
