import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const login = (data) => {
        axios
            .post("/api/v1/users/login", data)
            .then((response) => {
                console.log(response.data.data.user);
                const user = response.data.data.user;
                dispatch(loginUser(user));
                navigate("/")
            })
            .catch((error) => console.log(error));
    };
    return (
        <form onSubmit={handleSubmit(login)}>
            <div className="flex flex-col justify-center items-center h-screen">
                <input
                    className="m-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:outline-slate-950 focus:ring-ring focus:border-transparent"
                    placeholder="Username"
                    type="text"
                    {...register("username", { required: true })}
                />
                <input
                    className="m-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:outline-slate-950 focus:ring-ring focus:border-transparent"
                    placeholder="Password"
                    type="text"
                    {...register("password", {
                        required: true,
                    })}
                />
                <button
                    type="submit"
                    className="m-2 rounded-md border border-gray-300 text-white bg-black px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:outline-slate-950 focus:ring-ring focus:border-transparent"
                >
                    Register
                </button>
            </div>
        </form>
    );
}

export default Login;
