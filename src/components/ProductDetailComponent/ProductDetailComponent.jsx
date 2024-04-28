import { Col, Image, Rate, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
// import cv1 from '../../assets/images/cv1.jpg'
import cv2 from "../../assets/images/cv2.webp";
import cv3 from "../../assets/images/cv3.webp";
import cv4 from "../../assets/images/cv4.webp";
import cv5 from "../../assets/images/cv5.webp";
import cv6 from "../../assets/images/cv6.webp";
import cv7 from "../../assets/images/cv7.webp";
import {
  StylePriceProduct,
  StyleSalePercentProduct,
  StyleSalePriceProduct,
  StyleSpan1,
  StyleSpan2,
  StyleTextDes,
  WrapperAddress,
  WrapperBtnQualityProduct,
  WrapperDeppRow,
  WrapperHeadingInfo,
  WrapperImageSmall,
  WrapperInfo,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperQualityProduct,
  WrapperRow,
  WrapperSalePercentProduct,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperTextDes,
  Divider,
} from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/sildes/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import * as message from "../Message/Message";
import { useMemo } from "react";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";

const ProductDetailComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const order = useSelector((state) => state.order);

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order.isSucessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);

  useEffect(() => {
    initFacebookSDK();
  }, []);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited && numProduct < productDetails.countInStock) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited && numProduct > 1) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const { isLoading, data: productDetails } = useQuery(
    ["products-details", idProduct],
    fetchGetDetailsProduct,
    { enabled: !!idProduct }
  );
  const handleAddOderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // {
      //     name: {type: String, required: true},
      //     amount: {type: Number, required: true},
      //     image: {type: String, required: true},
      //     price: {type: Number, required: true},
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      console.log("checkcheck", orderRedux, numProduct);
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInStock: productDetails?.countInStock,
              description: productDetails?.description,
              author: productDetails?.author,
              publisher: productDetails?.publisher
            },
          })
        );
        message.success("Successfully add to cart !")
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  const handleBuyProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // {
      //     name: {type: String, required: true},
      //     amount: {type: Number, required: true},
      //     image: {type: String, required: true},
      //     price: {type: Number, required: true},
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      console.log("checkcheck", orderRedux, numProduct);
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInStock: productDetails?.countInStock,
              description: productDetails?.description,
              author: productDetails?.author,
              publisher: productDetails?.publisher
            },
          })
        );
        navigate("/order");
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <Row
        style={{
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <Col
          span={10}
          style={{
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            height: "auto",
            padding: "5px",
          }}
        >
          <Image
            src={productDetails?.image}
            alt="product image"
            preview={false}
          />
        </Col>
        <Col span={14} style={{ paddingLeft: "30px" }}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate
              allowHalf
              defaultValue={productDetails?.rating}
              value={productDetails?.rating}
            />
            <WrapperStyleTextSell style={{ marginLeft: "5px" }}>
              {" "}
              | {productDetails?.selled - 1}+ sold
            </WrapperStyleTextSell>
          </div>

          <WrapperPriceProduct>
            {/* <StyleSalePriceProduct>
                        <s>220,000 VND</s>
                    </StyleSalePriceProduct> */}

                <s>
                    <StylePriceProduct style={{marginTop: "7px"}}>
                    {convertPrice(productDetails?.price)}
                    </StylePriceProduct>
                </s>

                <StylePriceProduct>
                    {convertPrice(productDetails?.price - ((productDetails?.price * productDetails?.discount / 100)))}
                </StylePriceProduct>

        
              <StyleSalePercentProduct style={{marginTop: "12px"}}>
                -{productDetails?.discount}%
              </StyleSalePercentProduct>
         
          </WrapperPriceProduct>

          <LikeButtonComponent dataHref={window.location.href} />

          <div
            style={{
              margin: "50px 0",
              borderBottom: "1px solid #ccc",
              borderTop: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            <div style={{ margin: "20px 0px", fontFamily: "SigniKa Negative" }}>
              Quantity
            </div>
            <Space>
              <WrapperQualityProduct>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <MinusOutlined
                    style={{ color: "#000", fontSize: "16px" }}
                    onClick={() => handleChangeCount("decrease")}
                  />
                </button>

                <WrapperInputNumber
                  onChange={onChange}
                  defaultValue={1}
                  value={numProduct}
                  max={productDetails?.countInStock}
                  size="small"
                />

                <button style={{ border: "none", background: "transparent" }}>
                  <PlusOutlined
                    style={{ color: "#000", fontSize: "16  px" }}
                    onClick={() => handleChangeCount("increase")}
                  />
                </button>
              </WrapperQualityProduct>
            </Space>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <ButtonComponent
              size={40}
              styleButton={{
                border: "none",
                background: "#e68a00",
                width: "250px",
                height: "55px",
                borderRadius: "10px",
              }}
              onClick={handleBuyProduct}
              textButton="Buy"
              styleTextButton={{
                color: "rgb(36,36,36)",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "SigniKa Negative",
              }}
            ></ButtonComponent>

            <ButtonComponent
              size={40}
              styleButton={{
                border: "2px solid #e68a00",
                background: "#fff",
                width: "250px",
                height: "55px",
                borderRadius: "10px",
              }}
              onClick={handleAddOderProduct}
              textButton="Add to cart"
              styleTextButton={{
                color: "rgb(36,36,36)",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "SigniKa Negative",
              }}
            ></ButtonComponent>

            {order?.isErrorOrder && (
              <span style={{ color: "red" }}>San pham da het hang</span>
            )}
          </div>
        </Col>
        <CommentComponent
          dataHref={
            process.env.REACT_APP_IS_LOCAL
              ? "https://developers.facebook.com/docs/plugins/comments#configurator"
              : window.location.href
          }
          width="1000"
        />
      </Row>

      <Row
        style={{
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          marginTop: "20px",
          flexWrap: "nowrap",
        }}
      >
        <Col span={10}>
          <WrapperInfo>
            <WrapperHeadingInfo>
              <h4 style={{ margin: "0px" }}>Details</h4>
            </WrapperHeadingInfo>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <WrapperRow>
                <WrapperDeppRow>
                  <StyleSpan1>Category</StyleSpan1>
                  <StyleSpan2>{productDetails?.type}</StyleSpan2>
                </WrapperDeppRow>
              </WrapperRow>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <WrapperRow>
                <WrapperDeppRow>
                  <StyleSpan1>Stock</StyleSpan1>
                  <StyleSpan2>{productDetails?.countInStock}</StyleSpan2>
                </WrapperDeppRow>
              </WrapperRow>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <WrapperRow>
                <WrapperDeppRow>
                  <StyleSpan1>Size</StyleSpan1>
                  <StyleSpan2>11,3x17,6cm</StyleSpan2>
                </WrapperDeppRow>
              </WrapperRow>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <WrapperRow>
                <WrapperDeppRow>
                  <StyleSpan1>Number of pages</StyleSpan1>
                  <StyleSpan2>208</StyleSpan2>
                </WrapperDeppRow>
              </WrapperRow>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <WrapperRow>
                <WrapperDeppRow>
                  <StyleSpan1>Author</StyleSpan1>
                  <StyleSpan2>{productDetails?.author}</StyleSpan2>
                </WrapperDeppRow>
              </WrapperRow>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <WrapperRow>
                <WrapperDeppRow>
                  <StyleSpan1>Publisher</StyleSpan1>
                  <StyleSpan2>{productDetails?.publisher}</StyleSpan2>
                </WrapperDeppRow>
              </WrapperRow>
            </div>
          </WrapperInfo>
        </Col>

        <Divider />

        <Col span={14}>
          <WrapperInfo>
            <WrapperHeadingInfo>Description</WrapperHeadingInfo>

            <WrapperTextDes>
              <StyleTextDes>{productDetails?.description}</StyleTextDes>
            </WrapperTextDes>
          </WrapperInfo>
        </Col>
      </Row>
    </Loading>
  );
};

export default ProductDetailComponent;
