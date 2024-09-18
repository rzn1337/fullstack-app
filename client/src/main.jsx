import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Landing from "./components/Landing.jsx";
import App from "./App.jsx";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
// import Canvas from "./components/Canvas/Canvas.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Loader from "./components/Loader/Loader.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Canvas from "./pages/Canvas.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route
                path=""
                element={
                    <AuthLayout authentication={false}>
                        <Landing />
                    </AuthLayout>
                }
            />
            <Route path="profile" element={<AuthLayout authentication={true}><ProfilePage /></AuthLayout>} />
            <Route
                path="canvas/:id"
                element={
                    <AuthLayout authentication={true}>
                        <Canvas />
                    </AuthLayout>
                }
            />
            <Route path="register" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="loader" element={<Loader />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
