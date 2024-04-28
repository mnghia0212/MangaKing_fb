import React, { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { useQuery } from "react-query";

const MyOrderPage = () => {

 const [invoiceIssued, setInvoiceIssued] = useState(() => {
    // Lấy trạng thái đã lưu từ local storage khi khởi tạo
    const saved = localStorage.getItem("invoiceIssued");
    return saved ? JSON.parse(saved) : {};
});
useEffect(() => {
    localStorage.setItem("invoiceIssued", JSON.stringify(invoiceIssued));
  }, [invoiceIssued]);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    return res.data;
  };
  const user = useSelector((state) => state.user);

  const queryOrder = useQuery(
    { queryKey: ["orders"], queryFn: fetchMyOrder },
    {
      enabled: state?.id && state?.token,
    }
  );
  const { isLoading, data } = queryOrder;

  const handleDetailsInvoice = (id) => {
    navigate(`/details-invoice/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const handleCanceOrder = (order) => {
    mutation.mutate(
      {
        id: order._id,
        token: state?.token,
        orderItems: order?.orderItems,
        userId: user.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };

  const handleIssueInvoice = (order) => {
    // Lưu thông tin order vào Local Storage
    const issuedInvoices = localStorage.getItem("issuedInvoices")
      ? JSON.parse(localStorage.getItem("issuedInvoices"))
      : [];
    
    // Thêm order mới vào mảng và lưu lại vào Local Storage
    issuedInvoices.push(order);
    localStorage.setItem("issuedInvoices", JSON.stringify(issuedInvoices));
    
    setInvoiceIssued((prevState) => {
      const newState = { ...prevState, [order._id]: true };
      localStorage.setItem("invoiceIssued", JSON.stringify(newState));
      return newState;
    });
    
    message.success("Issue invoice successfully");
  };


  const mutation = useMutationHooks((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

 
  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success();
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    } else if (isErrorCancle) {
      message.error();
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
          <img
            src={order?.image}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}
          >
            {convertPrice(order?.price)}
          </span>
          <span
            style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}
          >
            {order?.discount}%
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <div
          style={{
            height: "100%",
            width: "1270px",
            margin: "0 auto",
            padding: "30px 0px",
          }}
        >
          <h1
            style={{
              margin: "0px 0px 10px 0px",
              fontFamily: "Signika Negative",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            MY ORDERS
          </h1>
          <WrapperListOrder>
            {data?.map((order) => {

              // Kiểm tra xem hóa đơn đã được xuất hay chưa
              const isIssued = invoiceIssued[order._id];
                
              console.log("orderrrr", order, data);
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Status
                    </span>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Shipping:{" "}
                      </span>
                      <span
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >{`${order.isDelivered ? "Shipped" : "Unshipped"}`}</span>
                    </div>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>
                        Payment:{" "}
                      </span>
                      <span
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >{`${order.isPaid ? "Paid" : "Unpaid"}`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontFamily: "Signika Negative",
                          fontSize: "15px",
                        }}
                      >
                        Total:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "15px",
                          color: "rgb(56, 56, 61)",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>

                        {/* Nút "Cancel order", chỉ hiện nếu hóa đơn chưa được xuất */}
                        {!isIssued && (
                        <ButtonComponent
                            onClick={() => handleCanceOrder(order)}
                            disabled={isIssued}
                            size={40}
                            styleButton={{
                                height: "36px",
                                border: "1px solid #9255FD",
                                borderRadius: "4px",
                            }}                            
                            textButton={"Cancel order"}
                            styleTextButton={{
                                color: "#9255FD",
                                fontSize: "15px",
                                fontFamily: "Signika Negative",
                        }}
                        />
                        )}

                        <ButtonComponent
                            onClick={() => handleDetailsOrder(order._id)}
                            size={40}
                            styleButton={{
                                height: "36px",
                                border: "1px solid #9255FD",
                                borderRadius: "4px",
                            }}                            
                            textButton={"See order details"}
                            styleTextButton={{
                                color: "#9255FD",
                                fontSize: "15px",
                                fontFamily: "Signika Negative",
                            }}
                        />
                        

                        {/* Nút "See invoice details", chỉ hiển thị nếu hóa đơn đã được xuất */}
                        {isIssued && (
                        <ButtonComponent
                            onClick={() => handleDetailsInvoice(order._id)}
                            size={40}
                            styleButton={{
                                height: "36px",
                                border: "1px solid #9255FD",
                                borderRadius: "4px",
                            }}
                            textButton={"See invoice details"}
                            styleTextButton={{
                                color: "#9255FD",
                                fontSize: "15px",
                                fontFamily: "Signika Negative",
                            }}
                        />
                        )}

                         {/* Nút "Issue invoice", chỉ hiển thị nếu hóa đơn chưa được xuất */}
                        {!isIssued && (
                        <ButtonComponent
                            onClick={() => handleIssueInvoice(order)}
                            size={40}
                            styleButton={{
                                height: "36px",
                                border: "1px solid #9255FD",
                                borderRadius: "4px",
                                }}                          
                            textButton={"Issue invoice"}
                            styleTextButton={{
                                color: "#9255FD",
                                fontSize: "15px",
                                fontFamily: "Signika Negative",
                            }}
                        />
                        )}
                       
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
