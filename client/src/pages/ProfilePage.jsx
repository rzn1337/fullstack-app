import { useSelector } from "react-redux";
import UserHeader from "../components/UserHeader";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import UserProfile from "../components/UserProfile";
import axios from "axios";

function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const userDataFromRedux = useSelector((state) => state.auth.userData);
    const [userData, setUserData] = useState(null);
    const [canvases, setCanvases] = useState(null);

    useEffect(() => {
        const fetchCanvases = async () => {
            if (userDataFromRedux) setUserData(userDataFromRedux);
            console.log("userdata:", userDataFromRedux)
            try {
                const canvases = await axios.get(
                    `/api/v1/canvas/canvases/${userData?.username}`
                );
            } catch (error) {
                console.log(error);
            }
            setCanvases(canvases);
        };

        fetchCanvases();

        setLoading(false);
    }, [userDataFromRedux]);

    return !loading ? (
        <div>
            <UserHeader username={userData.username} />
            <UserProfile canvases={canvases} />
        </div>
    ) : (
        <Loader />
    );
}

export default ProfilePage;
