import React, { useState, useEffect } from 'react';
import { convertPrice } from "../../utils";
import TableComponent from '../TableComponent/TableComponent';
import { WrapperHeader } from './style';
import { Excel } from "antd-table-saveas-excel";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import InputComponent from '../InputComponent/InputComponent';


const AdminInvoice = () => {
  const [issuedInvoices, setIssuedInvoices] = useState([]);
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0); // New state to store total amount

  const exportCustomExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("sheet 1")
      .addColumns(columns.map(col => ({ ...col, title: col.title, dataIndex: col.dataIndex }))) // Đảm bảo dữ liệu chính xác
      .addDataSource(issuedInvoices, {
        str2Percent: true,
        map: (record) => ({
          ...record,
          seller: 'Manga King'  // Thêm giá trị cố định cho cột Seller
        })
      })
      .saveAs("Invoices.xlsx");
  }

  useEffect(() => {
    const savedInvoices = localStorage.getItem("issuedInvoices"); // Đảm bảo tên khóa này phù hợp với tên bạn đã lưu
    const invoicesData = savedInvoices ? JSON.parse(savedInvoices) : [];
  
    const formattedData = invoicesData.map((invoice, index) => ({
      key: index,
      userName: invoice.shippingAddress.fullName, // Bạn cần tạo API hoặc cách nào đó để lấy tên người dùng từ ID người dùng
      comicName: invoice.orderItems[0]?.name, // Giả sử chỉ có một mục hàng hóa được hiển thị
      quantity: invoice.orderItems[0]?.amount,
      phone: invoice.shippingAddress.phone,
      address: `${invoice.shippingAddress.address}, ${invoice.shippingAddress.city}`,
      isPaid: invoice.isPaid ? "Paid" : "Unpaid",
      paymentMethod: invoice.paymentMethod,
      totalPrice: convertPrice(invoice.totalPrice),
    }));
  
    setIssuedInvoices(formattedData);
    setTotalInvoiceAmount(formattedData.reduce((total, curr) => total + parseFloat(curr.totalPrice), 0)); // Calculate total
  }, []);

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
});
  

  const columns = [
    // seller
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: 'seller',
      // Sử dụng render để luôn trả về "Manga King" cho mỗi hàng
      render: () => 'Manga King'
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',

      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },

    //comic name
    {
      title: 'Comic Name',
      dataIndex: 'comicName',
      key: 'comicName',

      sorter: (a, b) => a.comicName.length - b.comicName.length,
      ...getColumnSearchProps("comicName"),
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

    // quantity
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,  // Sửa đổi phép so sánh nếu quantity là số
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
      

    //phone
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',

    
    },

    //isPaid
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      key: 'isPaid',

      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
    },

    //payment method
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',

      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps("paymentMethod"),
    },

    //total price
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',

      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    }
  ];
  

 

  return (

    <div>
        <WrapperHeader>Invoice Management</WrapperHeader>

        <div style={{background:'#FFE990 ', padding:"20px", borderRadius:'10px', width:'fit-content'}}>
                <h2 style={{margin: "0px", fontSize:"22px",fontFamily:'Signika Negative'}}>Total Invoice Amount: {convertPrice(totalInvoiceAmount)}</h2> {/* Display total amount */}
        </div>

        <div style={{ marginTop: "20px" }}>
                <TableComponent
                    columns={columns}
                    dataSource={issuedInvoices}
                    isLoading={issuedInvoices.length === 0}
                    exportExcel={exportCustomExcel} // Truyền hàm tùy chỉnh
                    disableSelection={true} // This will disable the row selection feature
                    />
        </div>
    </div>
  );
};

export default AdminInvoice;
