import styled from "styled-components";
import { Menu } from 'antd';

export const StyledMenu = styled(Menu)`
  &&& {
    width: 256px;
    box-shadow: 1px 1px 1px #000;
    height: 100vh;
    padding: 5px;

    .ant-menu-item-selected {
      background-color: #FFE990 !important;
      color: #0e0202 !important;
    }

    .ant-menu-item-selected > a,
    .ant-menu-item-selected .anticon {
      color: #0e0202 !important;
    }

    .ant-menu-item:hover {
      background-color: #f0f0f0;
    }

    .ant-menu-item {
      font-family: "Signika Negative";
      font-size: 16px;
      padding: 27px 0px;
      margin-top: 16px;
      transition: background-color 0.3s;
    }

    .ant-menu-item-icon {
        font-size: 20px;
        margin-bottom: 4px;    
    }
  }
`;

export const StyledMenuItem = styled(Menu.Item)`

  }
`;

