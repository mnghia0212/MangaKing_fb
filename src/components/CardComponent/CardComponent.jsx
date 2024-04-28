import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import {
  StyleNameProduct,
  StylePriceProduct,
  StyleSalePercentProduct,
  StyleSalePriceProduct,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import cv1 from "../../assets/images/cv1.jpg";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
import * as message from "../../components/Message/Message";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
    
  } = props;

  const navigate = useNavigate();

  const handleDetailsProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const handleOnClick = () => {
    if (countInStock === 0) {
      message.warning('This product is out of stock.');
    } else {
      handleDetailsProduct(id);
    }
  };
  return (
    <div>
      <Card
        hoverable
        headStyle={{ width: "200px", height: "200px" }}
        bodyStyle={{ padding: "10px" }}
        style={{ width: "220px" }}
        cover={<img alt="example" src={image} />}
        onClick={handleOnClick} // Thay đổi ở đây
        //disabled={countInStock === 0}
      >
        <div>
          <StyleNameProduct>{name}</StyleNameProduct>

          <WrapperReportText>
            <span>{rating}</span>
            <StarFilled
              style={{ fontSize: "10px", color: "#e68a00", marginLeft: "2px" }}
            />
            <WrapperStyleTextSell style={{ marginLeft: "5px" }}>
              {" "}
              | {selled} sold
            </WrapperStyleTextSell>
          </WrapperReportText>

          <div style={{ marginTop: "5px", display: "flex" }}>
            <s><StylePriceProduct>{convertPrice(price)}</StylePriceProduct></s>
            <StylePriceProduct style={{marginLeft: "10px"}}> {convertPrice(price - (price * (discount / 100))) }</StylePriceProduct>
          </div>

          <div>
            <StyleSalePercentProduct StyleSalePercentProduct>
              - {discount || 10}%
            </StyleSalePercentProduct>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardComponent;
