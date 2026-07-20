import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Components/Home";
import Category from "../Components/Category";
import CategoryDetails from "../Components/CategoryDetails";
import MyProfile from "../Components/MyProfile";
import AuthLayout from "../layout/AuthLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import UpdateProfile from "../Components/UpdateProfile";
import ForgetPassword from '../Pages/ForgetPassword'
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
         path: "/",
        element: <Home />
      },
      {
         path: "/update-profile",
        element: <PrivateRoutes>
          <UpdateProfile />
        </PrivateRoutes>
        
      }
      ,
      {
         path: "/my-profile",
        element: <PrivateRoutes>
          <MyProfile />
        </PrivateRoutes>
        
      },
      {
         path: "/category",
        element: <Category />
      },
      {
         path: "/category/:id",
        element: <PrivateRoutes>
          <CategoryDetails />
        </PrivateRoutes>,
        loader:()=>fetch('/categories.json')
      },
    ]
  },{
        path:'/auth',
        element:<AuthLayout></AuthLayout>,
        children:[
          {
          path:'/auth/register',
          element:<Register></Register>
        },{
          path:'/auth/login',
          element:<Login></Login>
        },
      ]
      },{
        path:'/forget-password',
        element:<ForgetPassword></ForgetPassword>
      }
]);