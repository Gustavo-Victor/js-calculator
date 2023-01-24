import { KeyboardProps } from "../../types/AppTypes";
import Key from "../Key";
import "./style.scss";

function Keyboard({ calcData, handleInput }: KeyboardProps) {
  return (
    <div className="keys">
      {calcData.map((data) => (
        <Key key={data.id} keyData={data} handleInput={handleInput} />
      ))}
    </div>
  );
}

export default Keyboard;
