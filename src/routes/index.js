import AdminPage from "../pages/AdminPage/AdminPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage"
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess"
import DetailsInvoicePage from "../pages/DetailsInvoicePage/DetailsInvoicePage";
import FilterPage from "../pages/FilterPage/FilterPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";

const routes = [
    {
        path: '/',
        page: HomePage,
        IsShowHeader: true,
    },

    {
        path: '/order',
        page: OrderPage,
        IsShowHeader: true
    },

    {
        path: '/products',
        page: ProductPage,
        IsShowHeader: true

    },

    {
        path: '/filter',
        page: FilterPage,
        IsShowHeader: true
    },

    {
        path: '/sign-in',
        page: SignInPage,
        IsShowHeader: false,
    },

    {
        path: '/sign-up',
        page: SignUpPage,
        IsShowHeader: false
    },

    {
        path: '/details-invoice/:id',
        page: DetailsInvoicePage,
        isShowHeader: true
    },

    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },


    {
        path: '/product-detail/:id',
        page: ProductDetailPage,
        IsShowHeader: true

    },

    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: false
    },


    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
    },

    {
        path: '/product/:type',
        page: TypeProductPage,
        IsShowHeader: true
    },

    {
        path: '/my-order',
        page: MyOrderPage,
        IsShowHeader: true
    },

    {
        path: '/profile-user',
        page: ProfilePage,
        IsShowHeader: true

    },

    {
        path: '/system/admin',
        page: AdminPage,
        IsShowHeader: false,
        isPrivate: true
    },


]
export default routes;