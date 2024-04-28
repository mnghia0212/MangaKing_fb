import React, { useEffect, useRef, useState } from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import { WrapperNavbar, WrapperPage, WrapperProducts } from './style'
import { Col, Pagination, Row } from 'antd'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import { useQuery } from 'react-query'
import * as ProductService from "../../services/ProductService";


const FilterPage = () => {
    const onChange = () => {}

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

    return (
        <div style={{padding:'0px 110px', background:'#efefef'}}>
            <Row style={{ flexWrap:'nowrap',paddingTop:'20px'}}>
                <WrapperNavbar span={4} >
                    <NavbarComponent/>
                </WrapperNavbar>
                
                <Col span={20}>
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

                    <WrapperPage>
                        <Pagination 
                            showQuickJumper 
                            defaultCurrent={2} 
                            total={100} onChange={onChange} 
                            style={{textAlign:'center', marginTop:'20px'}}
                        />
                    </WrapperPage>
                    
                </Col>
                
            </Row>
        </div>
    )
}

export default FilterPage
