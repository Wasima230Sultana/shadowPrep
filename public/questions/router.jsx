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
import TopicDetails from "../Pages/TopicDetails/TopicDetails";
import Interview from "../Pages/Interview/Interview";
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

      },
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
        loader: () => fetch('/categories.json')
      },
      {
        path: "/topics/:id",
        element: (
          <PrivateRoutes>
            <TopicDetails />
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {
          const files = {
            1: "frontend.json",
            2: "backend.json",
            3: "fullstack.json",
            4: "mobile.json",
            5: "uiux.json",
            6: "data-analyst.json",
            7: "data-scientist.json",
            8: "ml-engineer.json",
            9: "ai-engineer.json",
            10: "devops.json",
            11: "cloud.json",
            12: "cybersecurity.json",
            13: "qa.json",
            14: "product-manager.json",
            15: "business-analyst.json",
            16: "software-engineer.json",
            17: "java.json",
            18: "python.json",
            19: "database.json",
            20: "flutter.json"
          };

          return fetch(`/topics/${files[params.id]}`);
        }
      },
      {
        path: "/interview/:id",
        element: (
          <PrivateRoutes>
            <Interview />
          </PrivateRoutes>
        ),
        loader: async ({ params }) => {

          const files = {
            1: "frontend.json",
            2: "backend.json",
            3: "fullstack.json",
            4: "mobile.json",
            5: "uiux.json",
            6: "data-analyst.json",
            7: "data-scientist.json",
            8: "ml-engineer.json",
            9: "ai-engineer.json",
            10: "devops.json",
            11: "cloud.json",
            12: "cybersecurity.json",
            13: "qa.json",
            14: "product-manager.json",
            15: "business-analyst.json",
            16: "software-engineer.json",
            17: "java.json",
            18: "python.json",
            19: "database.json",
            20: "flutter.json"
          };

          return fetch(`/questions/${files[params.id]}`);
        }
      }
    ]
  }, {
    path: '/auth',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: '/auth/register',
        element: <Register></Register>
      }, {
        path: '/auth/login',
        element: <Login></Login>
      },
    ]
  }, {
    path: '/forget-password',
    element: <ForgetPassword></ForgetPassword>
  }
]);