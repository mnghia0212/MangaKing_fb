import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  DropdownContent,
  TextRecommend,
  TextTypeProduct,
  TextTypeProductCategory,
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
  CategoryWrapper
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import bn1 from "../../assets/images/bn1.png";
import bn3 from "../../assets/images/bn3.png";
import bn4 from "../../assets/images/bn4.png";
import bn5 from "../../assets/images/bn5.png";
import bn6 from "../../assets/images/bn6.jpg";
import bn7 from "../../assets/images/bn7.png";

import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
// import { getAllProduct } from '../../services/ProductService'
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { CaretDownOutlined } from "@ant-design/icons";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const refSearch = useRef();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleFilterClick = () => {
    navigate("/filter");
  };
  return (
    <Loading isLoading={isLoading || loading}>
      <div
        style={{
          width: "1270px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
        }}
      >

        {/* under header */}
        <WrapperTypeProduct>
            {/* home */}
          <TextTypeProduct onClick={handleHomeClick}>Home</TextTypeProduct>

             {/* category */}
             <CategoryWrapper>
                <TextTypeProductCategory>Category <CaretDownOutlined style={{ fontSize: "13px" }} /></TextTypeProductCategory>
                <DropdownContent>
                    {typeProducts.map((item) => {
                        return <TypeProduct name={item} key={item} />;
                    })}
                </DropdownContent>
            </CategoryWrapper>


           {/* filter */}
           <TextTypeProduct onClick={handleFilterClick}>Filter</TextTypeProduct>
        </WrapperTypeProduct>
      </div>

      {/* slider */}
      <div>
        <SliderComponent arrImages={[bn7, bn3, bn1]} />
      </div>
      <div id="body" style={{ width: "100%", backgroundColor: "#efefef" }}>
        <div
          id="container"
          style={{
            height: "auto",
            width: "1270px",
            margin: "0 auto",
            padding: "40px 0px",
          }}
        >
          <div style={{ borderBottom: "1px solid #e68a00" }}>
            <TextRecommend>Recommend Comics</TextRecommend>
          </div>

          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                  author={product.author}
                  publisher={product.publisher}
                ></CardComponent>
              );
            })}
          </WrapperProducts>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <WrapperButtonMore
              textButton={
                products?.total === products?.data?.length
                  ? "Out of commic"
                  : "See more"
              }
              styleButton={{
                border: "2px solid #e68a00",
                width: "240px",
                height: "40px",
                borderRadius: "10px",
                color: `${
                  products?.total === products?.data?.length
                    ? "#000"
                    : "#e68a00"
                }`,
                fontWeight: "600",
                fontFamily: "SigniKa Negative",
                marginTop: "25px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              onClick={() => setLimit((prev) => prev + 5)}
            />
          </div>
        </div>
      </div>
      //{" "}
    </Loading>
  );
};

export default HomePage;
