import { router } from './app/routes/Routes';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react';
import {RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            <RouterProvider router={router} />
        </Provider>

    </StrictMode>,
)