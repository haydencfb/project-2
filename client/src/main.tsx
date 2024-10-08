// React Route Imports
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// CSS Import
import './app.css'

// React Page Imports
import App from "./App.tsx";
import MainPage from "./pages/home-page-folder/MainPage.tsx";
import ErrorPage from "./pages/error-page-folder/ErrorPage.tsx";
import StockPage from "./pages/stock-page-folder/StockPage.tsx";
import LoginPage from "./pages/login-page-folder/LoginPage.tsx";
import SignupPage from "./pages/signup-page-folder/SignupPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: '/SignupPage',
        element: <SignupPage />
      },  
      {
        path: '/MainPage',
        element: <MainPage />
      },
      {
        path: '/StockPage',
        element: <StockPage />
      },
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}