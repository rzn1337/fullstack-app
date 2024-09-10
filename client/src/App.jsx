import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./store/authSlice";
import Loader from "./components/Loader/Loader";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const hideHeaderPaths = ["/canvas", "/profile", "/"];
    const hideHeader = hideHeaderPaths.some(
        (path) => path === location.pathname
    );

    useEffect(() => {
        axios
            .get("/api/v1/users/get-current-user")
            .then((response) => {
                if (response.data.data.user) {
                    dispatch(loginUser(response.data.data.user));
                } else {
                    dispatch(logoutUser());
                }
            })
            .catch((error) => console.log("User has not logged in yet", error))
            .finally(setLoading(false));
    }, []);

    return !loading ? (
        <div className="min-h-screen flex flex-col bg-grey-800">
            {!hideHeader && <Header />}
            <main className="flex-grow">
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    ) : (
        <Loader />
    );
}

export default App;
