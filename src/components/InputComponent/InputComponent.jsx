import { Input } from "antd";
import React from "react";
import { WrapperInputStyle } from "./style";

const InputComponent = ({
  size,
  placeholder,
  backgroundColorInput,
  style,
  ...rests
}) => {
  return (
    <WrapperInputStyle
      size={size}
      placeholder={placeholder}
      style={style}
      {...rests}
    />
  );
};

export default InputComponent;
