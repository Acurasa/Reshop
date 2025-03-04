import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import HomePage from "../../home/HomePage";
import ContactPage from "../../contact/ContactPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import BasketPage from "../../features/basket/BasketPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "/catalog", element: <Catalog /> },
            { path: "/catalog/:id", element: <ProductDetails /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/basket", element: <BasketPage /> },
            { path: "/server-error", element: <ServerError /> },
            { path: "/not-found", element: <NotFound /> },
            { path: "*", element: <Navigate replace to="/not-found" /> }
        ]
    }
]);
