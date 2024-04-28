import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 70px;
    justify-content: flex-start;
    height: 50px;
    position: relative;
`

export const TextTypeProduct = styled.div
`
    font-size: 20px;
    font-family: 'Pixelify Sans';
    padding: 0px 10px;
    cursor: pointer;
`
export const DropdownContent = styled.div`
    display: none;  /* Ẩn dropdown mặc định */
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
    padding: 10px 10px;
    border-radius: 15px;
    left: -120px; /* Đặt dropdown ngay dưới Category */
    top: 100%; /* Đặt dropdown ngay dưới Category */
    width: 350px;
    z-index: 1;
    grid-template-columns: repeat(2, 1fr); /* Chia thành 2 cột */
    gap: 20px;
`;

export const TextTypeProductCategory = styled.div`
    font-size: 20px;
    font-family: 'Pixelify Sans';
    padding: 0px 10px;
    cursor: pointer;
    display: inline-block;
`;

// Thêm quy tắc hover vào CategoryWrapper thay vì TextTypeProductCategory
export const CategoryWrapper = styled.div`
    display: inline-block; /* Cho phép bao bọc chính xác các thành phần bên trong */
    position: relative; /* Cho phép DropdownContent được vị trí tương đối */

    &:hover ${DropdownContent} {
        display: grid; /* Hiện dropdown khi hover vào CategoryWrapper */
    }
`;

export const TextRecommend = styled.p`
    font-family: 'Pixelify Sans', sans-serif; 
    font-size: 28px;
    font-weight: 600;
    margin-top:0px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        background-color: #e68a00;
        color: #000;
        span {
            color:#000;
        }
    }
    
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
    
`

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    flex-wrap: wrap
`