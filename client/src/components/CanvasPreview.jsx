import { formatDistanceToNow } from "date-fns";
import Button from "./Button";
import { Trash2Icon } from "lucide-react";

function CanvasPreview({
    title,
    lastUpdated = "unknown",
    onClick,
    deleteCanvas,
}) {
    const lastUpdatedText =
        lastUpdated !== "unknown"
            ? `${formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}`
            : lastUpdated;

    return (
        <div
            className="overflow-hidden bg-white rounded-lg shadow-md"
            onClick={onClick}
        >
            <div className="p-0">
                <img
                    src="/placeholder.svg"
                    alt="Whiteboard thumbnail"
                    width={400}
                    height={300}
                    className="aspect-video object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="bg-gray-100 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="grid gap-0.5">
                        <div className="font-medium">{title}</div>
                        <div className="text-sm text-gray-500">
                            {`Last updated: ${lastUpdatedText}`}
                        </div>
                    </div>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteCanvas();
                        }}
                    >
                        <Trash2Icon color="red" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CanvasPreview;
