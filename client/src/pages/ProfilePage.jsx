import { useSelector } from "react-redux";
import UserHeader from "../components/UserHeader";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import UserProfile from "../components/UserProfile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [canvases, setCanvases] = useState(null);
    const username = useSelector((state) => state.auth.userData?.username);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCanvases = async () => {
            console.log("username:", username);
            try {
                const response = await axios.get(
                    `/api/v1/canvas/canvases/${username}`
                );
                setCanvases(response.data.data[0].canvases);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (username) fetchCanvases();
    }, []);

    return !loading ? (
        <div>
            <UserHeader username={username} />
            <UserProfile canvases={canvases} />
        </div>
    ) : (
        <Loader />
    );
}

export default ProfilePage;
