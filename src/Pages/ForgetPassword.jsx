import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useLocation } from 'react-router';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const {user,sendPasswordResetEmailFunc}= useContext(AuthContext)
    const [email,setEmail] = useState('');
    const location = useLocation();
      useEffect(() => {
        if(location.state?.email){
            setEmail(location.state.email);
        }
    }, [location.state]);
    const handleResetPassword=(e)=>{
        e.preventDefault();
        sendPasswordResetEmailFunc(email)
        .then(() => {

            toast.success('Password reset email sent');

            // redirect to gmail
            window.location.href = 'https://mail.google.com';

        })
        .catch((error) => {
            toast(error.message);
        });
    }
    return (
       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 ">

            <form
                onSubmit={handleResetPassword}
                className="bg-white p-8 rounded-xl shadow-md space-y-4"
            >

                <h2 className="text-2xl font-bold text-center">
                    Reset Password
                </h2>

                <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    required
                />

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Reset Password
                </button>
                <Link
                    to={'/'}
                    className="btn btn-primary w-full"
                >
                    Go back
                </Link>
            </form>

        </div>
    );
};

export default ForgetPassword;