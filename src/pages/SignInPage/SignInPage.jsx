import React, { useEffect, useState } from "react";
import { WrapperLeft, WrapperRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Button, Image } from "antd";
import signinBg from "../../assets/images/signinBg.jpg";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/sildes/userSlides";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      // console.log('data?.access_token', data?.access_token)
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  // useEffect(() => {
  //     if (isSuccess) {
  //       if(location?.state) {
  //         navigate(location?.state)
  //       }else {
  //         navigate('/')
  //       }
  //       localStorage.setItem('access_token', JSON.stringify(data?.access_token))
  //       localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
  //       if (data?.access_token) {
  //         const decoded = jwtDecode(data?.access_token)
  //         if (decoded?.id) {
  //           handleGetDetailsUser(decoded?.id, data?.access_token)
  //         }
  //       }
  //     }
  //   }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  console.log("mutation", mutation);

  const handleCardClick = () => {
    navigate("/sign-up");
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ccc",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "450px",
          borderRadius: "10px",
          backgroundColor: "#efefef",
          display: "flex",
        }}
      >
        <WrapperLeft>
          <h1 style={{ fontFamily: "SigniKa Negative" }}>Hello,</h1>
          <p style={{ fontFamily: "SigniKa Negative", fontSize: "13px" }}>
            Please sign in or sign up !
          </p>
          <InputForm
            placeholder="Enter your email"
            style={{ marginTop: "15px" }}
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              style={{
                zIndex: 10,
                position: "absolute",
                top: "25px",
                right: "8px",
                fontSize: "13px",
                cursor: "pointer",
              }}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="Enter your password"
              style={{ marginTop: "15px" }}
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              onClick={handleSignIn}
              disabled={!email.length || !password.length}
              size={40}
              styleButton={{
                border: "none",
                background: "#e68a00",
                width: "420px",
                height: "50px",
                borderRadius: "10px",
                marginTop: "25px",
              }}
              textButton="Sign in"
              styleTextButton={{
                color: "rgb(36,36,36)",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "SigniKa Negative",
              }}
            ></ButtonComponent>
          </Loading>
          <div style={{ marginTop: "15px" }}>
            <WrapperTextLight>Forget your password?</WrapperTextLight>
            <p
              style={{
                fontSize: "13px",
                fontFamily: "SigniKa Negative",
                marginTop: "15px",
              }}
            >
              {" "}
              Don't have an account yet?
              <WrapperTextLight
                onClick={handleCardClick}
                style={{ marginLeft: "5px" }}
              >
                Create an account
              </WrapperTextLight>
            </p>
          </div>
        </WrapperLeft>

        <WrapperRight>
          <Image
            src={signinBg}
            preview={false}
            alt="Signin Image"
            width="270px"
            height="280px"
            style={{ paddingTop: "5px" }}
          />
          <h4
            style={{
              fontFamily: "SigniKa Negative",
              padding: "0",
              margin: "10px 0 0 0",
            }}
          >
            Buy Manga on Manga King
          </h4>
          <h4 style={{ fontFamily: "SigniKa Negative", margin: "10px 0 0 0" }}>
            This is where u can get any manga you want !
          </h4>
        </WrapperRight>
      </div>
    </div>
  );
};

export default SignInPage;
