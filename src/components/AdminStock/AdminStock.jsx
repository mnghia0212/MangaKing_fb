import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader, WrapperUploadFile } from "./style";
import {
EditOutlined,
SearchOutlined,
ImportOutlined,
ExportOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal, Select, Space, Upload } from "antd";
import InputComponent from "../../components/InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminStock = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [rowSelected, setRowSelected] = useState("");
const [isOpenDrawer, setIsOpenDrawer] = useState(false);
const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
const [typeSelect, setTypeSelect] = useState("");
const user = useSelector((state) => state?.user);
const searchInput = useRef(null);
const inittial = () => ({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    newType: "",
    discount: "",
    author: "",
    publisher: ""
});

const [stateProduct, setStateProduct] = useState(inittial());
const [stateProductDetails, setStateProductDetails] = useState(inittial());
const [actionType, setActionType] = useState(""); // '' | 'edit' | 'import' | 'export'  

const [form] = Form.useForm();

const mutation = useMutationHooks((data) => {
    const res = ProductService.createProduct(data);
    return res;
});

const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
});

const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
});

const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
});

const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
};

const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
    setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
        author: res?.data?.author,
        publisher: res?.data?.publisher
    });
    }
    setIsLoadingUpdate(false);
};

useEffect(() => {
    if (!isModalOpen) {
    form.setFieldsValue({
        name: stateProductDetails.name,
        type: stateProductDetails.type,
        countInStock: stateProductDetails.countInStock,
        price: stateProductDetails.price,
        description: stateProductDetails.description,
        rating: stateProductDetails.rating,
        image: stateProductDetails.image,
        discount: stateProductDetails.discount,
        author: stateProductDetails.author,
        publisher: stateProductDetails.publisher,
    });
    } else {
    form.setFieldValue(inittial());
    }
}, [form, stateProductDetails]);

useEffect(() => {
    if (rowSelected && isOpenDrawer) {
    setIsLoadingUpdate(true);
    fetchGetDetailsProduct(rowSelected);
    }
}, [rowSelected, isOpenDrawer]);

const handleDetailsProduct = (record, type) => {
    setIsOpenDrawer(true);
    setRowSelected(record._id);
    setActionType(type);
    fetchGetDetailsProduct(record._id);
};
  

const handleDeleteManyProducts = (ids) => {
    mutationDeleteMany.mutate(
    { ids: ids, token: user?.access_token },
    {
        onSettled: () => {
        queryProduct.refetch();
        },
    }
    );
};

const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
};

const { data, isLoading, isSuccess, isError } = mutation;
const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
} = mutationUpdate;
const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
} = mutationDelete;
const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
} = mutationDeleteMany;

const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
});
const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
});
const { isLoading: isLoadingProducts, data: products } = queryProduct;

// action column
const renderAction = (record) => {
    //console.log(record); // Thêm dòng này để kiểm tra
    return (
      <div>
        <ImportOutlined
          style={{
            color: "blue",
            fontSize: "23px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={() => handleDetailsProduct(record, 'import')}
        />
  
        <ExportOutlined
          style={{
            color: "green",
            fontSize: "23px",
            cursor: "pointer",
            marginLeft: "17px",
          }}
          onClick={() => handleDetailsProduct(record, 'export')}
        />
      </div>
    );
};
  

const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
};
const handleReset = (clearFilters) => {
    clearFilters();
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
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
            marginBottom: 8,
            display: "block",
        }}
        />
        <Space>
        <Button
            type="danger"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
            width: 90,
            background: "#e68a00",
            }}
        >
            Search
        </Button>
        <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
        color: filtered ? "#e68a00" : undefined,
        }}
    />
    ),
    onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
    if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
    }
    },
});

const columns = [
    {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.length - b.name.length,
    ...getColumnSearchProps("name"),
    },
    {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
    filters: [
        {
        text: ">= 50000",
        value: ">=",
        },
        {
        text: "<= 50000",
        value: "<=",
        },
    ],
    onFilter: (value, record) => {
        if (value === ">=") {
        return record.price >= 50;
        }
        return record.price <= 50;
    },
    },

    {
        title: "Stock",
        dataIndex: "countInStock",
    },
    
    {

    title: "Type",
    dataIndex: "type",
    },
    {
    title: "Action",
    dataIndex: "action",
    render: (text, record) => renderAction(record), // Đảm bảo truyền 'record'
    },
];
const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
    return { ...product, key: product._id };
    });

useEffect(() => {
    if (isSuccess && data?.status === "OK") {
    message.success();
    handleCancel();
    form.setFieldValue();
    } else if (isError) {
    message.error();
    }
}, [isSuccess]);

useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
    message.success();
    handleCancelDelete();
    } else if (isErrorDeleted) {
    message.error();
    }
}, [isSuccessDeleted]);

useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
    message.success();
    } else if (isErrorDeletedMany) {
    message.error();
    }
}, [isSuccessDeletedMany]);

const handleCloseDetails = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    discount: "",
    author: "",
    publisher: ""
    });
    form.resetFields();
};

useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
    message.success();
    handleCloseDetails();
    } else if (isErrorUpdated) {
    message.error();
    }
}, [isSuccessUpdated]);

const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
    discount: "",
    });
    form.resetFields();
};

const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
};

const handleDeleteProduct = () => {
    mutationDelete.mutate(
    { id: rowSelected, token: user?.access_token },
    {
        onSettled: () => {
        queryProduct.refetch();
        },
    }
    );
};

const handleOnChange = (e) => {
    setStateProduct({
    ...stateProduct,
    [e.target.name]: e.target.value,
    });
};

const handleOnChangeDetails = (e) => {
    setStateProductDetails({
    ...stateProductDetails,
    [e.target.name]: e.target.value,
    });
};

const onFinish = () => {
    const params = {
    name: stateProduct.name,
    price: stateProduct.price,
    description: stateProduct.description,
    rating: stateProduct.rating,
    image: stateProduct.image,
    type:
        stateProduct.type === "add_type"
        ? stateProduct.newType
        : stateProduct.type,
    countInStock: stateProduct.countInStock,
    discount: stateProduct.discount,
    author: stateProduct.author,
    publisher: stateProduct.publisher
    };
    mutation.mutate(params, {
    onSettled: () => {
        queryProduct.refetch();
    },
    });
};

// store in local storage
const saveTransactionToLocalStorage = (transactionData) => {
    // Lấy dữ liệu hiện tại từ localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    // Thêm giao dịch mới vào mảng
    transactions.push(transactionData);
    // Lưu lại vào localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// import and export function
const onUpdateProduct = () => {
    // Lấy giá trị hiện tại của countInStock từ form
    const ietStock = parseInt(form.getFieldValue('iestock') || 0);

     // Kiểm tra giá trị nhập vào hợp lệ
    if (ietStock <= 0) {
        message.error("The quantity must be greater than 0!");
        return;
    }

    // Tính toán countInStock mới dựa trên actionType
    let newCountInStock = stateProductDetails.countInStock;
    
    if (actionType === 'import') {
        newCountInStock =  newCountInStock + ietStock;
    } else if (actionType === 'export') {
        newCountInStock  = newCountInStock - ietStock;
        if (newCountInStock < 0) {
            message.error("Export quantity cant be greater than existing quantity!");
            return;
        }
    }

    // Tạo params mới để gửi lên server
    const params = {
        id: rowSelected,
        token: user.access_token,
        ...stateProductDetails,
        countInStock: newCountInStock  // cập nhật số lượng mới
    };

    // Gọi API update sản phẩm
    mutationUpdate.mutate(params, {
        onSuccess: () => {
            //message.success('Successfully update!');
            queryProduct.refetch();  // Làm mới dữ liệu sản phẩm
            handleCloseDetails();  // Đóng drawer

            saveTransactionToLocalStorage({
                name: stateProductDetails.name,
                type: stateProductDetails.type,
                transactionType: actionType,
                quantity: ietStock,
                publisher: stateProductDetails.publisher,
                countInStock: newCountInStock
            });
        },
        onError: (error) => {
            message.error('Update failed ' + error.message);
        }
    });
};

const handleChangeSelect = (value) => {
    setStateProduct({
    ...stateProduct,
    type: value,
    });
};

return (
    <div>
    <WrapperHeader>Stock Management</WrapperHeader>
    
    <div style={{ marginTop: "10px" }}>
        <TableComponent
        handleDeleteMany={handleDeleteManyProducts}
        columns={columns}
        isLoading={isLoadingProducts}
        disableSelection={true} // This will disable the row selection feature
        data={dataTable}
        onRow={(record, rowIndex) => {
            return {
            onClick: (event) => {
                setRowSelected(record._id);
            },
            };
        }}
        />
    </div>

    <DrawerComponent
        title={actionType === 'import' ? "Import Comic" : "Export Comic"}
        isOpen={isOpenDrawer}
        onClose={handleCloseDetails}
        width="57%"
    >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
        <Form
            name="productDetails"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
            //style={{ padding: "0px 80px 0px 20px", marginLeft: "40px" }}
        >
            {/* image show comic */}
            <div style={{ textAlign: "center" }}>
            {stateProductDetails?.image && (
                <img
                src={stateProductDetails?.image}
                style={{
                    height: "85px",
                    width: "85px",
                    borderRadius: "50%",
                    objectFit: "cover",
                }}
                alt="avatar"
                />
            )}
            </div>

            {(actionType === 'import') && (
                    <>
                            {/* comic name */}
                            <Form.Item
                            label="Name"
                            name="name"
                            style={{ marginTop: "20px" }}
                            >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    value={stateProductDetails.name}
                                    onChange={handleOnChangeDetails}
                                    name="name"
                                    disabled = "true"
                                />
                            </Form.Item>

                            {/* comic type */}
                            <Form.Item
                            label="Type"
                            name="type"
                            >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    value={stateProductDetails.type}
                                    onChange={handleOnChangeDetails}
                                    name="type"
                                    disabled = "true"
                                />
                            </Form.Item>

                            {/* count in stock */}
                            <Form.Item
                            label="Stock:"
                            name="countInStock"
                            >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    value={stateProductDetails.countInStock}
                                    onChange={handleOnChangeDetails}
                                    name="countInStock"
                                    disabled = "true"
                                />
                            </Form.Item>

                            {/* import quantity */}
                            <Form.Item
                            label="Import:"
                            name="iestock"
                            chi
                            rules={[
                                { required: true, message: "Please input import quantity!" },
                            ]}
                            >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    //value={stateProductDetails.countInStock}
                                    //onChange={handleOnChangeDetails}
                                    name="countInStock"
                                />
                            </Form.Item>

                            {/* button apply */}
                            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                                <button
                                    style={{
                                    background: "#e68a00",
                                    fontFamily: "Signika Negative",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "6px",
                                    marginTop: "15px",
                                    }}
                                >
                                    Apply
                                 </button>
                            </Form.Item>
                    </>
            )}

            {(actionType === 'export') && (
                    <>
                            {/* comic name */}
                            <Form.Item
                            label="Name"
                            name="name"
                            //rules={[{ required: true, message: "Please input your name!" }]}
                            style={{ marginTop: "20px" }}
                            >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    value={stateProductDetails.name}
                                    onChange={handleOnChangeDetails}
                                    name="name"
                                    disabled = "true"
                                />
                            </Form.Item>

                            {/* comic type */}
                            <Form.Item
                            label="Type"
                            name="type"
                            >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    value={stateProductDetails.type}
                                    onChange={handleOnChangeDetails}
                                    name="type"
                                    disabled = "true"

                                />
                            </Form.Item>

                             {/* count in stock */}
                             <Form.Item
                            label="Stock:"
                            name="countInStock"
                            >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    value={stateProductDetails.countInStock}
                                    onChange={handleOnChangeDetails}
                                    name="countInStock"
                                    disabled = "true"
                                />
                            </Form.Item>

                            {/* export quantity */}
                            <Form.Item
                            label="Export:"
                            name="iestock"
                            chi
                            rules={[
                                { required: true, message: "Please input export quantity!" },
                            ]}
                            >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    // value={stateProductDetails.countInStock}
                                    // onChange={handleOnChangeDetails}
                                    name="countInStock"
                                />
                            </Form.Item>

                            {/* button apply */}
                            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                                <button
                                    style={{
                                    background: "#e68a00",
                                    fontFamily: "Signika Negative",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "6px",
                                    marginTop: "15px",
                                    }}
                                >
                                    Apply
                                 </button>
                            </Form.Item>
                    </>
            )}

        </Form>
        </Loading>
    </DrawerComponent>
    </div>
);
};

export default AdminStock;
