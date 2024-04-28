import React, { useState, useEffect, useRef } from 'react';
import { DrawerContent, DrawerTitle, InfoContent, InfoLabel, InfoSection, WrapperContentInfo, WrapperHeader, WrapperInfoSeller, WrapperInfoUser, WrapperLabel, WrapperSeller } from './style';
import TableComponent from '../TableComponent/TableComponent';
import { Button, Space } from 'antd';
import { Excel } from "antd-table-saveas-excel";
import InputComponent from '../InputComponent/InputComponent';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const AdminIEBill = () => {
  const [transactions, setTransactions] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const pdfRef = useRef(null); // Reference to the component you want to export

  const exportPDF = async () => {
    if (pdfRef.current) {
      const elementsToHide = document.querySelectorAll('.no-print');
      elementsToHide.forEach(el => el.style.display = 'none');
      
      try {
        // Set scale to a higher value to improve image quality
        const scale = 3; // Ví dụ: gấp đôi kích thước của canvas
        const canvas = await html2canvas(pdfRef.current, { scale });
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = canvas.width / scale;
        const pdfHeight = canvas.height / scale;
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          // Use width and height from the scaled canvas
          format: [pdfWidth, pdfHeight]
        });
        // Draw the image scaled down to the original size
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('transaction-details.pdf');
      } catch (error) {
        console.error("Error exporting PDF: ", error);
      } finally {
        elementsToHide.forEach(el => el.style.display = '');
      }
    }
  };
  
  const exportCustomExcel = () => {
    const excel = new Excel();
    excel
      .addSheet('Transactions')
      .addColumns(columns)
      .addDataSource(transactions)
      .saveAs('Transactions.xlsx');
  }

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  const handleViewDetails = (record) => {
    setSelectedTransaction(record);
    setIsOpenDrawer(true);
  };

  const closeDrawer = () => {
    setIsOpenDrawer(false);
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
});

  const columns = [
    // comic name
    {
        title: 'Comic Name',
        dataIndex: 'name',
        key: 'name',
  
        sorter: (a, b) => a.name.length - b.name.length,
        ...getColumnSearchProps("name"),
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',

    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',

    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },

    {
      title: 'Stock',
      dataIndex: 'countInStock',
      key: 'countInStock',
      sorter: (a, b) => a.countInStock - b.countInStock,

    },

    {
        title: 'Publisher',
        dataIndex: 'publisher',
        key: 'publisher',
    },

    {
        title: "Action",
        dataIndex: "action",
        render: (_, record) => (
            <EyeOutlined onClick={() => handleViewDetails(record)} 
                style={{ color: 'brown', cursor: 'pointer', fontSize:"23px", marginLeft: "10px" }} />
          )
    },
  ];

  return (
    <div>
        <style>
            {`
            @media print {
                .no-print {
                display: none;
                }
            }
            `}
        </style>
        {/* table ie bill */}
      <WrapperHeader>I/E Bill Management</WrapperHeader>
      <TableComponent
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        exportExcel={exportCustomExcel} // Truyền hàm tùy chỉnh
        disableSelection={true} // This will disable the row selection feature
      />



      {/* drawer component */}
      <DrawerComponent 
        title= {selectedTransaction?.transactionType === "import" ? "Import Details"   : "Export Details"  }
        width= "65%"
        onClose={closeDrawer}
        isOpen={isOpenDrawer}
      >
         <DrawerContent ref={pdfRef}>
            <DrawerTitle>{selectedTransaction?.transactionType === "import" ? "Import Details" : "Export Details"}</DrawerTitle>

                {/* block info */}
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


            
                    <WrapperInfoUser>
                        <WrapperLabel>TRANSACTION INFORMATION</WrapperLabel>
                        <WrapperContentInfo>
                                <div className='name-info' style={{fontSize:'14px', fontFamily:'Signika Negative'}}> 
                                        Date: {new Date().toLocaleDateString()}
                                </div>

                                <div className='address' style={{fontSize:'14px', fontFamily:'Signika Negative'}}>
                                        Transaction type: {selectedTransaction?.transactionType}
                                </div>

                                <div className='phone-info' style={{fontSize:'14px', fontFamily:'Signika Negative'}}>
                                        Publisher: {selectedTransaction?.publisher}
                                </div>

                                <div className='address' style={{fontSize:'14px', fontFamily:'Signika Negative'}}>
                                        contributeForMangaKing@gmail.com
                                </div>
                        </WrapperContentInfo>
                    </WrapperInfoUser>
                </WrapperSeller>



                {/* table bill */} 
                <WrapperLabel style={{marginTop:"50px"}}>Comic information</WrapperLabel>
                <div style={{borderBottom:"2px solid #BFBFBF ", marginTop:"20px", marginBottom:"20px"}}></div>
                <InfoSection>
                    <InfoLabel>Comic name:</InfoLabel>
                    <InfoContent>{selectedTransaction?.name}</InfoContent>
                </InfoSection>
                <div style={{borderBottom:"2px solid #BFBFBF ", marginTop:"20px", marginBottom:"20px"}}></div>



                <InfoSection>
                    <InfoLabel>Category:</InfoLabel>
                    <InfoContent>{selectedTransaction?.type}</InfoContent>
                </InfoSection>
                <div style={{borderBottom:"2px solid #BFBFBF ", marginTop:"20px", marginBottom:"20px"}}></div>



                <InfoSection>
                    <InfoLabel>Quantity:</InfoLabel>
                    <InfoContent>{selectedTransaction?.quantity}</InfoContent>
                </InfoSection>
                <div style={{borderBottom:"2px solid #BFBFBF ", marginTop:"20px", marginBottom:"20px"}}></div>

                <div className='no-print' >
                    <ButtonComponent
                        
                        onClick={() => exportPDF()}
                        size={100}
                        styleButton={{
                            width:'130px',
                            height: "45px",
                            background: 'red',
                            borderRadius: "4px",
                            marginTop:"20px"
                        }}
                        textButton={"Export PDF"}
                        styleTextButton={{
                            color: "#f2f2f2",
                            fontSize: "15px",
                            fontFamily: "Signika Negative",
                        }}
                    />
                </div>

        </DrawerContent>
      </DrawerComponent>

    </div>
  );
};

export default AdminIEBill;
