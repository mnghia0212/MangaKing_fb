import { Button, Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";
import {
  CustomCheckbox,
  TextHeaderTable,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDilivery,
  WrapperTotal,
} from "./style";
import {
  DeleteOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { WrapperInputNumber } from "../../components/ProductDetailComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/sildes/orderSlide";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/sildes/userSlides";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepComponent/StepComponent";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

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

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 200000 && priceMemo < 500000) {
      return 10000;
    } else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return priceMemo - priceDiscountMemo + diliveryPriceMemo;
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleAddCard = () => {
    if (!order?.orderItemsSlected?.length) {
      message.error("Please select a comic to buy");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
    console.log("usẻrrrrr", user);
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    console.log("con cac", data)
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;

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

  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    const currentEmail = user.email;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { ...stateUserDetails,  email: currentEmail, id: user?.id, token: user?.access_token },
        {
          onSuccess: () => {
            console.log("dcmm", user);
            dispatch(
              updateUser({
                access_token: user.access_token,
                name,
                address,
                city,
                phone,
                email: currentEmail,
                _id: user.id,
              })
            );
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
  const itemsDelivery = [
    {
      title: "20.000 VND",
      description: "Less than 200.000 VND",
    },
    {
      title: "10.000 VND",
      description: "From 200.000 VND to under 500.000 VND",
    },
    {
      title: "Free shipping",
      description: "More than 500.000 VND",
    },
  ];

  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        background: "#f5f5fa",
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 0px",
        flexDirection: "column",
      }}
    >
      <div
        style={{ width: "100%", alignItems: "flex-start", marginLeft: "90px" }}
      >
       <button 
            style={{width: "fit-content", 
                    height: "fit-content", 
                    padding:'15px', 
                    background: "#fff", 
                    border:'none', 
                    borderRadius:'10px',
                    boxShadow: "0 0 15px 10px rgba(0, 0, 0, 0.09)",
                }}>
            <a href="/" style={{textDecoration:'none'}}>
                <LeftOutlined style={{fontSize:'16px', color:'#000'}}/> 
                <span style={{fontFamily:'Signika Negative', fontSize:'17px', fontWeight:'bold', color:'#000', marginLeft:'5px'}}>Back to home</span> 
            </a>
        </button>
      </div>
      <div
        style={{
          height: "auto",
          width: "95%",
          maxWidth: "auto",
          backgroundColor: "#fff",
          margin: "30px 0px",
          borderRadius: "15px",
          boxShadow: "0 0 15px 10px rgba(0, 0, 0, 0.09)",
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "Signika Negative",
            margin: "20px",
            fontSize: "32px",
          }}
        >
          Cart
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <p
              style={{
                fontFamily: "Signika Negative",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              SHIPPING CHARGES DISCOUNT CONDITION
            </p>
            <WrapperStyleHeaderDilivery>
              <StepComponent
                items={itemsDelivery}
                current={
                  diliveryPriceMemo === 10000
                    ? 2
                    : diliveryPriceMemo === 20000
                    ? 1
                    : order.orderItemsSlected.length === 0
                    ? 0
                    : 3
                }
              />
            </WrapperStyleHeaderDilivery>
            <div
              style={{ borderTop: "1px solid #2e2e2e", margin: "25px" }}
            ></div>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></CustomCheckbox>
                <span
                  style={{
                    fontFamily: "Signika Negative",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  All ( {order?.orderItems?.length} comics )
                </span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextHeaderTable>Unit price</TextHeaderTable>
                <TextHeaderTable>Quantity</TextHeaderTable>
                <TextHeaderTable>Total</TextHeaderTable>
                <DeleteOutlined
                  style={{ cursor: "pointer", fontSize: "17px" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <CustomCheckbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></CustomCheckbox>
                      <img
                        src={order?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "15px", color: "#242424" }}>
                          {convertPrice(order?.price)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "decrease",
                              order?.product,
                              order?.amount === 1
                            )
                          }
                        >
                          <MinusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                        <WrapperInputNumber
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                          min={1}
                          max={order?.countInStock}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "increase",
                              order?.product,
                              order?.amount === order.countInStock,
                              order?.amount === 1
                            )
                          }
                        >
                          <PlusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                      </WrapperCountOrder>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
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
                    style={{
                      color: "#e68a00",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    Change
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "7px",
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
                    padding: "7px",
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
                    padding: "7px",
                  }}
                >
                  <span>Shipping Charges</span>
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
              <WrapperTotal>
                <span>Total</span>
                <span
                  style={{
                    color: "#e68a00",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {convertPrice(totalPriceMemo)}
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: "#e68a00",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "10px",
                marginLeft: "40px",
              }}
              textButton={"Buy"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
                fontFamily: "Signika Negative",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="UPDATE THE SHIPPING INFORMATION"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleUpdateInforUser}
      >
        <Loading isLoading={isLoading}>
          <Form
            style={{ padding: "10px", marginTop: "20px" }}
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
                value={stateUserDetails.name}
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
                value={stateUserDetails.city}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your  phone!" }]}
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
    </div>
  );
};

export default OrderPage;
