import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { useEffect } from "react";

function Header() {
    const username = useSelector(state => state.auth.userData?.username);
    const dispatch = useDispatch();
    useEffect(() => {}, [username])
    const handleLogout = () => {
        axios
            .post("/api/v1/users/logout")
            .then(dispatch(logoutUser()))
            .catch((error) => console.log(error));
    };
    return (
        <div className="flex justify-between items-center">
            <h1 className="mx-2">Header</h1>
            <h1 className="mx-2">Welcome {username ? `${username}` : ""}</h1>
            <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-slate-800 transition-colors"
            >
                Logout
            </button>
        </div>
    );
}

export default Header;
