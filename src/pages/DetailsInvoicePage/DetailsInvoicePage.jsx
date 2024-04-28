import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoSeller, WrapperInfoUser, WrapperInvoice, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperSeller, WrapperStyleContent } from './style'
import logo from '../../assets/images/logo.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import * as OrderService from '../../services/OrderService'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useQuery } from 'react-query'
import { Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'


const DetailsInvoicePage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params

  const pdfRef = useRef(null); // Reference to the component you want to export

  const exportPDF = () => {
    // Chọn nội dung cần xuất PDF
    const content = pdfRef.current;
  
    // Tính toán kích thước của nội dung
    const rect = content.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
  
    // Chuyển đổi các nội dung cần ẩn trước khi xuất PDF
    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach(el => el.style.visibility = 'hidden');
  
    // Sử dụng html2canvas để chụp ảnh nội dung
    html2canvas(content, {
      width,
      height,
      useCORS: true, // Đảm bảo rằng bất kỳ tài nguyên nào được tải từ một domain khác sẽ không bị CORS chặn
      scale: 2, // Tăng chất lượng hình ảnh xuất ra
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
        compressPDF: true, // Giảm kích thước của file PDF xuất ra
      });
  
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('invoice-details.pdf');
      
      // Đảo ngược việc ẩn nội dung
      elementsToHide.forEach(el => el.style.visibility = '');
    });
  };

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
    <style>
        {`
          @media print {
            .no-print {
              display: none;
            }
          }
        `}
      </style>


     <div ref={pdfRef} style={{width: '100%', height: 'auto', background: '#b8e2f4', display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
    
     <div className='no-print' style={{padding:'20px'}}>
      <Button onClick={handleHomeClick}><LeftOutlined />Back to orders</Button>
    </div>
    <h1 style={{margin:'0px 0px 30px 0px', fontFamily:'Signika Negative', fontSize:'30px', textAlign:'center' }}>INVOICE DETAILS</h1>
      <div  style={{ width: '1350px', margin: '0 auto', 
                    height: 'auto', background:'#fff', 
                    padding:'40px 0px', borderRadius:'10px', marginBottom:'50px',
                    boxShadow:'0 0 15px 10px rgba(0, 0, 0, 0.15)'
                   
                  }}>
        <WrapperSeller>
            <WrapperInfoUser>
                <WrapperLabel>ENTERPRISE INFORMATION</WrapperLabel>
                  <WrapperContentInfo>
                        <div className='name-info' style={{fontSize:'14px', fontFamily:'Signika Negative'}}> 
                                Manga King
                        </div>

                        <div className='address' style={{fontSize:'14px', fontFamily:'Signika Negative'}}>
                                280 An Duong Vuong, District 5, Ho Chi Minh City
                        </div>

                        <div className='phone-info' style={{fontSize:'14px', fontFamily:'Signika Negative'}}>
                                +84 528107856
                        </div>

                        <div className='address' style={{fontSize:'14px', fontFamily:'Signika Negative'}}>
                                mangaking@gmail.com
                        </div>
                  </WrapperContentInfo>
            </WrapperInfoUser>
            <div style={{borderRight: '1px solid #2e2e2e'}}></div>
            <WrapperInfoSeller>
                  <WrapperContentInfo style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <h1 style={{fontSize:'35px', fontFamily:'Signika Negative', margin:'0px'}}>E-Invoice</h1>
                  </WrapperContentInfo>
            </WrapperInfoSeller>
        </WrapperSeller>
        <div style={{borderTop: '1px solid #2e2e2e',margin:'25px'}}></div>
        <WrapperSeller>
            <WrapperInfoUser >
                <WrapperLabel style={{fontWeight:'bold'}}>Invoice ID:  #{data?._id}</WrapperLabel>
            </WrapperInfoUser>
            <div style={{borderRight: '1px solid #2e2e2e', marginRight:'80px'}}></div>
            <WrapperInfoUser>
                <WrapperLabel style={{fontWeight:'bold'}}>Date Issued: April 21st 2024</WrapperLabel>
            </WrapperInfoUser>
           
        </WrapperSeller>
        <div style={{borderTop: '1px solid #2e2e2e',margin:'25px'}}></div>

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

        <div className='no-print' style={{padding: '50px 0px 0px 40px'}}>
            <ButtonComponent
                
                onClick={() => exportPDF()}
                size={100}
                styleButton={{
                    width:'150px',
                    height: "60px",
                    background: 'red',
                    borderRadius: "4px",
                }}
                textButton={"Export PDF"}
                styleTextButton={{
                    color: "#f2f2f2",
                    fontSize: "15px",
                    fontFamily: "Signika Negative",
                }}
            />
        </div>
      </div>
    </div>
   </Loading>
  )
}

export default DetailsInvoicePage