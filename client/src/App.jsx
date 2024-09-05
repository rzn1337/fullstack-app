import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";

function App() {
    const location = useLocation();
    const hideHeaderPaths = ["/canvas", "/profile"];
    const hideHeader = hideHeaderPaths.some((path) => path === location.pathname);

    return (
        <div className="min-h-screen flex flex-col bg-grey-800">
            {!hideHeader && <Header />}
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;