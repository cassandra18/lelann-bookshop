import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Homepage from "./pages/homepage.tsx";
import OtherBooksPage from "./pages/other-books.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/other-books",
        element: <OtherBooksPage />,
      },
      {
        path: "/other-books/:subcategoryId",
        element: <OtherBooksPage />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={ router }/>
    </React.StrictMode>
);
