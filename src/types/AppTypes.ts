export type displayProps = {
  input: string;
  output: string;
};

export type calcDataType = {
  id: string;
  value: string | number;
  styles: string;
};

export type StrOrNum = string | number;

export type KeyboardProps = {
  calcData: Array<calcDataType>;
  handleInput: (value: string | number) => void;
};

export type KeyProps = {
  keyData: calcDataType;
  handleInput: (value: string | number) => void;
};
