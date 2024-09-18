import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./store/authSlice";
import Loader from "./components/Loader/Loader";
import { useNavigate } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const hideHeaderPaths = ["/canvas", "/profile", "/"];
    const hideHeader = hideHeaderPaths.some(
        (path) => location.pathname.substring(path)
    );
    const navigate = useNavigate();

    useEffect(() => {
        console.log(location.pathname)
        const getCurrentUser = async () => {
            try {
                const response = await axios.get(
                    "/api/v1/users/get-current-user"
                );
                if (response.data.data.user) {
                    console.log("get current user", response.data.data);
                    dispatch(loginUser(response.data.data.user));
                    navigate("/profile");
                } else {
                    dispatch(logoutUser());
                }
            } catch (error) {
                console.log("error::", error);
            } finally {
                setLoading(false);
            }
        };

        getCurrentUser();
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
