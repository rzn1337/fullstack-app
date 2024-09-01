import React from "react";
import { Zap, PenTool, Users } from "lucide-react";
import Button from "../Button";

function Sidebar() {
    return (
        <div className="flex flex-1 overflow-hidden">
            <aside className="w-64 border-r bg-muted/40">
                <nav className="flex flex-col space-y-2 p-4">
                    <Button className="justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Collaborate
                    </Button>
                    <Button className="justify-start">
                        <PenTool className="mr-2 h-4 w-4" />
                        Draw
                    </Button>
                    <Button className="justify-start">
                        <Zap className="mr-2 h-4 w-4" />
                        Brainstorm
                    </Button>
                </nav>
            </aside>
        </div>
    );
}

export default Sidebar;