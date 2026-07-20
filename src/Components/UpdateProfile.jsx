import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router';

const UpdateProfile = () => {
    const { user, updateProfileFunc, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleUpdate = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        // console.log(name,photoURL)
        updateProfileFunc({
            displayName: name,
            photoURL: photoURL
        })
            .then(() => {
                setUser({
                    ...user,
                    displayName: name,
                    photoURL: photoURL
                });
                alert("Profile Updated Successfully!");
                navigate('/my-profile')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 my-2 rounded-sm">

            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">

                <form onSubmit={handleUpdate} className="card-body">

                    <h2 className="text-2xl font-bold text-center">
                        Update Profile
                    </h2>

                    <label className="label">Name</label>

                    <input
                        type="text"
                        name="name"
                        defaultValue={user.displayName}
                        className="input input-bordered"
                    />

                    <label className="label">Photo URL</label>

                    <input
                        type="text"
                        name="photoURL"
                        defaultValue={user.photoURL}
                        className="input input-bordered"
                    />

                    <button className="btn btn-primary mt-4">
                        Update Profile
                    </button>
                    <Link to={'/my-profile'} className="btn btn-primary mt-4">
                        Go Back
                    </Link>
                </form>

            </div>

        </div>
    );
};

export default UpdateProfile;