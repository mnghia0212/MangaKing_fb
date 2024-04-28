import React, { useState } from "react";
import { WrapperLeft, WrapperRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import signinBg from "../../assets/images/signinBg.jpg";
import { Image } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useEffect } from "react";

const SignUpPage = () => {
  const [isShowPassword1, setIsShowPassword1] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // const handleCardClick = () => {
  //     navigate('/sign-in');
  // };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const mutation = useMutationHooks((data) => UserService.signupUser(data));

  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleCardClick();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleCardClick = () => {
    navigate("/sign-in");
  };
  const handleSignup = () => {
    mutation.mutate({ email, password, confirmpassword });
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
            Now you can sign an account up !
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
              onClick={() => setIsShowPassword1(!isShowPassword1)}
            >
              {isShowPassword1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="Enter your password"
              style={{ marginTop: "15px" }}
              type={isShowPassword1 ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>

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
              onClick={() => setIsShowPassword2(!isShowPassword2)}
            >
              {isShowPassword2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="Confirm your password"
              style={{ marginTop: "15px" }}
              type={isShowPassword2 ? "text" : "password"}
              value={confirmpassword}
              onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmpassword.length
              }
              onClick={handleSignup}
              size={40}
              styleButton={{
                border: "none",
                background: "#e68a00",
                width: "420px",
                height: "50px",
                borderRadius: "10px",
                marginTop: "25px",
              }}
              textButton="Sign up"
              styleTextButton={{
                color: "rgb(36,36,36)",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "SigniKa Negative",
              }}
            ></ButtonComponent>
          </Loading>
          <div style={{ marginTop: "15px" }}>
            <p
              style={{
                fontSize: "13px",
                fontFamily: "SigniKa Negative",
                marginTop: "15px",
              }}
            >
              {" "}
              Already have an account ?
              <WrapperTextLight
                onClick={handleCardClick}
                style={{ marginLeft: "5px" }}
              >
                Sign in
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

export default SignUpPage;
