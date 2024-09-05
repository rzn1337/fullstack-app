import { Link } from "react-router-dom";
import CanvasPreview from "./CanvasPreview";

function UserProfile() {
    return (
        <div className="flex flex-col h-full">
            <main className="flex-1 bg-muted/40 p-6 grid gap-6 overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <Link to="/canvas">
                        <CanvasPreview title={"Workstation"} />
                    </Link>
                    <Link to="/canvas">
                        <CanvasPreview title={"Board 2"} />
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default UserProfile;
