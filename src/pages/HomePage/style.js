import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 70px;
    justify-content: flex-start;
    height: 50px;
    cursor: pointer;
    position: relative;
`

export const TextTypeProduct = styled.div
`
    font-size: 20px;
    font-family: 'Pixelify Sans';
    padding: 0px 10px;
    cursor: pointer;
`

export const TextTypeProductCategory = styled.div
`
    font-size: 20px;
    font-family: 'Pixelify Sans';
    padding: 0px 10px;
    cursor: pointer;
    display: inline-block;
`

export const DropdownContent = styled.div`
    display: none; /* Ẩn dropdown mặc định */   
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 10px 10px;
    left: 40px; /* Điều chỉnh dropdown hiển thị ở vị trí khác */;
    top: 50px;
    width: 350px;
    z-index: 1;
    grid-template-columns: repeat(2, 1fr); /* Chia thành 2 cột */;
    gap: 20px;
  

    ${WrapperTypeProduct}:hover & {
        display: grid;
    }
`

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