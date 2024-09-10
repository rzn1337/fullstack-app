import { Link } from "react-router-dom";
import CanvasPreview from "./CanvasPreview";
import Button from "./Button";
import { PlusIcon } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

function UserProfile({ canvases }) {
    const createCanvas = () => {
        axios
            .post("/api/v1/canvas/create-canvas", { title: "Board" })
            .then(() => console.log("canvas created"));
    };

    useEffect(() => {
        console.log(canvases);
    });

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
            <Button onClick={createCanvas}>
                <PlusIcon className="h-5 w-5" />
                <span className="sr-only">Create new whiteboard</span>
            </Button>
        </div>
    );
}

export default UserProfile;
