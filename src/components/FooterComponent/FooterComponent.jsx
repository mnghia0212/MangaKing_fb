import React from 'react'
import { StyleTextCommit, StyleTextH4, StyleTextLogo, StyleTextSpan, WrapperCol2Row2, WrapperCopyRight, WrapperFooter, WrapperHeadingList, WrapperLogoText, WrapperRow1Footer, WrapperRow2Footer, WrapperSocialIcon } from './style'
import { Col, Image, Input, Row } from 'antd'
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined, SendOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import InputComponent from '../InputComponent/InputComponent'

const FooterComponent = () => {
  return (
        <div>
            <WrapperFooter>
                <WrapperRow1Footer>
                    <Col span={8} style={{display:'flex', flexDirection:'row', paddingBottom:'20px'}}>

                        <EnvironmentOutlined style={{color: '#ff5e14', fontSize: '30px', float: 'left', marginTop: '25px'}}/>
                        <div style={{marginLeft:'5px'}}>
                            <StyleTextH4>Find us</StyleTextH4>
                            <StyleTextSpan>280 An Duong Vuong, District 5, Ho Chi Minh City</StyleTextSpan>
                        </div>
\                    </Col >

                    <Col span={8} style={{marginLeft:'30px'}}>
                        <PhoneOutlined style={{color: '#ff5e14', fontSize: '30px', float: 'left', marginTop: '35px'}}/>
                        <div style={{marginLeft:'35px'}}>
                            <StyleTextH4>Call us</StyleTextH4>
                            <StyleTextSpan>+84 528107856</StyleTextSpan>
                        </div>
                    </Col>

                    <Col span={8} style={{marginLeft:'30px'}}>
                        <MailOutlined style={{color: '#ff5e14', fontSize: '30px', float: 'left', marginTop: '35px'}}/>
                        <div style={{marginLeft:'40px'}}>
                            <StyleTextH4>Mail us</StyleTextH4>
                            <StyleTextSpan>mangaking@gmail.com</StyleTextSpan>
                        </div>
                    </Col>
                </WrapperRow1Footer>

                <WrapperRow2Footer>
                    <Col span={8}>
                        <div>
                            <div>
                                <StyleTextLogo>Manga King</StyleTextLogo>
                            </div>

                            <div>
                                <StyleTextCommit>
                                    Trust us when choosing this is where you buy comics, we commit to bring you the greatest comics !
                                </StyleTextCommit>
                            </div>

                            <div>
                                <StyleTextH4>
                                    Follow us
                                </StyleTextH4>
                                
                                <WrapperSocialIcon>
                                    <a href='#' ><FacebookOutlined 
                                        style={{background:'#3B5998', color:'#fff',width:'40px', height:'40px', borderRadius:'50%', justifyContent:'center', fontSize:'15px'}}/></a>
                                    <a href='#' ><InstagramOutlined 
                                        style={{background:'#f40083', color:'#fff',width:'40px', height:'40px', borderRadius:'50%', justifyContent:'center', fontSize:'15px', marginLeft:'10px'}}/></a>
                                    <a href='#' ><YoutubeOutlined 
                                        style={{background:'#bb0000', color:'#fff',width:'40px', height:'40px', borderRadius:'50%', justifyContent:'center', fontSize:'15px', marginLeft:'10px'}}/></a>
                                </WrapperSocialIcon>
                               
                            </div>
                        </div>
                    </Col>

                    <Col span={8} style={{marginLeft:'30px'}}>
                        <WrapperCol2Row2>
                            <WrapperHeadingList>
                                <h4 style={{margin:'0px'}}>Service & Support</h4>
                            </WrapperHeadingList>
                            <ul>
                                <li><a href="#">Terms of use</a></li>
                                <li><a href="#">Privacy policy</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Look up orders</a></li>
                                <li><a href="#">Ordering guide</a></li>
                                <li><a href="#">Return - Refund policy</a></li>
                                <li><a href="#">Transport methods</a></li>
                                <li><a href="#">Payment methods</a></li>
                            </ul>
                            
                           

                        </WrapperCol2Row2>
                        
                    </Col>

                    <Col span={8} style={{marginLeft:'30px'}}>
                        <WrapperCol2Row2>
                            <WrapperHeadingList>
                                <h4 style={{marginTop:'0px'}}>Subscribe</h4>
                            </WrapperHeadingList>

                            <div>
                                <StyleTextCommit>
                                    Kindly fill the form below if you don't want to be missed any news.
                                </StyleTextCommit>
                            </div>

                            <div style={{position: 'relative', overflow: 'hidden'}}>
                                <InputComponent placeholder='Your Email' style={{
                                    width: '100%',
                                    padding: '14px 28px',
                                    background: '#fff',
                                    border: '1px solid #2E2E2E',
                                    color:'#2E2E2E',
                                    fontFamily:'SigniKa Negative',
                                    
                                }}/>
                                <ButtonComponent 
                                    icon={<SendOutlined  style={{color:'#fff', fontSize:'20px', marginLeft:'5px'}}/>}
                                    styleButton={{
                                        position: 'absolute',
                                        right: '0',
                                        background: '#ff5e14',
                                        padding: '25px 20px',
                                        border: '1px solid #ff5e14',
                                        top: '0',
                                        display:'flex',
                                        alignItems:'center',               
                                    }}
                                    
                                />
                             
                            </div>
                        </WrapperCol2Row2>

                    </Col>
                </WrapperRow2Footer>

                
            </WrapperFooter>

            <Row style={{width:'100%'}}>
                <Col span={24}>
                    <WrapperCopyRight >
                        <p>COPYRIGHTS © 2023 BY MANGA KING. POWERED BY MANGA KING.</p>
                    </WrapperCopyRight>
                </Col>
            </Row>
        </div>
      
  )
}

export default FooterComponent
