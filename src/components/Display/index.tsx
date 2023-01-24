import { displayProps } from "../../types/AppTypes";
import "./style.scss";

function Display({ input, output }: displayProps) {
  return (
    <div className="output">
      <span className="result">{output}</span>
      <span id="display" className="input">
        {input}
      </span>
    </div>
  );
}

export default Display;
