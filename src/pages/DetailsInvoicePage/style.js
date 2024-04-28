import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  justify-content: space-evenly;

`

export const WrapperInfoUser = styled.div`

  font-family: 'Signika Negative',
  font-size: 15px;
  .name-info {
    font-family: 'Signika Negative',
    font-size: 15px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-family: 'Signika Negative',
    font-size: 15px;
    margin-top: 8px;
  }
  .name-delivery {
    font-family: 'Signika Negative',
    font-size: 15px;
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    font-family: 'Signika Negative',
    font-size: 15px;
    margin-top: 8px;
    color: rgb(234, 133, 0); 
  }
`

export const WrapperLabel = styled.div`
font-family: 'Signika Negative',
font-size: 15px;
font-weight: 500;
  color: rgb(36, 36, 36);
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperContentInfo = styled.div`

  height: 118px;
  width: 320px;
  background-color: #d6d6d6;
  border-radius: 6px;
  padding: 15px;
`

export const WrapperStyleContent = styled.div`
font-size: 15px;
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:center;
  justify-content: space-around;
  margin-top: 10px;
  flex-direction: row;
`

export const WrapperNameProduct = styled.div`
  font-family: 'Signika Negative',
  font-size: 15px;
  display:flex;
  align-items: flex-start;
  width: 200px;
  
`

export const WrapperItem = styled.div`

  width: 100px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`


  width: fit-content;
  font-weight: 800  ;
`

export const WrapperAllPrice = styled.div`
  width: fit-content;
  gap:8px;
  padding:10px;
  display: flex;
  flex-direction: flex-end;
  align-items: center;
  justify-content: center;
`

export const WrapperSeller = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 100px;
`

export const WrapperInfoSeller = styled.div`

`

export const WrapperInvoice = styled.div`
  
`