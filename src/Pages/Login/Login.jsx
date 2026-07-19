import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const { user, signInWithEmailAndPasswordFunc,signInWithPopUpFunc } = useContext(AuthContext)

    const handlesignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password)
        signInWithEmailAndPasswordFunc(email,password)
        .then((result)=>{
            console.log(result.user)
        })
        .catch((error)=>{
            console.log('Failed ',error);
        })

    }

    const handleGoogleSignIn =()=>{
        signInWithPopUpFunc()
        .then((result)=>{
            console.log(result.user)
        })
        .catch((error)=>{
            console.log('Failed ',error )
        })
    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                
                        <div className="card-body">
                            <form onSubmit={handlesignIn}>
                                <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" name='email' />
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" name='password'/>
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                            </form>
                            {/* Google */}
<button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
                        </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Login;