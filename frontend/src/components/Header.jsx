
export const Header = () => {
  return (
    <header className="bg-indigo-900 shadow-md py-4 px-6 flex items-center justify-between animate-fadeIn">
      {/* Left: Logo */}
      <div className="flex items-center space-x-3">
        <img
          src="./Images/logo.png" // Free logo placeholder
          alt="Skill-Swap Logo"
          className="w-20 h-15 rounded-full animate-pulse"
        />
      </div>

      {/* Right: Title and Subtitle */}
      <div className="text-right">
        <h1 className="text-3xl font-bold text-gray-200 transition duration-300 hover:text-indigo-900 mr-[15px]">
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
        <p className="text-sm text-gray-900 italic bg-blue-500 p-1 ">
          Peer‑to‑peer skill exchange
        </p>
      </div>
    </header>
  );
}

