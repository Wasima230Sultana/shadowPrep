

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { createUser, signInWithPopUpFunc } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateUser = (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        // Validation
        if (!name.trim()) {
            return setError("Name is required.");
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters.");
        }

        setLoading(true);

        createUser(email, password)
            .then((result) => {
                console.log(result.user);

                setSuccess("🎉 Registration Successful!");

                form.reset();

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleSignIn = () => {
        setLoading(true);

        signInWithPopUpFunc()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(error.message);
            })
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-500 flex items-center justify-center">

            {/* Animated Background */}
            {/* Purple Blob */}
            <div className="absolute -top-20 -left-20 sm:-top-32 sm:-left-32 lg:-top-40 lg:-left-40
                h-52 w-52 sm:h-72 sm:w-72 lg:h-96 lg:w-96
                rounded-full bg-purple-500 blur-5xl animate-pulse">
            </div>

            {/* Pink Blob */}
            <div className="absolute top-1/4 -right-16 sm:-right-24 lg:-right-32
                h-52 w-52 sm:h-72 sm:w-72 lg:h-96 lg:w-96
                rounded-full bg-pink-500 blur-5xl animate-pulse">
            </div>

            {/* Cyan Blob */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2
                lg:left-1/3 lg:translate-x-0
                h-52 w-52 sm:h-72 sm:w-72 lg:h-96 lg:w-96
                rounded-full bg-cyan-500 blur-5xl animate-pulse">
            </div>

            {/* Content */}
            <div className="relative z-10 hero-content flex-col lg:flex-row-reverse gap-16">

                {/* Left Side */}
                <div className="text-white max-w-lg">

                    <h1 className="text-6xl font-extrabold leading-tight">
                        Create Your
                        <span className="block text-cyan-300">
                            Dream Account
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                        Join thousands of users and unlock premium features.
                        Secure authentication, fast performance, and a beautiful
                        experience await you.
                    </p>

                </div>

                {/* Register Card */}
                <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,.4)]">


                    <div className="card-body">

                        <form onSubmit={handleCreateUser}>
                            <h2 className="text-3xl font-bold text-center text-white mb-2">
                                Register
                            </h2>

                            <p className="text-center text-gray-300 mb-4">
                                Create a new account
                            </p>

                            {/* Name */}

                            <label className="label text-white">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                            />

                            {/* Email */}

                            <label className="label text-white mt-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                            />
{/* PhotoURL */}

                       <label className="label text-white mt-2">Photo-URL</label>
                        <input 
                        type="text" className="input" placeholder="Enter photo URL" 
                        name='photoURL'
                        className="input input-bordered w-full"
                         />

                            {/* Password */}

                            <label className="label text-white mt-2">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pr-12"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 text-gray-500"
                                >
                                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>

                            </div>

                            {/* Error */}

                            {error && (
                                <div className="alert alert-error mt-4">
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Success */}

                            {success && (
                                <div className="alert alert-success mt-4">
                                    <span>{success}</span>
                                </div>
                            )}

                            {/* Button */}

                            <button
                                disabled={loading}
                                className="btn mt-6 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 border-none text-white hover:scale-105 transition duration-300"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Registering...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </form>
                        <div className="divider text-white">OR</div>

                        <button
                            onClick={handleGoogleSignIn}
                            className="btn bg-white text-black w-full hover:bg-gray-100"
                        >
                            <FcGoogle />
                            Continue with Google
                        </button>
                        {/* Login */}

                        <p className="text-center text-gray-200 mt-5">

                            Already have an account?

                            <Link
                                to="/auth/login"
                                className="ml-2 text-blue-900 hover:text-cyan-300 font-semibold"
                            >
                                Login
                            </Link>

                        </p>




                    </div>


                </div>

            </div>

        </div>
    );
};

export default Register;