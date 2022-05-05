import { AnswerLine } from "./AnswerLine";

export function App() {
  return (
    <div>
      <h1>Title Bar with info</h1>
      <div>
        Scheme of maneuver
        <div>{`> 192.168.0.1`}</div>
        <div>{`-> 192.168.0.2`}</div>
        <div>{`--> 192.168.0.3`}</div>
      </div>
      <div>
        <AnswerLine />
        <AnswerLine />
        <AnswerLine />
        <AnswerLine />
      </div>
    </div>
  );
}
