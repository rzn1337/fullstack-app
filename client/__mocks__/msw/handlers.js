import { http } from "msw";

export const handlers = [
    http.post("/api/v1/users/login", () => {
        return Response.json({
            _id: "1234",
            username: "testusername",
            email: "testemail@email.com",
        });
    }),
];
