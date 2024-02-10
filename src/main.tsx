import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home/Home.tsx";
import Root from "./routes/root.tsx";
import Auth from "./routes/Auth/Auth.tsx";
import Log from "./routes/Log/Log.tsx";
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
        element: <Home />,
      },
      {
        path: "log",
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
