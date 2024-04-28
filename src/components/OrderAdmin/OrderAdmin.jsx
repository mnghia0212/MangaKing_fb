import { Button, Form, Space } from "antd";
import React  from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { convertPrice, getBase64 } from "../../utils";
import { useEffect, useState } from "react";
import * as message from "../Message/Message";

import * as OrderService from "../../services/OrderService";

import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";
import { useQuery } from "react-query";
import { Excel } from "antd-table-saveas-excel";


const OrderAdmin = () => {

    // useState tính tổng tiền
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

    // Tính tổng tiền khi có dữ liệu
    useEffect(() => {
        if (orders?.data) {
            const total = orders.data.reduce((acc, order) => acc + order.totalPrice, 0);
            setTotalPrice(total);
        }
        }, [orders?.data]);

  const exportCustomExcel = () => {
    const excel = new Excel();
    const simplifiedData = dataTable.map(item => ({
      ...item,
      product: item.product.replace(/\n/g, ", "), // Replace new lines with commas for better visibility in Excel
      amount: item.amount.replace(/\n/g, ", "),
    }));
    excel
      .addSheet("Orders")
      .addColumns(columns.filter(col => col.dataIndex !== 'action').map(col => ({
        title: col.title,
        dataIndex: col.dataIndex
      })))
      .addDataSource(simplifiedData, {
        str2Percent: true
      })
      .saveAs("Orders.xlsx");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "User name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Product name",
      dataIndex: "product",
      sorter: (a, b) => a.product.length - b.product.length,
      ...getColumnSearchProps("product"),
      render: (text) => {
        // Kiểm tra nếu giá trị không chứa ký tự xuống dòng "\n"
        if (text.indexOf("\n") === -1) {
          return <div>{text}</div>;
        }

        // Nếu có ký tự xuống dòng, phân tách thành các dòng riêng biệt
        return (
          <div>
            {text.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index !== text.split("\n").length - 1 && <br />}
              </span>
            ))}
          </div>
        );
      },
    },

    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount - b.amount,  // Sửa đổi phép so sánh nếu quantity là số
        render: (text) => {
          // Đảm bảo rằng text là một chuỗi trước khi thực hiện split
          const textString = String(text);
          if (textString.indexOf("\n") === -1) {
            return <div>{textString}</div>;
          }
          return (
            <div>
              {textString.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index !== textString.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          );
        },
    },
    
    {
      title: "Phone",
      dataIndex: "phone",
    
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Paided",
      dataIndex: "isPaid",
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps("isPaid"),
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
     
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      //render: (value) => convertPrice(value),
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    },
  ];

  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      console.log("usewr", order);
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        product: order?.orderItems?.map((item) => item.name).join("\n"),
        amount: order?.orderItems?.map((item) => item.amount).join("\n"),

        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        paymentMethod: orderContant.payment[order?.paymentMethod],
        isPaid: order?.isPaid ? "TRUE" : "FALSE",
        isDelivered: order?.isDelivered ? "TRUE" : "FALSE",
        totalPrice: convertPrice(order?.totalPrice),
      };
    });

  return (
        <div>

            <WrapperHeader>Order Management</WrapperHeader>

                <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between", alignItems:'center', padding:"0px 20px" }} >
                        <div style={{ height: 200, width: 200 }}>
                                <PieChartComponent data={orders?.data} />
                        </div>

                        <div style={{background:'#FFE990 ', padding:"20px", borderRadius:'10px'}}>
                            <h2 style={{margin: "0px", fontSize:"22px",fontFamily:'Signika Negative'}}>TOTAL ORDER AMOUNT: {convertPrice(totalPrice)}</h2>
                        </div>
                </div>

     
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingOrders}
          data={dataTable}
          exportExcel={exportCustomExcel}  // Custom export function
          disableSelection={true} // This will disable the row selection feature
        />
      </div>

    </div>
  );
};

export default OrderAdmin;
