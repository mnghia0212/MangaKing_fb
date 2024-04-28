/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperCountOrder,
  WrapperItemOrder,
  WrapperItemOrderInfo,
  WrapperTotal,
  Wrapper2Button,
} from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";



const OrderSucess = () => {

  const navigate = useNavigate();



  const location = useLocation();
  console.log("location", location);
  const { state } = location;
  return (
    <>
      <div
        style={{
          background: "#b8e2f4",
          with: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ padding: "20px" }}>
          <button style={{width: "fit-content", height: "fit-content", padding:'15px', background: "#fff", border:'none', borderRadius:'10px'}}>
            <a href="/" style={{textDecoration:'none'}}>
                <LeftOutlined style={{fontSize:'16px', color:'#000'}}/> 
                <span style={{fontFamily:'Signika Negative', fontSize:'17px', fontWeight:'bold', color:'#000', marginLeft:'5px'}}>Back to home</span> 
            </a>
          </button>
            
          
        </div>
        <Loading isLoading={false}>
          <div style={{ height: "100%", width: "1300px", margin: "0 auto" }}>
            <h1
              style={{
                textAlign: "center",
                fontFamily: "Signika Negative",
                margin: "10px 0px 30px 0px",
                fontSize: "32px",
              }}
            >
              ORDER SUCCESSFULLY !
            </h1>
            <div
              style={{
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1300px",
                height: "520px",
                borderRadius: "10px",
                boxShadow: "0 0 15px 10px rgba(0, 0, 0, 0.09)",
              }}
            >
              <WrapperContainer>
                <WrapperInfo>
                  <div>
                    <Lable>Shipping method</Lable>
                    <WrapperValue>
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        {orderContant.delivery[state?.delivery]}
                      </span>{" "}
                      Economical Shipping
                    </WrapperValue>
                  </div>
                </WrapperInfo>
                <WrapperInfo style={{ marginBottom: "17px" }}>
                  <div>
                    <Lable>Payment method</Lable>

                    <WrapperValue>
                      {orderContant.payment[state?.payment]}
                    </WrapperValue>
                  </div>
                </WrapperInfo>
                <Lable>Your order</Lable>
                <WrapperItemOrderInfo>
                  {state.orders?.map((orders) => {
                    return (
                      <WrapperItemOrder key={orders?.name}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            marginLeft: "30px",
                          }}
                        >
                          <img
                            src={orders.image}
                            style={{
                              width: "81px",
                              height: "79px",
                              objectFit: "cover",
                            }}
                          />
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              justifyContent: "center",
                              marginLeft: "8px",
                              gap: "3px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                fontFamily: "Signika Negative",
                              }}
                            >
                              {orders?.name}
                            </div>
                            <div
                              style={{
                                fontSize: "15px",
                                color: "#242424",
                                fontWeight: "500",
                                fontFamily: "Signika Negative",
                              }}
                            >
                              Unit price: {convertPrice(orders?.price)}
                            </div>
                            <div
                              style={{
                                fontSize: "15px",
                                color: "#242424",
                                fontWeight: "500",
                                fontFamily: "Signika Negative",
                              }}
                            >
                              Quantity: {orders?.amount}
                            </div>
                            <div
                              style={{
                                fontSize: "15px",
                                color: "#242424",
                                fontWeight: "500",
                                fontFamily: "Signika Negative",
                              }}
                            >
                              Discount: {orders?.discount}%
                            </div>
                          </div>
                        </div>
                      </WrapperItemOrder>
                    );
                  })}
                </WrapperItemOrderInfo>
                <WrapperTotal>
                  <span
                    style={{
                      fontSize: "25px",
                      color: "#ea8500",
                      fontWeight: "700",
                    }}
                  >
                    Total: {convertPrice(state?.totalPriceMemo)}
                  </span>
                </WrapperTotal>
              </WrapperContainer>
            </div>
          </div>
        </Loading>
      </div>
    </>
  );
};

export default OrderSucess;