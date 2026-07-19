// import React, { useContext } from 'react';
// import { AuthContext } from '../../Context/AuthContext';

// const Login = () => {
//     const { user, signInWithEmailAndPasswordFunc,signInWithPopUpFunc } = useContext(AuthContext)

//     const handlesignIn = (e) => {
//         e.preventDefault();
//         const email = e.target.email.value;
//         const password = e.target.password.value;
//         console.log(email,password)
//         signInWithEmailAndPasswordFunc(email,password)
//         .then((result)=>{
//             console.log(result.user)
//         })
//         .catch((error)=>{
//             console.log('Failed ',error);
//         })

//     }

//     const handleGoogleSignIn =()=>{
//         signInWithPopUpFunc()
//         .then((result)=>{
//             console.log(result.user)
//         })
//         .catch((error)=>{
//             console.log('Failed ',error )
//         })
//     }


//     return (
//         <div>
//             <div className="hero bg-base-200 min-h-screen">
//                 <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//                     <h1 className="text-5xl font-bold">Login now!</h1>

//                         <div className="card-body">
//                             <form onSubmit={handlesignIn}>
//                                 <fieldset className="fieldset">
//                                 <label className="label">Email</label>
//                                 <input type="email" className="input" placeholder="Email" name='email' />
//                                 <label className="label">Password</label>
//                                 <input type="password" className="input" placeholder="Password" name='password'/>
//                                 <div><a className="link link-hover">Forgot password?</a></div>
//                                 <button className="btn btn-neutral mt-4">Login</button>
//                             </fieldset>
//                             </form>
//                             {/* Google */}
// <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
//   <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
//   Login with Google
// </button>
//                         </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
    const {
        signInWithEmailAndPasswordFunc,
        signInWithPopUpFunc,
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handlesignIn = (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);

        signInWithEmailAndPasswordFunc(email, password)
            .then(() => {
                setSuccess("Login Successful 🎉");

                form.reset();

                setTimeout(() => {
                    navigate("/");
                }, 1200);
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
            .finally(() => setLoading(false));
    };

    return (
        // <div
        //   className="min-h-screen flex justify-center items-center bg-cover bg-center "
        // >
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

                <form onSubmit={handlesignIn}>

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
                            to="/auth/forgotPassword"
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
                    <FaGoogle />
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