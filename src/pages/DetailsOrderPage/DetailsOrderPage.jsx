import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import logo from '../../assets/images/logo.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useQuery } from 'react-query'
import { Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }

  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder }, {
    enabled: id
  })
  const { isLoading, data } = queryOrder
  console.log('dataaaadetail', data)
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[data])

  const navigate = useNavigate();


  const handleHomeClick = () => {
      navigate('/my-order');
  };

  return (
   <Loading isLoading={isLoading}>


     <div style={{width: '100%', height: 'auto', background: '#b8e2f4', display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
    
     <div style={{padding:'20px'}}>
      <Button onClick={handleHomeClick}><LeftOutlined />Back to orders</Button>
    </div>
    <h1 style={{margin:'0px 0px 30px 0px', fontFamily:'Signika Negative', fontSize:'30px', textAlign:'center' }}>ORDER DETAILS</h1>
      <div style={{ width: '1350px', margin: '0 auto', 
                    height: 'auto', background:'#fff', 
                    padding:'40px 0px', borderRadius:'10px', marginBottom:'50px',
                    boxShadow:'0 0 15px 10px rgba(0, 0, 0, 0.15)'
                   
                  }}>
     
      
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>PERSONAL INFORMATION</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info' style={{fontSize:'14px', fontFamily:'Signika Negative'}}>{data?.shippingAddress?.fullName}</div>
              <div className='address-info' style={{fontSize:'14px', fontFamily:'Signika Negative', marginTop:'10px'}}><span style={{fontWeight:'bold'}}>Address: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}</div>
              <div className='phone-info' style={{fontSize:'14px', fontFamily:'Signika Negative', marginTop:'10px'}}><span style={{fontWeight:'bold'}}>Phone number: </span> {data?.shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>SHIPPING METHOD</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info' style={{fontSize:'14px', fontFamily:'Signika Negative'}}><span className='name-delivery'>FAST </span>Economical shipping</div>
              <div className='delivery-fee' style={{fontSize:'14px', fontFamily:'Signika Negative', marginTop:'10px'}}><span style={{fontWeight:'bold'}}>Shpping charges: </span> {data?.shippingPrice}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>PAYMENT METHOD</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info' style={{fontSize:'14px', fontFamily:'Signika Negative'}}>{orderContant.payment[data?.paymentMethod]}</div>
              <div className='status-payment' style={{fontSize:'14px', fontFamily:'Signika Negative', marginTop:'10px'}}>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
        <div style={{borderTop: '1px solid #2e2e2e',margin:'25px'}}></div>
          <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent:'space-evenly', fontWeight:'600', gap:'50px'}}>
            <div style={{width: '100px', fontSize:'16px', fontFamily:'Signika Negative'}}>Comic</div>
            <WrapperItemLabel  style={{fontSize:'16px', fontFamily:'Signika Negative', marginLeft:'60px'}}>Unit price</WrapperItemLabel>
            <WrapperItemLabel  style={{fontSize:'16px', fontFamily:'Signika Negative', marginLeft:'30px'}}>Quantity</WrapperItemLabel>
            <WrapperItemLabel  style={{fontSize:'16px', fontFamily:'Signika Negative', marginLeft:'80px'}}>Discout</WrapperItemLabel>
          </div>
          {data?.orderItems?.map((order) => {
            return (
              <WrapperProduct>
                <div style={{display:'flex', flexDirection:'row', gap:'200px'}}>
                <WrapperNameProduct>
                  <img src={order?.image} 
                    style={{
                      width: '70px', 
                      height: '70px', 
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px'
                    }}
                  />
                  <div style={{
                    width: 200,
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    marginLeft: '10px',
                    height: '70px',
                    fontFamily:'Signika Negative',
                    fontSize:'17px'
                  }}>{order?.name}</div>
                </WrapperNameProduct>
              
                <div style={{display:'flex', flexDirection:'row', gap:'215px'}}>
                  <WrapperItem  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>{convertPrice(order?.price)}</WrapperItem>
                  <WrapperItem  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>{order?.amount}</WrapperItem>
                  <WrapperItem  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>{order?.discount ? convertPrice(priceMemo * order?.discount / 100) : '0 VND'}</WrapperItem>
                </div>
                </div>
               
               
                
               
              </WrapperProduct>
            )
          })}
         
         
      </WrapperStyleContent>
      <div style={{borderTop: '1px solid #2e2e2e',margin:'25px'}}></div>
      <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-around'}}>
                    <WrapperAllPrice>
                      <WrapperItemLabel  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>Provisional: </WrapperItemLabel>
                      <WrapperItem  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>{convertPrice(priceMemo)}</WrapperItem>
                    </WrapperAllPrice>
                    <WrapperAllPrice>
                      <WrapperItemLabel  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>Shipping charges: </WrapperItemLabel>
                      <WrapperItem  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>{convertPrice(data?.shippingPrice)}</WrapperItem>
                    </WrapperAllPrice>
                    <WrapperAllPrice>
                      <WrapperItemLabel  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>Total: </WrapperItemLabel>
                      <WrapperItem  style={{fontSize:'15px', fontFamily:'Signika Negative'}}><WrapperItem  style={{fontSize:'15px', fontFamily:'Signika Negative'}}>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
                    </WrapperAllPrice>
        </div>
      </div>
    </div>
   </Loading>
  )
}

export default DetailsOrderPage