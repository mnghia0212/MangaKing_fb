import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperImageSmall = styled(Image)`
    width: 64px;
    heigh: 64px
`
export const WrapperStyleColImage = styled(Col)`
    flex-basics: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36,36,36);
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    word-break: break-word;
    font-family: 'SigniKa Negative';
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-heigh: 24px;
    color: #000;
    font-family: 'SigniKa Negative';
`
export const WrapperPriceProduct = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 50px;
    gap: 20px;
    margin-top: 50px;
    font-family: 'SigniKa Negative';
`

export const StyleSalePriceProduct = styled.span`
    font-size: 12px;
    color: #808080;
    display: flex;
    align-items: center;
    font-family: 'SigniKa Negative';

`

export const StylePriceProduct = styled.span`
    font-size: 30px;
    color: #e68a00;
    display: flex;
    align-items: center;
    font-weight: 700
    margin-left: 10px;
    font-family: 'SigniKa Negative';
`

export const StyleSalePercentProduct = styled.span`
    background: #FDBF0F;
    height: 25px;
    width: 80px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-family: 'SigniKa Negative';
`

export const WrapperSalePercentProduct = styled.div`
    display: flex;
    justify-content: center;
    height: 50px;
`

export const WrapperAddress = styled.div`
    margin-top: 50px;
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #000;
        font-family: 'SigniKa Negative';
        margin-left: 5px;
    };

    span.change-address {
        color: #e68a00;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        font-family: 'SigniKa Negative';
    }
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 8px;
    width: 120px;
    border: 1px solid #ccc;

`


export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 80px;
        border-bottom: none;
        border-top: none;
        .ant-input-number-handler-wrap {
            display: none;
        }
    }
`
export const WrapperInfo = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    padding: 16px;
    gap: 4px;
    font-family: SigniKa Negative;
`

export const WrapperHeadingInfo = styled.div`
    font-weight: 600;
    font-size: 22px;
    color: rgb(39, 39, 42);
   
`
export const WrapperRow = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    padding: 8px 0px;
    border-bottom: 1px solid rgb(235, 235, 240);
    font-size: 14px;
    line-height: 150%;
    font-weight: 400;
    color: rgb(39, 39, 42);
    gap: 8px;
`

export const WrapperDeppRow = styled.div`
    background-color: rgb(255, 255, 255);
    display: flex;
    flex: 1 1 0%;
    justify-content: space-between;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    color: rgb(39, 39, 42);
    align-items: center;
`
export const StyleSpan1 = styled.span`
    color: rgb(128, 128, 137);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
`

export const StyleSpan2 = styled.span`
    font-weight: 400;
    word-break: break-word;
    color: rgb(39, 39, 42);
    font-size: 14px;
    font-style: normal;
`

export const WrapperTextDes = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: rgb(36, 36, 36);
    text-align: justify;

`
export const StyleTextDes = styled.p`
    margin-top: 5px;
    margin-bottom: 12px;
    line-height: 1.6;
    word-break: break-word;
`

export const Divider = styled.hr`
    border: 1px dashed  rgb(128, 128, 137);
    margin: 20px 0;
    
`