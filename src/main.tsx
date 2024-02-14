import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/root.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import Log from "./pages/Log/Log.tsx";
import ErrorPage from "./components/error-page.tsx";
import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "",
        element: <Log />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
