import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

// Importing pages and components
import { AuthProvider } from "./components/context/AuthContext.tsx";
import Homepage from "./pages/homepage.tsx";
import OtherBooks from "./pages/categories/OtherBooks.tsx";
import BookDetails from "./components/bookdetails.tsx";
import Basket from "./pages/basket.tsx";
import CheckoutPage from "./pages/checkoutpage.tsx";
import ShippingAddress from "./pages/shipping-address.tsx";
import ConfirmationPage from "./pages/confirmationPage.tsx";
import MPesaPaymentPage from "./pages/mpesaPaymentPage.tsx";
import GiftCardPaymentPage from "./pages/giftCardPaymentPage.tsx";
import KCBPaymentPage from "./pages/kcbPaymentPage.tsx";
import CreditCardPaymentPage from "./pages/creditCardPaymentPage.tsx";
import UserDashboard from "./pages/user/userDashboard.tsx";
import ProtectedRoute from "./components/protectedRoute.tsx";
import SignUpPage from "./pages/signupPage.tsx";
import SignInPage from "./components/signin.tsx";
import EducationalBooksPage from "./pages/categories/EducationalBooks.tsx";
import Stationary from "./pages/categories/Stationary.tsx";


// Importing admin components
import Layout from "./pages/admin/adminDashboard.tsx";
import DashboardOverview from "./components/adminComponents/dashboardOverview.tsx";
import ProductPage from "./pages/admin/products.tsx";
import ManageDataPage from "./pages/admin/manageDataPage.tsx";

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
        path: "/educational-books",
        element: <EducationalBooksPage />,
      },
      {
        path: "/educational-books/:subcategoryId",
        element: <EducationalBooksPage />,
      },
      {
        path: "/other-books",
        element: <OtherBooks />,
      },
      {
        path: "/other-books/:subcategoryId",
        element: <OtherBooks />,
      },
      {
        path: "/stationary",
        element: <Stationary />,
      },
      {
        path: "/stationary/:subcategoryId",
        element: <Stationary />,
      },
      {
        path: "/otherbooks/:bookId",
        element: <BookDetails />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/checkout/shipping-address",
        element: <ShippingAddress />,
      },
      {
        path: "checkout/confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "/checkout/mpesa",
        element: <MPesaPaymentPage />,
      },
      {
        path: "/checkout/gift-card",
        element: <GiftCardPaymentPage />,
      },
      {
        path: "/checkout/kcb",
        element: <KCBPaymentPage />,
      },
      {
        path: "/checkout/credit-card",
        element: <CreditCardPaymentPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
    ],
  },

  // Admin routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <DashboardOverview />,
      },
      {
        path: "/admin/products",
        element: <ProductPage />,
      },
      {
        path: "/admin/manage",
        element: <ManageDataPage />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <>
        <RouterProvider router={router} />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </>
    </AuthProvider>
  </React.StrictMode>
);
