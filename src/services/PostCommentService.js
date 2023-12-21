import { message } from "antd";
import { axiosJWT } from "./UserService"
import axios from "axios"

// postcommet{
//     email:string;
//     message: string;
//     productDetailId: ;
//     createAt: ;
//     start: ;
// }

export const createPost = async (data,access_token) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/post-comment/create/${JSON.stringify(data)}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }

  export const getByProductDetailId = async (data,access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/post-comment/getByProductDetailId?id=${data.id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }