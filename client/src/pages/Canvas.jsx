import { useEffect, useState } from "react";
import CanvasComponent from "../components/Canvas/Canvas";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

function Canvas() {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [elements, setElements] = useState(null);

    useEffect(() => {
        const fetchCanvas = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/canvas/get-canvas/${id}`
                );
                console.log(response);
                setElements(JSON.parse(response.data.data.history));
            } catch (error) {
                console.log(error);
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
            <CanvasComponent el={elements} />
        </div>
    );
}

export default Canvas;
