import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-right: none;
    border-left: none;
    border-top: none;
    border-bottom-color: #e68a00;
    
    &:focus {
        border-bottom-color: #e68a00;
    }

    &:hover {
        background-color: #fff5e6;
        border-bottom-color: #e68a00;
    }
`