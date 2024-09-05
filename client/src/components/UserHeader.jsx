import Button from "./Button";
import { PlusIcon } from "lucide-react";

function UserHeader({username = null}) {
    return (
        <header className="bg-background border-b flex items-center justify-between px-6 py-4 shrink-0">
            <div className="flex items-center gap-4">
                <div className="grid gap-0.5">
                    <div className="font-semibold">{username}</div>
                    <div className="text-sm text-muted-foreground">
                        @johndoe
                    </div>
                </div>
            </div>
            <Button>
                <PlusIcon className="h-5 w-5" />
                <span className="sr-only">Create new whiteboard</span>
            </Button>
        </header>
    );
}

export default UserHeader;
