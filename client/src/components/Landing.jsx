import Button from "./Button";
import { Signature } from "lucide-react";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-r from-white to-gray-600">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link
                    href="/"
                    className="flex items-center justify-center"
                    prefetch={false}
                >
                    <Signature className="h-6 w-6" />
                    <span className="text-lg font-bold">boardy.</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link
                        href="#"
                        className="text-sm font-medium hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Features
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        About
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Contact
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Collaborate in real-time on a digital
                                    whiteboard
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Bring your team together to brainstorm,
                                    plan, and create on a shared canvas.
                                    Whiteboard seamlessly with anyone, anywhere.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    to="/register"
                                    className="bg-black text-white inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/login"
                                    className=" inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div>
                <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                    <p className="text-xs text-muted-foreground">
                        &copy; 2024 boardy. All rights reserved.
                    </p>
                    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                        <Link
                            href="#"
                            className="text-xs hover:underline underline-offset-4"
                            prefetch={false}
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="#"
                            className="text-xs hover:underline underline-offset-4"
                            prefetch={false}
                        >
                            Privacy
                        </Link>
                    </nav>
                </footer>
            </div>
        </div>
    );
}

export default Landing;
