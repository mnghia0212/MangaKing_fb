import { Badge, Button, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser, updateUser } from "../../redux/sildes/userSlides";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/sildes/productSilde";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const userdulieu = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const order = useSelector((state) => state.order);
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleNavigateCart = () => {
    navigate("/cart");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserName(userdulieu?.name);
    setUserAvatar(userdulieu?.avatar);
    setLoading(false);
  }, [userdulieu?.name, userdulieu?.avatar]);

  const content = (
    <div>
      {userdulieu?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          System Management
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Account Information
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate("my-order")}>
        My Order
      </WrapperContentPopup>
      
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Log Out
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: userdulieu?.id,
          token: userdulieu?.access_token,
        },
      });
    }
   else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const onSearch = (e) => {
    console.log("e", e.target.value);
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div>
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={4}>
          <a href="/">
            <WrapperTextHeader>Manga King</WrapperTextHeader>
          </a>
        </Col>

        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              placeholder="Type the name of the book to search"
              size="large"
              allowClear
              textButton="Search"
              onChange={onSearch}
              bordered={false}
            />
          </Col>
        )}

        <Col
          span={7}
          style={{ display: "flex", gap: "38px", alignItems: "center" }}
        >
          <Loading isLoading={isLoading}>
            <WrapperHeaderAccount style={{ marginLeft: "20px" }}>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "28px" }} />
              )}
              {userdulieu?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsOpenPopup((prev) => !prev)}
                    >
                      {" "}
                      {userName?.length ? userName : userdulieu?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div>
                  <WrapperTextHeaderSmall onClick={handleNavigateSignIn}>
                    Sign in
                  </WrapperTextHeaderSmall>
                  <WrapperTextHeaderSmall> / </WrapperTextHeaderSmall>
                  <WrapperTextHeaderSmall onClick={handleNavigateSignUp}>
                    Sign up
                  </WrapperTextHeaderSmall>
                </div>
              )}
              {/* <div>
                            <WrapperTextHeaderSmall onClick={handleNavigateSignIn}>Sign in</WrapperTextHeaderSmall>
                            <WrapperTextHeaderSmall> / </WrapperTextHeaderSmall>
                            <WrapperTextHeaderSmall onClick={handleNavigateSignUp}>Sign up</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div> */}
            </WrapperHeaderAccount>
          </Loading>

          {!isHiddenCart && (
            <div
              onClick={() => navigate("/order")}
              style={{
                cursor: "pointer",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Badge count={order?.orderItems?.length} size="default">
                <ShoppingCartOutlined style={{ fontSize: "28px" }} />
              </Badge>

              <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
