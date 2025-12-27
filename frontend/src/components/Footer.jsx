
export const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-gray-300 pt-12 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold text-white">
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
          </h2>
          <p className="text-indigo-300 italic">
            Peer-to-peer skill exchange platform to grow and share knowledge.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Navigate</h3>
          <ul className="space-y-2 text-indigo-200 hover:text-white cursor-pointer">
            <li className="hover:text-white transition-colors duration-300">About Us</li>
            <li className="hover:text-white transition-colors duration-300">Features</li>
            <li className="hover:text-white transition-colors duration-300">Pricing</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Resources</h3>
          <ul className="space-y-2 text-indigo-200 hover:text-white cursor-pointer">
            <li className="hover:text-white transition-colors duration-300">Blog</li>
            <li className="hover:text-white transition-colors duration-300">Help Center</li>
            <li className="hover:text-white transition-colors duration-300">Privacy Policy</li>
            <li className="hover:text-white transition-colors duration-300">Terms of Service</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Contact</h3>
          <ul className="space-y-2 text-indigo-200">
            <li>Email: <a href="mailto:support@skillswap.com" className="hover:text-white transition duration-300">support@skillswap.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-white transition duration-300">+1 (234) 567-890</a></li>
            <li>Address: 123 Skill St, Knowledge City</li>
          </ul>
        </div>
      </div>

      <hr className="border-indigo-700 my-8" />

      <div className="text-center text-indigo-400 text-sm">
        © {new Date().getFullYear()} Skill-Swap. All rights reserved.
      </div>
    </footer>
  );
}


