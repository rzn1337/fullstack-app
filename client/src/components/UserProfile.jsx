import Button from "./Button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import CanvasPreview from "./CanvasPreview";

function UserProfile() {
    return (
        <div className="flex flex-col h-full">
            <header className="bg-background border-b flex items-center justify-between px-6 py-4 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="grid gap-0.5">
                        <div className="font-semibold">John Doe</div>
                        <div className="text-sm text-muted-foreground">
                            @johndoe
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <PlusIcon className="h-5 w-5" />
                    <span className="sr-only">Create new whiteboard</span>
                </Button>
            </header>
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
