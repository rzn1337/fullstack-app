import { Link } from "react-router-dom";

function Footer() {
    return (
        <div>
            <footer className="border-t py-2 text-center">
                <div className="container mx-auto px-4">
                    <nav className="mb-4 flex justify-center space-x-4">
                        <Link className="text-sm hover:underline" href="#">
                            About
                        </Link>
                        <Link className="text-sm hover:underline" href="#">
                            Terms
                        </Link>
                        <Link className="text-sm hover:underline" href="#">
                            Privacy Policy
                        </Link>
                        <Link className="text-sm hover:underline" href="#">
                            Contact
                        </Link>
                    </nav>
                    <p className="text-sm text-muted-foreground">
                        © 2024 boardy. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
