import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import Canvas from "../src/components/Canvas/Canvas";
import Toolbar from "../src/components/Toolbar/Toolbar";

describe("Canvas", () => {
    test("should render canvas", () => {
        const result = render(<Canvas />);
        expect(result.container).toMatchSnapshot();
    });
    test("should render toolbar", () => {
        const result = render(<Toolbar />);
        expect(result.container).toMatchSnapshot();
    });
});
