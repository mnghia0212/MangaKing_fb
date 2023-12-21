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
  return (
    <div>
      <Card
        hoverable
        headStyle={{ width: "200px", height: "200px" }}
        bodyStyle={{ padding: "10px" }}
        style={{ width: "220px" }}
        cover={<img alt="example" src={image} />}
        onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
        // onClick={ handleDetailsProduct(id)}
        disabled={countInStock === 0}
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
              | {selled} 1000 + sold
            </WrapperStyleTextSell>
          </WrapperReportText>

          <span style={{ display: "flex", marginTop: "5px" }}>
            <StylePriceProduct>{convertPrice(price)}</StylePriceProduct>
            {/* <StyleSalePriceProduct><s>220,000 VND</s></StyleSalePriceProduct> */}
          </span>

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
