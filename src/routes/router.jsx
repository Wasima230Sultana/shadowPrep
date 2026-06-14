import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Components/Home";
import Category from "../Components/Category";
import CategoryDetails from "../Components/CategoryDetails";
import MyProfile from "../Components/MyProfile";

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
         path: "/my-profile",
        element: <MyProfile />
      },
      {
         path: "/category",
        element: <Category />
      },
      {
         path: "/category/:id",
        element: <CategoryDetails />,
        loader:()=>fetch('/categories.json')
      },
    ]
  },
]);