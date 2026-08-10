
import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">

            <div className="text-center">

                <h1 className="text-7xl font-bold text-primary">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold mt-4">
                    Page Not Found
                </h2>

                <p className="text-slate-400 mt-3">
                    Sorry, the page you are looking for does not exist.
                </p>

                <Link
                    to="/"
                    className="btn btn-primary mt-6"
                >
                    Go Home
                </Link>

            </div>

        </div>
    );
};

export default ErrorPage;

