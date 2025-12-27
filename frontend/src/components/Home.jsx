import { useEffect, useState } from "react";
import { getUserLog } from "../apiRequests/apiResponse";
import { Footer } from "./Footer";
import { Header1 } from "./Header1";
import { NavLink } from "react-router-dom";
import { ErrorPage } from "../Pages/ErrorPage";

export const Home = () => {

  const[userData,setUserData] = useState({});
  const[isValidated,setIsValidated] = useState(false);

    const userdata = async() => {
        const result = await getUserLog();
        setUserData(result.data);
        if(result.status===200){
          setIsValidated(true);
        }
    }
    useEffect(()=>{
        userdata();
    },[])

    if(isValidated){
  return (
    <>
        <Header1 />
         <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 animate-gradientBackground text-white">
            {/* Content container */}
            <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col justify-center flex-grow">
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-center sm:text-left tracking-tight">
            Welcome  <span className="text-yellow-400">{userData.username}</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mb-10 text-center sm:text-left leading-relaxed">
            SkillSwap is a peer-to-peer skill exchange platform where you can learn new skills or share your expertise with others. Connect, grow, and collaborate with a vibrant community of learners and teachers.
            </p>

        <div className="flex justify-center sm:justify-start">
          <NavLink to="/userdetails" >
                <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-lg transition-colors duration-300">
                    Find Your Peer
                </button>
          </NavLink>
          
        </div>
      </div>

      {/* Background animation styles */}
      <style >{`
        @keyframes gradientBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientBackground {
          background-size: 200% 200%;
          animation: gradientBackground 15s ease infinite;
        }
      `}</style>
    </div>
    <Footer />   
    </>
  );
}else{
  return <ErrorPage />
}

}
