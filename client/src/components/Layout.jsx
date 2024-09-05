import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout() {
    const location = useLocation();
    const hideHeader = location.pathname === "/canvas";

    return (
        <div className="min-h-screen flex flex-wrap content-between bg-grey-800">
            <div className="w-full block">
                {!hideHeader && <Header />}
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
