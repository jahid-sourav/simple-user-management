import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AddUser from "../pages/addUser/AddUser";
import Another from "../pages/another/Another";
import EditUser from "../pages/editUser/EditUser";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/edit-user/:id",
        element: <EditUser />,
        loader: ({ params }) =>
          fetch(
            `https://simple-user-management-server.vercel.app/users/${params.id}`
          ),
      },
      {
        path: "/another",
        element: <Another />,
      },
    ],
  },
]);
