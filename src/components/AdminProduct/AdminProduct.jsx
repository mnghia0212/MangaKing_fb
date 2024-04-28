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

    const AdminProduct = () => {
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
            <EditOutlined
              style={{
                color: "red",
                fontSize: "23px",
                cursor: "pointer",
                marginLeft: "5px",
              }}
              onClick={() => handleDetailsProduct(record, 'edit')}
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
            text: ">= 50",
            value: ">=",
            },
            {
            text: "<= 50",
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
        title: "Rating",
        dataIndex: "rating",
        sorter: (a, b) => a.rating - b.rating,
        filters: [
            {
            text: ">= 3",
            value: ">=",
            },
            {
            text: "<= 3",
            value: "<=",
            },
        ],
        onFilter: (value, record) => {
            if (value === ">=") {
            return Number(record.rating) >= 3;
            }
            return Number(record.rating) <= 3;
        },
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
        author: "",
        publisher: "",
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

    const handleOnchangeAvatar = async (fileList) => {
        //console.log("filelist", fileList);
        if (fileList.fileList.length > 0) {
        // Check if fileList is not empty
        const file = fileList.fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
        }
    };

    const handleOnchangeAvatarDetails = async (fileList) => {
       // console.log("filelist", fileList);
        if (fileList.fileList.length > 0) {
        // Check if fileList is not empty
        const file = fileList.fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview,
        });
        }
    };

    const onUpdateProduct = () => {
        mutationUpdate.mutate(
        { id: rowSelected, token: user?.access_token, ...stateProductDetails },
        {
            onSettled: () => {
            queryProduct.refetch();
            },
        }
        );
    };

    const handleChangeSelect = (value) => {
        setStateProduct({
        ...stateProduct,
        type: value,
        });
    };

    return (
        <div>
        <WrapperHeader>Product Management</WrapperHeader>
        <button
            style={{
            background: "#e68a00",
            color: "#fff",
            borderRadius: "5px",
            fontWeight: "bold",
            fontFamily: "Signika Negative",
            padding: "6px 15px",
            border: "none",
            }}
            onClick={() => setIsModalOpen(true)}
        >
            Add Comics
        </button>
        <div style={{ marginTop: "10px" }}>
            <TableComponent
            handleDeleteMany={handleDeleteManyProducts}
            columns={columns}
            isLoading={isLoadingProducts}
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
        <ModalComponent
            forceRender
            title="CREATE PRODUCTS"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <Loading isLoading={isLoading}>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                autoComplete="on"
                form={form}
            >
                <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                    required: true,
                    message: "Please input your name!",
                    },
                ]}
                >
                <InputComponent
                    value={stateProduct.name}
                    onChange={handleOnChange}
                    name="name"
                />
                </Form.Item>

                <Form.Item
                label="Type"
                name="type"
                rules={[
                    {
                    required: true,
                    message: "Please input your type!",
                    },
                ]}
                >
                <Select
                    name="type"
                    // defaultValue="lucy"
                    // style={{ width: 120 }}
                    value={stateProduct.type}
                    onChange={handleChangeSelect}
                    options={renderOptions(typeProduct?.data?.data)}
                />
                </Form.Item>

                {stateProduct.type === "add_type" && (
                <Form.Item
                    label="New type"
                    name="newType"
                    rules={[{ required: true, message: "Please input your type!" }]}
                >
                    <InputComponent
                    value={stateProduct.newType}
                    onChange={handleOnChange}
                    name="newType"
                    />
                </Form.Item>
                )}

                <Form.Item
                label="Count inStock"
                name="countInStock"
                rules={[
                    {
                    required: true,
                    message: "Please input your count inStock!",
                    },
                ]}
                >
                <InputComponent
                    value={stateProduct.countInStock}
                    onChange={handleOnChange}
                    name="countInStock"
                />
                </Form.Item>

                <Form.Item
                label="Price"
                name="price"
                rules={[
                    {
                    required: true,
                    message: "Please input your price!",
                    },
                ]}
                >
                <InputComponent
                    value={stateProduct.price}
                    onChange={handleOnChange}
                    name="price"
                />
                </Form.Item>

                <Form.Item
                label="Rating"
                name="rating"
                rules={[
                    {
                    required: true,
                    message: "Please input your rating!",
                    },
                ]}
                >
                <InputComponent
                    value={stateProduct.rating}
                    onChange={handleOnChange}
                    name="rating"
                />
                </Form.Item>

                <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                    required: true,
                    message: "Please input your description!",
                    },
                ]}
                >
                <InputComponent
                    value={stateProduct.description}
                    onChange={handleOnChange}
                    name="description"
                />
                </Form.Item>

                <Form.Item
                label="Discount"
                name="discount"
                rules={[
                    {
                    required: true,
                    message: "Please input your discount of product!",
                    },
                ]}
                >
                <InputComponent
                    value={stateProduct.discount}
                    onChange={handleOnChange}
                    name="discount"
                />
                </Form.Item>
                
                <Form.Item
                label="Author"
                name="author"
                rules={[
                    {
                    required: true,
                    message: "Please input the comic's author!",
                    },
                ]}
                >
                <InputComponent
                    value={stateProduct.author}
                    onChange={handleOnChange}
                    name="author"
                />
                </Form.Item>

                <Form.Item
                label="Publisher"
                name="publisher"
                rules={[
                    {
                    required: true,
                    message: "Please input the comic's publisher!",
                    },
                ]}
                >
                <InputComponent
                    value={stateProduct.publisher}
                    onChange={handleOnChange}
                    name="publisher"
                />
                </Form.Item>

                <Form.Item
                label="Image"
                name="image"
                rules={[
                    {
                    required: true,
                    message: "Please input your image!",
                    },
                ]}
                >
                <WrapperUploadFile
                    maxCount={1}
                    onChange={handleOnchangeAvatar}
                    beforeUpload={() => false}
                >
                    <Button>Upload File</Button>
                    {stateProduct?.image && (
                    <img
                        src={stateProduct?.image}
                        style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginLeft: "10px",
                        }}
                        alt="avatar"
                    />
                    )}
                </WrapperUploadFile>
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 20,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
            </Loading>
        </ModalComponent>

        <DrawerComponent
            title={actionType === 'edit' ? "Edit Comic Details" : "Stock Adjustment"}
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

                {/*edit detail drawer component  */}
                {actionType === 'edit' && (
                        <>
                                {/* comic name */}
                                <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: "Please input your name!" }]}
                                style={{ marginTop: "20px" }}
                                >
                                    <InputComponent
                                        style={{ width: "100%", marginLeft: "10px" }}
                                        value={stateProductDetails.name}
                                        onChange={handleOnChangeDetails}
                                        name="name"
                                    />
                                </Form.Item>

                                {/* comic type */}
                                <Form.Item
                                label="Type"
                                name="type"
                                rules={[{ required: true, message: "Please input your type!" }]}
                                >
                                    <InputComponent
                                        style={{ width: "100%", marginLeft: "10px" }}
                                        value={stateProductDetails.type}
                                        onChange={handleOnChangeDetails}
                                        name="type"
                                    />
                                </Form.Item>
                            
                                {/* comic price */}
                                <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    { required: true, message: "Please input your count price!" },
                                ]}
                                >
                                    <InputComponent
                                        style={{ width: "100%", marginLeft: "10px" }}
                                        value={stateProductDetails.price}
                                        onChange={handleOnChangeDetails}
                                        name="price"
                                    />
                                </Form.Item>

                                {/* comic description */}
                                <Form.Item
                                label="Des:"
                                name="description"
                                rules={[
                                    {
                                    required: true,
                                    message: "Please input your count description!",
                                    },
                                ]}
                                >
                                    <InputComponent
                                        style={{ width: "100%", marginLeft: "10px" }}
                                        value={stateProductDetails.description}
                                        onChange={handleOnChangeDetails}
                                        name="description"
                                    />
                                </Form.Item>

                                {/* comic rating */}
                                <Form.Item
                                label="Rating"
                                name="rating"
                                rules={[
                                    { required: true, message: "Please input your count rating!" },
                                ]}
                                >
                                    <InputComponent
                                        style={{ width: "100%", marginLeft: "10px" }}
                                        value={stateProductDetails.rating}
                                        onChange={handleOnChangeDetails}
                                        name="rating"
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

                                {/* comic discount */}
                                <Form.Item
                                label="Dis:"
                                name="discount"
                                rules={[
                                    {
                                    required: true,
                                    message: "Please input your discount of product!",
                                    },
                                ]}
                                >
                                <InputComponent
                                    style={{ width: "100%", marginLeft: "10px" }}
                                    value={stateProductDetails.discount}
                                        onChange={handleOnChangeDetails}
                                        name="discount"
                                    />
                                </Form.Item>
                                
                                {/* comic author */}
                                <Form.Item
                                label="Author:"
                                name="author"
                                rules={[
                                    {
                                    required: true,
                                    message: "Please input your author of product!",
                                    },
                                ]}
                                >
                                    <InputComponent
                                        style={{ width: "100%", marginLeft: "10px" }}
                                        value={stateProductDetails.author}
                                        onChange={handleOnChangeDetails}
                                        name="author"
                                    />
                                </Form.Item>
                                
                                {/* comic publisher */}
                                <Form.Item
                                label="Publisher:"
                                name="publisher"
                                rules={[
                                    {
                                    required: true,
                                    message: "Please input your publisher of product!",
                                    },
                                ]}
                                >
                                    <InputComponent
                                        style={{ width: "100%", marginLeft: "10px" }}
                                        value={stateProductDetails.publisher}
                                        onChange={handleOnChangeDetails}
                                        name="publisher"
                                    />
                                </Form.Item>


                                {/* comic image */}
                                <Form.Item
                                label="Image"
                                name="image"
                                rules={[
                                    { required: true, message: "Please input your count image!" },
                                ]}
                                >
                                    <WrapperUploadFile
                                        maxCount={1}
                                        onChange={handleOnchangeAvatarDetails}
                                        beforeUpload={() => false}
                                    >
                                        <span>
                                        <Button>Upload File</Button>
                                        </span>
                                    </WrapperUploadFile>
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

        <ModalComponent
            forceRender
            title="Delete comic"
            open={isModalOpenDelete}
            onCancel={handleCancelDelete}
            onOk={handleDeleteProduct}
        >
            <Loading isLoading={isLoadingDeleted}>
            <div>Are you sure to delete this comic ?</div>
            </Loading>
        </ModalComponent>
        </div>
    );
    };

    export default AdminProduct;
