import React from "react";
import { useForm } from "react-hook-form";

function Signup() {
    const { register, handleSubmit } = useForm();

    const createUser = (data) => {
        console.log(data)
    };

    return (
        <form onSubmit={handleSubmit(createUser)}>
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

export default Signup;
