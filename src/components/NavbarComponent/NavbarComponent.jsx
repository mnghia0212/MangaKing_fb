import React from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox, Radio, Rate } from "antd";

const NavbarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });

      case "checkbox":
        return (
          <Radio.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return <Radio value={option.value}>{option.label}</Radio>;
            })}
          </Radio.Group>
        );

      case "star":
        return options.map((option) => {
          return (
            <div>
              <Rate
                style={{ fontSize: "14px" }}
                disabled
                defaultValue={option}
              />
              <span
                style={{ fontSize: "14px", marginLeft: "8px" }}
              >{`From ${option} stars`}</span>
            </div>
          );
        });

      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });

      default:
        return {};
    }
  };
};

export default NavbarComponent;
