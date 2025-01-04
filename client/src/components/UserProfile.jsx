// import { useNavigate } from "react-router-dom";
// import CanvasPreview from "./CanvasPreview";
// import Button from "./Button";
// import { PlusIcon } from "lucide-react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { setID } from "../store/canvasSlice";

// function UserProfile({ canvases, setCanvases }) {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // const canvasID = useSelector((state) => state.canvas.id);

//     const createCanvas = () => {
//         axios
//             .post("/api/v1/canvas/create-canvas", { title: "Board" })
//             .then((response) => {
//                 const newCanvas = response.data.data.createdCanvas;
//                 setCanvases((prev) => [...prev, newCanvas]);
//             });
//     };

//     useEffect(() => {
//         console.log("prop: ", canvases);
//     }, []);

//     const handleClick = (id) => {
//         console.log("id", id);
//         axios
//             .get(`/api/v1/canvas/get-canvas/${id}`)
//             .then(() => {
//                 dispatch(setID({ id }));
//                 navigate(`/canvas/${id}`);
//             })
//             .catch((error) => console.log(error));
//     };

//     const deleteCanvas = (id) => {
//         axios
//             .delete(`/api/v1/canvas/delete/${id}`)
//             .then(() => {
//                 setCanvases(prev => prev.filter((canvas) => canvas._id !== id))
//                 console.log(canvases)
//             })
//             .catch((error) => console.log(error));
//     };

//     return (
//         <div className="flex flex-col h-full">
//             <main className="flex-1 bg-muted/40 p-6 grid gap-6 overflow-auto">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {canvases?.map((canvas) => (
//                         <CanvasPreview
//                             key={canvas._id}
//                             title={canvas.title}
//                             lastUpdated={canvas.updatedAt}
//                             onClick={() => handleClick(canvas._id)}
//                             deleteCanvas={() => deleteCanvas(canvas._id)}
//                         />
//                     ))}
//                 </div>
//             </main>
//             <Button onClick={createCanvas}>
//                 <PlusIcon className="h-5 w-5" />
//                 <span className="sr-only">Create new whiteboard</span>
//             </Button>
//         </div>
//     );
// }

// export default UserProfile;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setID } from "../store/canvasSlice";
import { Plus, Loader2, Grid, Layout } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

function UserProfile({ canvases, setCanvases }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isCreating, setIsCreating] = React.useState(false);

    const createCanvas = async () => {
        try {
            setIsCreating(true);
            const response = await axios.post("/api/v1/canvas/create-canvas", {
                title: "New Board",
            });
            const newCanvas = response.data.data.createdCanvas;
            setCanvases((prev) => [...prev, newCanvas]);
            // toast({
            //     title: "Canvas created",
            //     description: "Your new canvas has been created successfully.",
            // });
        } catch (error) {
            // toast({
            //     variant: "destructive",
            //     title: "Error creating canvas",
            //     description: "Please try again later.",
            // });
            console.error(error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleClick = async (id) => {
        try {
            setIsLoading(true);
            await axios.get(`/api/v1/canvas/get-canvas/${id}`);
            dispatch(setID({ id }));
            navigate(`/canvas/${id}`);
        } catch (error) {
            // toast({
            //     variant: "destructive",
            //     title: "Error opening canvas",
            //     description: "Unable to open the canvas. Please try again.",
            // });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCanvas = async (id) => {
        try {
            await axios.delete(`/api/v1/canvas/delete/${id}`);
            setCanvases((prev) => prev.filter((canvas) => canvas._id !== id));
            // toast({
            //     title: "Canvas deleted",
            //     description: "Your canvas has been deleted successfully.",
            // });
        } catch (error) {
            // toast({
            //     variant: "destructive",
            //     title: "Error deleting canvas",
            //     description: "Unable to delete the canvas. Please try again.",
            // });
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-1 container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Your Canvases
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Create and manage your whiteboards
                        </p>
                    </div>
                    <Button onClick={createCanvas} disabled={isCreating}>
                        {isCreating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Plus className="mr-2 h-4 w-4" />
                        )}
                        New Canvas
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {canvases?.map((canvas) => (
                        <Card
                            key={canvas._id}
                            className="group hover:shadow-lg transition-shadow"
                        >
                            <CardHeader className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl">
                                        {canvas.title}
                                    </CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <Layout className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleClick(canvas._id)
                                                }
                                            >
                                                Open
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600 focus:text-red-600"
                                                onClick={() =>
                                                    deleteCanvas(canvas._id)
                                                }
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <CardDescription>
                                    Last updated: {formatDate(canvas.updatedAt)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="aspect-video bg-muted rounded-lg flex items-center justify-center cursor-pointer"
                                    onClick={() => handleClick(canvas._id)}
                                >
                                    <Grid className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={() => handleClick(canvas._id)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "Open Canvas"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {canvases?.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-[400px] bg-muted/40 rounded-lg">
                        <Grid className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            No canvases yet
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Create your first canvas to get started
                        </p>
                        <Button onClick={createCanvas} disabled={isCreating}>
                            {isCreating ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="mr-2 h-4 w-4" />
                            )}
                            Create Canvas
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default UserProfile;
