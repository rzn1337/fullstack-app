import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
    return <div>
        <h2>Header</h2>
        <Outlet />
        <h2>Footer</h2>
    </div>;
}

export default Home;
