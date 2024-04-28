import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
color: #2e2e2e;
font-size: 25px;
text-align: center;
font-family: 'Signika Negative';

`

export const WrapperUploadFile = styled(Upload)`
   margin-left:10px;

    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    & .ant-upload-list-item-info {
        display: none;
    }

    & .ant-upload-list-item {
        display: none;
    }
`