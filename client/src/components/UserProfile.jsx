import { useNavigate } from "react-router-dom";
import CanvasPreview from "./CanvasPreview";
import Button from "./Button";
import { PlusIcon } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setID } from "../store/canvasSlice";

function UserProfile({ canvases, setCanvases }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createCanvas = () => {
        axios
            .post("/api/v1/canvas/create-canvas", { title: "Board" })
            .then((response) => {
                const newCanvas = response.data.data.createdCanvas;
                setCanvases((prev) => [...prev, newCanvas]);
            });
    };

    useEffect(() => {
        console.log("prop: ", canvases);
    }, []);

    const handleClick = (id) => {
        console.log("id", id);
        axios
            .get(`/api/v1/canvas/get-canvas/${id}`)
            .then(() => {
                dispatch(setID({ id }));
                navigate(`/canvas/${id}`);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="flex flex-col h-full">
            <main className="flex-1 bg-muted/40 p-6 grid gap-6 overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {canvases?.map((canvas) => (
                        <CanvasPreview
                            key={canvas._id}
                            title={canvas.title}
                            lastUpdated={canvas.updatedAt}
                            onClick={() => handleClick(canvas._id)}
                        />
                    ))}
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
