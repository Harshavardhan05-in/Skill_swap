import { NavLink } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6">
      <div className="text-center animate-bounce-slow">
        <div className="text-7xl font-extrabold mb-4 animate-fade-in">
          401
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-3 animate-fade-in delay-100">
          Unauthorized Access
        </h1>
        <p className="text-gray-300 mb-6 animate-fade-in delay-200">
          You are not authenticated to view this page. Please log in to continue.
        </p>
        <NavLink
            to="/"
          className="inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-md shadow-md hover:bg-gray-200 transition-all duration-300 animate-fade-in delay-300"
        >
          Go to Login
        </NavLink>
      </div>
    </div>
  );
};


