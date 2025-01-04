// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../store/authSlice";
// import Button from "./Button";
// import { useNavigate } from "react-router-dom";

// function UserHeader({ username = null }) {
//     const navigate = useNavigate();
//     const isAuthenticated = useSelector((state) => state.auth.status);
//     const dispatch = useDispatch();
//     const handleLogout = () => {
//         axios
//             .post("/api/v1/users/logout")
//             .then(() => {
//                 dispatch(logoutUser());
//                 navigate("/");
//             })
//             .catch((error) => console.log(error));
//     };
//     return (
//         <header className="bg-background border-b flex items-center justify-between px-6 py-4 shrink-0">
//             <div className="flex items-center gap-4">
//                 <div className="grid gap-0.5">
//                     <div className="font-semibold">{username}</div>
//                     <div className="text-sm text-muted-foreground">
//                         @johndoe
//                     </div>
//                 </div>
//                 <Button onClick={handleLogout}>Logout</Button>

//             </div>
//         </header>
//     );
// }

// export default UserHeader;

import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/authSlice";
import { Loader2 } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

function UserHeader({ username = null }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const isAuthenticated = useSelector((state) => state.auth.status);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await axios.post("/api/v1/users/logout");
            dispatch(logoutUser());
            navigate("/");
            // toast({
            //     title: "Logged out successfully",
            //     description: "You have been logged out of your account.",
            // });
        } catch (error) {
            // toast({
            //     variant: "destructive",
            //     title: "Error logging out",
            //     description: "Please try again later.",
            // });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getInitials = (name) => {
        return (
            name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"
        );
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-10 w-10 rounded-full"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                                        alt={username}
                                    />
                                    <AvatarFallback>
                                        {getInitials(username)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            align="end"
                            forceMount
                        >
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {username}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        @johndoe
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate("/settings")}
                            >
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={handleLogout}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{username}</span>
                            <Badge variant="outline" className="text-xs">
                                Online
                            </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            @johndoe
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default UserHeader;
