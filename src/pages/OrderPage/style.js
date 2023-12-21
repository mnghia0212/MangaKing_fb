import { Checkbox } from "antd";
import styled  from "styled-components";

export const WrapperStyleHeader = styled.div`

  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {

    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255); 
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    font-family: 'Signika Negative';
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 15px;
  };
  margin-bottom: 4px;
`

export const WrapperLeft = styled.div`
  width: 910px;
`

export const WrapperListOrder = styled.div`

`

export const WrapperItemOrder = styled.div`
font-family: 'SigniKa Negative'; 
font-size: 16px;
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`

export const WrapperPriceDiscount = styled.span`
  font-family: 'SigniKa Negative'; 
  color: #999;
  font-size: 15px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder  = styled.div`

font-family: 'SigniKa Negative'; 
font-size: 16px;
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const TextHeaderTable = styled.p
`
  
font-family: 'SigniKa Negative'; 
font-size: 17px;
font-weight: 600;
`

export const WrapperRight = styled.div`

  width: 320px;
  margin-left: 30px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center;
  justify-content: center;
  margin-bottom: 105px;
`

export const WrapperInfo = styled.div`

font-family: 'SigniKa Negative'; 
font-size: 16px;
  padding: 17px 15px;
  border-bottom: 1px solid #2e2e2e;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`

export const WrapperTotal = styled.div`
  font-family: 'SigniKa Negative'; 
  font-size: 16px;
  display: flex;
  align-items: flex-start; 
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff ;
  margin-left:10px;
`

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #e68a00;
    border-color: #e68a00;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #e68a00;
  }
`