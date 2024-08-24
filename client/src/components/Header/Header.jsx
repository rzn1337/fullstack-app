import axios from "axios";
import React from "react";

function Header() {
    const handleLogout = () => {
        axios.post("/api/v1/users/logout")
    };
    return (
        <div className="flex justify-between items-center">
            <h1 className="mx-auto">Header</h1>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Header;
