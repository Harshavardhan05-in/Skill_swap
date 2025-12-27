

import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export const Header1 = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-200 transition duration-300 hover:text-indigo-900">
              <span className="text-yellow-400">S</span>
              <span className="text-green-400">k</span>
              <span className="text-pink-400">i</span>
              <span className="text-blue-400">l</span>
              <span className="text-red-400">l</span>
              <span className="text-white">-</span>
              <span className="text-orange-400">S</span>
              <span className="text-teal-400">w</span>
              <span className="text-purple-400">a</span>
              <span className="text-emerald-400">p</span>
            </h1>

        {/* Right Icon */}
        
        <NavLink to="/profile" >
              <button className="hover:scale-105 transition-transform">
                <CgProfile className="text-yellow-200 text-5xl" />
              </button>
        </NavLink>
        
      </div>
    </header>
  );
};
