const nearestPoint = (x, y, x1, y1, name) => {
    return Math.abs(x - x1) < 10 && Math.abs(y - y1) < 10 ? name : null;
};

const onLine = (x1, y1, x2, y2, x, y, maxOffset = 1) => {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < maxOffset ? "inside" : null;
};

const distance = (a, b) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const cursorForPosition = (position) => {
    switch (position) {
        case "tl":
        case "br":
        case "start":
        case "end":
            return "nwse-resize";
        case "tr":
        case "bl":
            return "nesw-resize";
        default:
            return "move";
    }
};

const average = (a, b) => (a + b) / 2;

const getSvgPathFromStroke = (points, closed = true) => {
    const len = points.length;

    if (len < 4) {
        return ``;
    }

    let a = points[0];
    let b = points[1];
    const c = points[2];

    let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
        2
    )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
        b[1],
        c[1]
    ).toFixed(2)} T`;

    for (let i = 2, max = len - 1; i < max; i++) {
        a = points[i];
        b = points[i + 1];
        result += `${average(a[0], b[0]).toFixed(2)},${average(
            a[1],
            b[1]
        ).toFixed(2)} `;
    }

    if (closed) {
        result += "Z";
    }

    return result;
};

const adjustmentRequired = (type) => ["line", "rectangle"].includes(type);

const getElementAtPosition = (x, y, elements) => {
    return elements
        .map((element) => ({
            ...element,
            position: positionWithInElement(x, y, element),
        }))
        .find((element) => element.position !== null);
};

const positionWithInElement = (x, y, element) => {
    const { x1, y1, x2, y2, type } = element;

    switch (type) {
        case "rectangle":
            const topLeft = nearestPoint(x, y, x1, y1, "tl");
            const topRight = nearestPoint(x, y, x2, y1, "tr");
            const bottonLeft = nearestPoint(x, y, x1, y2, "bl");
            const bottomRight = nearestPoint(x, y, x2, y2, "br");
            const inside =
                x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
            return topLeft || topRight || bottonLeft || bottomRight || inside;
        case "line":
            const on = onLine(x1, y1, x2, y2, x, y);
            const start = nearestPoint(x, y, x1, y1, "start");
            const end = nearestPoint(x, y, x2, y2, "end");
            return start || end || on;
        case "freedraw":
            const betweenAnyPoint = element.points.some((point, index) => {
                const nextPoint = element.points[index + 1];
                if (!nextPoint) return false;
                return (
                    onLine(
                        point.x,
                        point.y,
                        nextPoint.x,
                        nextPoint.y,
                        x,
                        y,
                        5
                    ) != null
                );
            });
            return betweenAnyPoint ? "inside" : null;
        default:
            throw new Error(`Unrecognized type: ${type}`);
    }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
    const { x1, y1, x2, y2 } = coordinates;
    switch (position) {
        case "tl":
        case "start":
            return { x1: clientX, y1: clientY, x2, y2 };
        case "tr":
            return { x1, y1: clientY, x2: clientX, y2 };
        case "bl":
            return { x1: clientX, y1, x2, y2: clientY };
        case "br":
        case "end":
            return { x1, y1, x2: clientX, y2: clientY };
        default:
            return null;
    }
};

const adjustElementCoordinates = (element) => {
    const { type, x1, y1, x2, y2 } = element;
    if (type === "rectangle") {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        return { x1: minX, y1: minY, x2: maxX, y2: maxY };
    } else if (type === "line") {
        if (x1 < x2 || (x1 === x2 && y1 < y2)) {
            return { x1, y1, x2, y2 };
        } else {
            return { x1: x2, y1: y2, x2: x1, y2: y1 };
        }
    }
};

export {
    nearestPoint,
    onLine,
    distance,
    cursorForPosition,
    average,
    getSvgPathFromStroke,
    adjustmentRequired,
    getElementAtPosition,
    positionWithInElement,
    resizedCoordinates,
    adjustElementCoordinates,
};
