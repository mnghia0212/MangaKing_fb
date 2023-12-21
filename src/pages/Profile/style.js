import styled from "styled-components";
import { Button, Upload } from "antd";

export const WrapperHeader = styled.h1`
    text-align: center;
    font-family: 'Signika Negative';
    color: #000;
    font-size: 25px;
    margin: 0px;
    padding: 25px 0;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-around;
    border: 1px solid #f5f5f5;
    width: 600px;
    margin: 0 auto; 
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
    box-shadow:0 0 15px 10px rgba(0, 0, 0, 0.09);
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 14px;
    line-height: 30px;
    font-weight: 600;
    width: 100px;
    text-align: center;
`

export const WrapperInput = styled.div`
    display: flex;
    align-item: center;
    gap: 20px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    & .ant-upload-list-item-info {
        display: none;

    }
`