
import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const {
        signInWithEmailAndPasswordFunc,
        signInWithPopUpFunc,
        loading,
        setLoading
    } = useContext(AuthContext);

    const emailRef = useRef(null)
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPasswordFunc(email, password)
            .then(() => {
                setSuccess("Login Successful 🎉");

                form.reset();
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                setError(error.message);
            })
    };

    const handleGoogleSignIn = () => {
        signInWithPopUpFunc()
            .then((result) => {
                console.log(result.user);
                navigate(`${location.state ? location.state : "/"}`)
            })
            .catch((error) => {
                setError(error.message);
            })
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-400 flex items-center justify-center">

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

            <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30 my-10">

                <h1 className="text-4xl font-bold text-center text-white">
                    Welcome Back 👋
                </h1>

                <p className="text-center text-gray-200 mt-2 mb-6">
                    Login to continue
                </p>

                <form onSubmit={handleSignIn}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered w-full mb-4"
                        required
                    />

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4"
                        >
                            {!showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                    </div>

                    <div className="text-right mt-2">
                        <Link
                            to={'/forget-password'}
                            state={{ email: emailRef.current?.value }}
                            className="text-white hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {error && (
                        <p className="text-red-300 mt-3">{error}</p>
                    )}

                    {success && (
                        <p className="text-green-300 mt-3">{success}</p>
                    )}

                    <button
                        className="btn btn-primary w-full mt-5"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
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

                <p className="text-center text-white mt-6">
                    Don't have an account?
                    <Link
                        to="/auth/register"
                        className="font-bold ml-2 underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;