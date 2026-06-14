import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Components/Home";
import Category from "../Components/Category";
import CategoryDetails from "../Components/CategoryDetails";

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