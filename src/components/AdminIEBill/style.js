import styled from "styled-components";

export const WrapperHeader = styled.h1`
color: #2e2e2e;
font-size: 25px;
text-align: center;
font-family: 'Signika Negative';
`

export const DrawerTitle = styled.h2`
    color: #10316B; // A professional shade of navy blue
    font-size: 26px;
    text-align: center;
    margin: 0px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e8e8e8; // subtle divider

`;

export const InfoSection = styled.div`
    display: flex;
    justify-content: space-between; // This will space out the label and content naturally
`;

export const InfoLabel = styled.span`
    font-weight: bold;
    color: #333;
    flex: 0 0 120px; // Giving a fixed width to labels for alignment
`;

export const InfoContent = styled.span`
    flex-grow: 1; // Allows content to take up the remaining space
    text-align: right;
    color: #555;
`;

export const DrawerContent = styled.div`
  padding: 20px;
  font-family: "Signika Negative"
`;

export const WrapperSeller = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    gap: 200px;
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
  background-color: lightBlue;
  border-radius: 6px;
  padding: 15px 5px 15px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const WrapperInfoSeller = styled.div`

`