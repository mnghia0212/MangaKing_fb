import React, { useEffect, useRef } from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import * as PostCommentService from "../../services/PostCommentService";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/sildes/userSlides";
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userdulieu = useRef();
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, access_token, rests);
  });
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = mutation;

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    userdulieu.current = res?.data;
  };

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(userdulieu?.id, userdulieu?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    console.log("abc", userdulieu.current);
  }, [userdulieu.current]);

  return (
    <div style={{ padding: "20px 150px", background: "#efefef" }}>
      <h5>
            <a href="/" 
                style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontFamily: "Signika Negative",
                    fontSize: "18px",
                    marginTop: "10px",
                    color:'black',
                    textDecoration:'none'

                  }}
                  
            >
                Home
            </a>
         
        <span
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            fontFamily: "Signika Negative",
            fontSize: "18px",
          }}
        >
         {" "}- Comic Details
        </span>
      </h5>
      <ProductDetailComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailPage;
