import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "../src/components/Header/Header";
import { logoutUser } from "../src/store/authSlice";
import { vi, afterEach, beforeEach, it, describe, expect } from "vitest";

// Mocking the necessary modules
vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
}));

vi.mock("axios");

vi.mock("../../store/authSlice", () => ({
    logoutUser: vi.fn(),
}));

describe("Header Component", () => {
    let mockDispatch;

    beforeEach(() => {
        mockDispatch = vi.fn();
        useDispatch.mockReturnValue(mockDispatch);
        useSelector.mockReturnValue({ username: "testuser" });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should render the Header component with the username", () => {
        render(<Header />);
        expect(screen.getByText("Header")).toBeInTheDocument();
        expect(screen.getByText("Welcome testuser")).toBeInTheDocument();
    });

    it("should call axios.post and dispatch logoutUser on logout", async () => {
        axios.post.mockResolvedValue({});

        render(<Header />);

        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);

        expect(axios.post).toHaveBeenCalledWith("/api/v1/users/logout");
        expect(mockDispatch).toHaveBeenCalledWith(logoutUser());
    });

    it("should handle axios.post errors", async () => {
        const consoleSpy = vi
            .spyOn(console, "log")
            .mockImplementation(() => {});
        axios.post.mockRejectedValue(new Error("Logout failed"));

        render(<Header />);

        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);

        expect(axios.post).toHaveBeenCalledWith("/api/v1/users/logout");
        expect(consoleSpy).toHaveBeenCalledWith(new Error("Logout failed"));

        consoleSpy.mockRestore();
    });
});
