import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import { AppstoreOutlined, CloudDownloadOutlined, CloudServerOutlined, ExpandAltOutlined, MoneyCollectOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import OrderAdmin from "../../components/OrderAdmin/OrderAdmin";
import AdminInvoice from "../../components/AdminInvoice/AdminInvoice";
import { StyledMenu, StyledMenuItem } from "./style";
import AdminStock from "../../components/AdminStock/AdminStock";
import AdminIEBill from "../../components/AdminIEBill/AdminIEBill";


const AdminPage = () => {
  const items = [
    getItem('User Management', 'user', <UserOutlined />),
    getItem('Product Management', 'product', <AppstoreOutlined />),
    getItem('Stock Management', 'stock', <CloudServerOutlined />),
    getItem('Order Management', 'order',<ShoppingCartOutlined />),
    getItem('Invoice Management', 'invoice',<MoneyCollectOutlined />),
    getItem('I/E Bill Management', 'ieBill',<ExpandAltOutlined />),

    // ),
   ];

    const [keySelected, setKeySelected]= useState('user');

    const renderPage = (key) => {
      switch(key){
        case 'user' : return (
          <AdminUser/>
        )

        case 'product' : return (
          <AdminProduct/>
        )

        case 'stock' : return (
            <AdminStock/>
          )
        
        case 'order' : return (
          <OrderAdmin/>
        )

        case 'invoice' : return (
            <AdminInvoice/>
        )

        case 'ieBill' : return (
            <AdminIEBill/>
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
      <StyledMenu
            mode="inline"
            items={items}
            onClick={handleOnClick}
            selectedKeys={[keySelected]}
            >
            {items.map((item) => (
                <StyledMenuItem key={item.key} icon={item.icon}>
                {item.label}
                </StyledMenuItem>
            ))}
        </StyledMenu>
          <div style={{flex: '1', padding:'25px'}}>
             {renderPage(keySelected)}
          </div>
      </div>
      </>
    )
}

export default AdminPage