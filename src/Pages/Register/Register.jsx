

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const navigate = useNavigate();

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

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">

        <div>
          <h1 className="text-5xl font-bold">Register Now!</h1>
          <p className="py-6">
            Create your account and start exploring our platform.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <form onSubmit={handleCreateUser}>
            <div className="card-body">

              <fieldset className="fieldset">

                <label className="label">Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter Your Name"
                  name="name"
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="Enter Your Email"
                  name="email"
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered"
                  placeholder="Enter Your Password"
                  name="password"
                />

                {error && (
                  <p className="text-red-500 mt-2 text-sm">{error}</p>
                )}

                {success && (
                  <p className="text-green-600 mt-2 text-sm">{success}</p>
                )}

                <button
                  className="btn btn-neutral mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>

                <p className="text-center mt-3">
                  Already have an account?
                  <Link
                    to="/auth/login"
                    className="text-purple-700 font-bold ml-1"
                  >
                    Login
                  </Link>
                </p>

              </fieldset>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;