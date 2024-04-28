import { Form, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/sildes/userSlides";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/sildes/orderSlide";
import * as PaymentService from "../../services/PaymentService";
// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PayPalButton } from "react-paypal-button-v2";
// import { PayPalButtons } from '@paypal/react-paypal-js';

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);

  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("COD");
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleOrderConfirm = () => {
    navigate("/order-confirm");
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    return order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
  }, [order.orderItemsSlected]);
  
  const priceDiscountMemo = useMemo(() => {
    return order?.orderItemsSlected?.reduce((total, cur) => {
      const discountAmount = cur.discount ? (cur.price * cur.amount * cur.discount) / 100 : 0;
      return total + discountAmount;
    }, 0);
  }, [order.orderItemsSlected, priceMemo])

  console.log("price", priceMemo);
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 500000) {
      return 0;
    } else if (priceMemo >= 200000 && priceMemo < 500000) {
      return 10000;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return priceMemo - priceDiscountMemo + diliveryPriceMemo;
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSlected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo &&
      user?.id
    ) {
     
      
      // eslint-disable-next-line no-unused-expressions
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSlected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        email: user?.email,
      })

    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    console.log("bug lỏ", data);
    const res = OrderService.createOrder({ ...rests }, token);
    console.log("bug lỏ 2", data);
    return res;
  });

  const { isLoading, data } = mutationUpdate;
  const {
    data: dataAdd,
    isLoading: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const arrayOrdered = [];
      order?.orderItemsSlected?.forEach((element) => {
        arrayOrdered.push(element.product);
      });
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      message.success("Order successfully!");
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSlected,
          totalPriceMemo: totalPriceMemo,
        },
      });
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemsSlected,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      city: user?.city,
      paymentMethod: payment,
      itemsPrice: priceMemo,
      shippingPrice: diliveryPriceMemo,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email,
    });
  };

  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    <div
      style={{
        background: "#b8e2f4",
        with: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Loading isLoading={isLoadingAddOrder}>
        <div style={{ height: "100%", width: "1425px", margin: "0 auto" }}>
          <h1
            style={{
              textAlign: "center",
              fontFamily: "Signika Negative",
              margin: "0px 0px 30px 0px",
              fontSize: "32px",
            }}
          >
            PAYMENT
          </h1>
          <div
            style={{
              background: "#fff",
              display: "flex",
              justifyContent: "space-around",
              width: "1425px",
              height: "500px",
              borderRadius: "10px",
              boxShadow: "0 0 15px 10px rgba(0, 0, 0, 0.09)",
            }}
          >
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Please select a shipping method</Lable>
                  <WrapperRadio
                    onChange={handleDilivery}
                    value={delivery}
                    style={{ marginTop: "15px" }}
                  >
                    <Radio value="fast">
                      <span
                        style={{
                          color: "#ea8500",
                          fontWeight: "bold",
                          marginLeft: "2px",
                          fontFamily: "Signika Negative",
                        }}
                      >
                        FAST
                      </span>
                      <span
                        style={{
                          marginLeft: "20px",
                          fontFamily: "Signika Negative",
                        }}
                      >
                        {" "}
                        Economical shipping (about 2-3 days)
                      </span>
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <div style={{ borderTop: "1px solid #2e2e2e" }}></div>
              <WrapperInfo style={{ border: "none" }}>
                <div>
                  <Lable>Please select a payment method</Lable>
                  <WrapperRadio
                    onChange={handlePayment}
                    value={payment}
                    style={{ marginTop: "15px" }}
                  >
                    <Radio
                      value="COD"
                      style={{ fontFamily: "Signika Negative" }}
                    >
                      {" "}
                      Cash on delivery
                    </Radio>
                    <Radio
                      value="paypal"
                      style={{ fontFamily: "Signika Negative" }}
                    >
                      {" "}
                      Payment via Paypal
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div>
                    <span>Address: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {`${user?.address} ${user?.city}`}{" "}
                    </span>
                    <span
                      onClick={handleChangeAddress}
                      style={{ color: "#ea8500", cursor: "pointer" }}
                    >
                      Thay đổi
                    </span>
                  </div>
                </WrapperInfo>
                <div style={{ borderTop: "1px solid #2e2e2e" }}></div>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "7px 15px 7px 0px",
                    }}
                  >
                    <span>Provisional</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "7px 15px 7px 0px",
                    }}
                  >
                    <span>Discount</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceDiscountMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "7px 15px 7px 0px",
                    }}
                  >
                    <span>Shipping charges</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(diliveryPriceMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <div style={{ borderTop: "1px solid #2e2e2e" }}></div>
                <WrapperTotal>
                  <span>Total</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "#ea8500",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(totalPriceMemo)}
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              {payment === "paypal" && sdkReady ? (
                <div style={{ width: "320px" }}>
                  <PayPalButton
                    amount={Math.round(totalPriceMemo / 30000)}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert("Error");
                    }}
                  />
                </div>
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrder()}
                  size={40}
                  styleButton={{
                    background: "#ea8500",
                    height: "48px",
                    width: "320px",
                    border: "none",
                    borderRadius: "4px",
                    marginLeft: "10px",
                  }}
                  textButton={"Buy"}
                  styleTextButton={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                    fontFamily: "Signika Negative",
                  }}
                ></ButtonComponent>
              )}
            </WrapperRight>
          </div>
        </div>
        <ModalComponent
          title="Update shipping information"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancleUpdate}
          onOk={handleUpdateInforUser}
        >
          <Loading isLoading={isLoading}>
            <Form
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              // onFinish={onUpdateUser}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <InputComponent
                  value={stateUserDetails["name"]}
                  onChange={handleOnchangeDetails}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <InputComponent
                  value={stateUserDetails["city"]}
                  onChange={handleOnchangeDetails}
                  name="city"
                />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your  phone!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.phone}
                  onChange={handleOnchangeDetails}
                  name="phone"
                />
              </Form.Item>

              <Form.Item
                label="Adress"
                name="address"
                rules={[
                  { required: true, message: "Please input your  address!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetails.address}
                  onChange={handleOnchangeDetails}
                  name="address"
                />
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>
      </Loading>
    </div>
  );
};

export default PaymentPage;
