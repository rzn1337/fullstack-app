import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { Signature } from "lucide-react";

function Header() {
    const username = useSelector((state) => state.auth.userData?.username);
    const dispatch = useDispatch();
    useEffect(() => {}, [username]);
    const handleLogout = () => {
        axios
            .post("/api/v1/users/logout")
            .then(dispatch(logoutUser()))
            .catch((error) => console.log(error));
    };
    return (
        <header className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center space-x-4">
                <Signature className="h-6 w-6" />
                <span className="text-lg font-bold">boardy.</span>
            </div>
            <nav className="hidden space-x-4 md:flex">
                <Link
                    className="text-sm font-medium hover:underline"
                    to="/canvas"
                >
                    Features
                </Link>
                <Link className="text-sm font-medium hover:underline" to="#">
                    Pricing
                </Link>
                <Link className="text-sm font-medium hover:underline" to="#">
                    About
                </Link>
            </nav>
            <div className="flex items-center space-x-4">
                <Button>Log in</Button>
                <Button>Sign up</Button>
            </div>
        </header>
    );
}

export default Header;

{
    /* <div className="flex justify-between items-center">
            <h1 className="mx-2">Header</h1>
            <h1 className="mx-2">Welcome {username ? `${username}` : ""}</h1>
            <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-slate-800 transition-colors"
            >
                Logout
            </button>
        </div> */
}
