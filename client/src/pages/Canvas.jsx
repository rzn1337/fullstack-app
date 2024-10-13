import { useEffect, useState } from "react";
import CanvasComponent from "../components/Canvas/Canvas";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

function Canvas() {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [history, setHistory] = useState(null);

    useEffect(() => {
        const fetchCanvas = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/canvas/get-canvas/${id}`
                );
                // setHistory(response.data.data.history) // TODO
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        console.log("params id:", id);
        fetchCanvas();
    });

    return loading ? (
        <div>
            <CanvasComponent />
        </div>
    ) : (
        <Loader />
    );
}

export default Canvas;
