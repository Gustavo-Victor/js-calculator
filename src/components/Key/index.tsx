import { KeyProps } from "../../types/AppTypes";
import "./style.scss";

function Key({ keyData: { id, value, styles }, handleInput }: KeyProps) {
  return (
    <button className={styles} id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
  );
}

export default Key;
