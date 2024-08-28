import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import Toolbar from "../src/components/Toolbar/Toolbar";

describe("Canvas", () => {
    
    test("should render toolbar", () => {
        const result = render(<Toolbar />);
        expect(result.container).toMatchSnapshot();
    });
});
