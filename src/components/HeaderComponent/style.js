import { Col, Row } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled(Row)`
    padding: 10px 100px;
    background-color: #FDBF0F;
    align-items: center;
    height: 70px;
    gap: 16px;
    flex-wrap: nowrap;
`
export const WrapperTextHeader = styled.span`
    font-size: 28px;
    color: black;
    font-family: 'Pixelify Sans', sans-serif; 
    text-align: left;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    gap: 10px;
    cursor: pointer;
    
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 15px;
    color: black;
    white-space: nowrap;
    font-family: 'SigniKa Negative';
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: #e68a00;
    }
`