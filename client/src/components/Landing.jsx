import { Signature } from "lucide-react";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
                <Link to="/" className="flex items-center">
                    <Signature className="h-6 w-6" />
                    <span className="ml-2 text-lg font-bold">boardy.</span>
                </Link>
                <nav className="flex gap-4">
                    <Link className="text-sm hover:underline">Features</Link>
                    <Link className="text-sm hover:underline">Pricing</Link>
                    <Link className="text-sm hover:underline">About</Link>
                    <Link className="text-sm hover:underline">Contact</Link>
                </nav>
            </header>

            <main className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-6 px-4">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Collaborate in real-time on a digital whiteboard
                    </h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Brainstorm, plan, and create on a shared canvas.
                        Seamless collaboration for teams anywhere.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/register"
                            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/login"
                            className="border border-black px-6 py-2 rounded hover:bg-gray-100"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="py-4 text-center border-t">
                <p className="text-xs text-muted-foreground">
                    &copy; 2024 boardy. All rights reserved.
                </p>
                <div className="flex justify-center gap-4 mt-2">
                    <Link className="text-xs hover:underline">Terms</Link>
                    <Link className="text-xs hover:underline">Privacy</Link>
                </div>
            </footer>
        </div>
    );
}

export default Landing;
