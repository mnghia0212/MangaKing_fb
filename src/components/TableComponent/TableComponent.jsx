import { Table } from 'antd';
import React, { useMemo, useState } from 'react'
import Loading from '../LoadingComponent/Loading';
import { Excel } from "antd-table-saveas-excel";


const TableComponent = (props) => {
    
    const { selectionType = 'checkbox', data: dataSource = [], isLoading= false, columns=[], handleDeleteMany, disableSelection } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
      const arr = columns?.filter((col) => col.dataIndex !== 'action')
      return arr
    }, [columns])

    console.log('newColumnExport', newColumnExport)

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys)
          console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
      const { exportExcel: customExportExcel } = props;

        const exportExcel = () => {
        if (customExportExcel) {
            customExportExcel();  // Sử dụng hàm tùy chỉnh nếu có
        } else {
            // Hàm export mặc định
            const excel = new Excel();
            excel
            .addSheet("sheet 1")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
        }
        };



  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }

  return (
    <div>
        <Loading isLoading={isLoading}  >
          <div style={{display:'flex', gap:'10px'}}>
            {rowSelectedKeys.length > 0 && (
              <div style={{
                background: 'red', 
                color: '#fff',
                fontWeight: 'bold',
                padding: '6px 13px',
                cursor: 'pointer',
                width:'70px',
                borderRadius:'5px',
                fontFamily:'Signika Negative',
                display:'flex',
                justifyContent:'center'
              }}
              onClick={handleDeleteAll}
              >
                Delete
              </div>
            )}
            <button style={{border:'none',background:'#10793F', color:'#fff',borderRadius:'5px',fontWeight: 'bold',  fontFamily:'Signika Negative',  padding: '6px 13px',}} onClick={exportExcel}>Export Excel</button>
          </div>
        
        <Table style={{marginTop:'15px'}}
             rowSelection={disableSelection ? undefined : {
                type: selectionType,
                ...rowSelection,
              }}
            columns={columns}
            dataSource={dataSource}
            {...props}
        />
        </Loading>
    </div>
  )
}

export default TableComponent