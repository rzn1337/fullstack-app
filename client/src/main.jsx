import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./components/Home.jsx";
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
import Canvas from "./components/Canvas/Canvas.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Loader from "./components/Loader/Loader.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="canvas" element={<Canvas />} />
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
