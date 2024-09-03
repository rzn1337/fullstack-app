import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout() {
    const location = useLocation();
    const hideHeader = location.pathname === "/canvas";

    return (
        <div>
            {!hideHeader && <Header />}
            <Outlet />
            {/* <Footer /> */}
        </div>
    );
}

export default Layout;
