import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import { AppstoreOutlined, RocketOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import OrderAdmin from "../../components/OrderAdmin/OrderAdmin";


const AdminPage = () => {
  const items = [
    getItem('User Management', 'user', <UserOutlined />),
    getItem('Product Management', 'product', <AppstoreOutlined />),
    getItem('Order Management', 'order',<ShoppingCartOutlined />)
     
    // ),
   ];

    const [keySelected, setKeySelected]= useState(' ');

    const renderPage = (key) => {
      switch(key){
        case 'user' : return (
          <AdminUser/>
        )

        case 'product' : return (
          <AdminProduct/>
        )

        case 'order' : return (
          <OrderAdmin/>
        )

        default: return (<></>)
      }  
    }

    const handleOnClick = ({key}) => {
        setKeySelected(key)
    }
  
    return (
      <>
      <HeaderComponent isHiddenSearch isHiddenCart/>
      <div style={{display:"flex"}}>
         <Menu
            mode="inline"
            style={{
                 width: 256,
                 boxShadow:'1px 1px 1px #000',
                 height:'auto',
                 padding:'5px',
                
             }}
            items={items}
            onClick={handleOnClick}
          />
          <div style={{flex: '1', padding:'25px'}}>
             {renderPage(keySelected)}
          </div>
      </div>
      </>
    )
}

export default AdminPage