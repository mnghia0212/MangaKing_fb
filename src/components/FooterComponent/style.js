import { ExportOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperFooter = styled(Row)`
    height: 370px;
    background-color: #151414;
    padding: 0px 150px;
    align-items: center;
    flex-wrap: nowrap;
    gap: 20px;
    display:flex;
    flex-direction: column;
`

export const WrapperRow1Footer = styled(Row)`
    width: 100%;
    border-bottom: 2px solid #373636;
    display: flex;
    flex-wrap: nowrap;
`
export const StyleTextH4 = styled.h4`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 2px;
    font-family: SigniKa Negative;

`

export const StyleTextSpan = styled.span`
    color: #757575;
    font-size: 15px;
    font-family: SigniKa Negative;
`

export const WrapperRow2Footer = styled(Row)`
    width: 100%;
    flex-wrap: nowrap;
`

export const StyleTextLogo = styled.span`
    font-size: 35px;
    color: #ff5e14;
    font-family: 'Pixelify Sans', sans-serif; 
    text-align: left;

`

export const StyleTextCommit = styled.p`
    margin-bottom: 14px;
    font-size: 14px;
    color: #7e7e7e;
    line-height: 28px;
    font-family: SigniKa Negative;

`

export const WrapperSocialIcon = styled.div`
    margin-top: 15px;
`
export const WrapperCol2Row2 = styled.div`
    ul {
        margin-top: 30px;
        padding-left: 0px;
        li {
            display: inline-block;
            float: left;
            width: 50%;
            margin-bottom: 12px;

            a {
                color: #878787;
                text-transform: capitalize;
                font-family: SigniKa Negative;

                &:hover {
                    color: #ff5e14;
                }
            }
        }
    }
`

export const WrapperHeadingList = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    position: relative;
    font-family: SigniKa Negative;
    
    &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -15px;
        height: 2px;
        width: 50px;
        background: #ff5e14;
    }

    
`

export const WrapperCopyRight = styled.div`
    width: 100%;
    background:  #202020;
    padding: 15px 0;
    display: flex;
    justify-content: center;

    p {
        margin: 0;
        font-size: 14px;
        color: #878787;
    }
`