import { useSelector } from "react-redux";
import UserHeader from "../components/UserHeader";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import UserProfile from "../components/UserProfile";

function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const username = useSelector((state) => state.auth.userData?.username);

    useEffect(() => {
        setLoading(false);
    }, [username]);

    return !loading ? (
        <div>
            <UserHeader username={username} />
            <UserProfile />
        </div>
    ) : (
        <Loader />
    );
}

export default ProfilePage;
