import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function UserHeader({ username = null }) {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const handleLogout = () => {
        axios
            .post("/api/v1/users/logout")
            .then(() => {
                dispatch(logoutUser());
                navigate("/");
            })
            .catch((error) => console.log(error));
    };
    return (
        <header className="bg-background border-b flex items-center justify-between px-6 py-4 shrink-0">
            <div className="flex items-center gap-4">
                <div className="grid gap-0.5">
                    <div className="font-semibold">{username}</div>
                    <div className="text-sm text-muted-foreground">
                        @johndoe
                    </div>
                </div>
                <Button onClick={handleLogout}>Logout</Button>
                
            </div>
        </header>
    );
}

export default UserHeader;