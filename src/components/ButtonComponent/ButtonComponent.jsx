import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
    return (
        <Button
        style={{
          ...styleButton,
          background: disabled ? '#e68a00' : styleButton.background
        }}
          size={size}

          //style={styleButton}
          {...rests}
        >
          <span style={styleTextButton}>{textButton} </span>
        </Button>
    )
}

export default ButtonComponent


