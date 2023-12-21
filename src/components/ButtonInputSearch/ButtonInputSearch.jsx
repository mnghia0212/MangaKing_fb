import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {

  const
    {
      size,
      placeholder,
      backgroundColorInput = "#fff",
      backgroundColorButton = "#e68a00",
      textButton,
      colorButton = "#000"

    } = props;
  return (
    <div style={{ display: 'flex', fontFamily:'SigniKa Negative'}}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{
          border: 'none',
          borderRadius: '0px',
          backgroundColor: backgroundColorInput,
          padding: '0px 22px'
        }}
      {...props}
      />

      <ButtonComponent
        size={size}
        icon={<SearchOutlined style={{ color: '#000' }} />}
        styleButton={{
          border: 'none',
          borderRadius: '0px',
          backgroundColor: backgroundColorButton
        }}
        textButton={textButton}
        styleTextButton={{ color: colorButton, fontFamily: 'SigniKa Negative' }}
      />


    </div>
  );
};

export default ButtonInputSearch;
