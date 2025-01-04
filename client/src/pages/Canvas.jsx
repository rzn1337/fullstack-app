import { useEffect, useState } from "react";
import CanvasComponent from "../components/Canvas/Canvas";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

function Canvas() {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [elements, setElements] = useState(null);
    const [shareableLink, setShareableLink] = useState(null);

    useEffect(() => {
        const fetchCanvas = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/canvas/get-canvas/${id}`
                );
                console.log(response);
                console.log("jksabdk", response.data.data.history)
                if (!response.data.data.history === "{[]}") {
                    setElements(JSON.parse(response.data.data.history));
                }
                setElements(JSON.parse(response.data.data.history));
                setShareableLink(response.data.data.shareableLink);
                console.log("response.shareablelinkkkk:", shareableLink);
            } catch (error) {
                console.log("An error occured while loading the canvas", error);
            } finally {
                setLoading(false);
            }
        };
        console.log("params id:", id);
        fetchCanvas();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div>
            <CanvasComponent
                el={elements}
                roomLink={shareableLink}
                isOwner={true}
            />
        </div>
    );
}

export default Canvas;
