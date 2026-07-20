import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const MyProfile = () => {
  const {user} = useContext(AuthContext)
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center p-6 my-2 rounded-sm">
      
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">
        
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={user.photoURL}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-indigo-400 shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">
            {user.displayName}
          </h2>

          <p className="text-gray-600 text-lg">
            {user.email}
          </p>
        </div>

        {/* Update Button */}
        <Link to={'/update-profile'} className="btn mt-8 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md hover:shadow-xl">
          Update Profile
        </Link>
      </div>
    </div>
    );
};

export default MyProfile;