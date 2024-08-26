import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";

function Home() {
    const location = useLocation();
    const hideHeader = location.pathname === "/canvas";
    console.log(hideHeader);
    /* return hideHeader ? (
        <div>
            <Outlet />
        </div>
    ) : (
        <div>
            <Header />
            <Outlet />
        </div>
    ); */

    // short circuit eval
    return (
        <div>
            {!hideHeader && <Header />}
            <Outlet />
        </div>
    );
}

export default Home;
