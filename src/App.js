import React, { Fragment, useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import routes from './routes';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from 'react-query';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/sildes/userSlides';
import Loading from './components/LoadingComponent/Loading';

function App() {

  // useEffect(() => {
  //   fetchApi()
  // }, [])
  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll`)
  //   return res.data
  // }
  // const query = useQuery('todos', fetchApi)
  // console.log('query', query)

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)
  
    useEffect(() => {
      setIsLoading(true)
      const { storageData, decoded } = handleDecoded()
      if(decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData)
      }
    }, [])

    const handleDecoded = () => {
      let storageData = localStorage.getItem('access_token')
      let decoded = {}
      if(storageData && isJsonString(storageData)) {
        storageData = JSON.parse(storageData)
        decoded =jwtDecode(storageData)
      }
      return { decoded, storageData }
    }

    UserService.axiosJWT.interceptors.request.use( async (config) => {
      // Do something before request is sent
      const currentTime = new Date()
      const { decoded } = handleDecoded()
      // if(decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data?.access_token}`

      // }
      // config.headers['token'] = `Bearer ${data?.access_token}`
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    const handleGetDetailsUser = async (id, token) => {
      const res = await UserService.getDetailsUser(id, token)
      dispatch(updateUser({ ...res?.data, access_token: token }))
      setIsLoading(false)
  }

  return (
    <div>
    {/* <Loading isLoading={isLoading}> */}
        <Router>
          <Routes>
            {routes.map((route) => {
                const Page = route.page;
                const ischeckAuth = !route.isPrivate || user.isAdmin
                const Layout = route.IsShowHeader || route.IsShowFooter ? DefaultComponent : Fragment;
                return(
                 ischeckAuth && (
                    <Route key={route.path} path={route.path} element={
                      <Layout>
                          <Page/>
                      </Layout>
                    }/>
                    )
                );
            })}
          </Routes>
        </Router>
      {/* </Loading> */}
    </div>
  )
}

export default App;