import { useEffect, useState } from "react";
import { FaCodePullRequest } from "react-icons/fa6";
import { getAllUsers, getUserLog } from "../apiRequests/apiResponse";
import {Footer} from "../components/Footer"
import { NavLink, useNavigate } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
export const UserDetails = () => {

    const[isValidated,setIsValidated] = useState(false);
    const[logInData,setLogInData] = useState({});
    const[allUsers,setAllUsers] = useState([]);
    const[searchList,setSearchList] = useState([]);
    
    const[inputValue,setInputValue] = useState("");
    
    const navigate = useNavigate();

    const getUserDetails = async() => {
        try {
           const res = await getUserLog();
            setLogInData(res.data);
            if(res.status===200){
                setIsValidated(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[])

    const updateData = async() => {
        try {
            const res = await getAllUsers();
            if(res.status===201){
                const newList = res.data.filter((curr)=>{
                    return curr.username!==logInData.username;
                })
                setAllUsers(newList);
                setSearchList(newList);

            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        updateData();
        
    },[logInData])   


    const handleInputChange = (val) => {
        setInputValue(val);
        console.log(inputValue);
    }
    
    
    useEffect(()=>{
        if(inputValue===""){
            setSearchList(allUsers);
        }else{
            const list = allUsers.filter((curr)=>{
                return curr.skillsKnow.some((curr)=>{
                    return curr.toLowerCase().includes(inputValue.toLowerCase());
                })
            })
            setSearchList(list);
        }
    },[inputValue])

    

     

    if(isValidated){
    return (
        <>
            <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
                {/* Brand Title */}
                <div className="w-full md:w-auto text-center md:text-left mb-2 md:mb-0">
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
                </div>

                {/* Search Bar */}
                <div className="w-full md:flex-1 md:px-4 mb-2 md:mb-0">
                <div className="flex items-center justify-center">
                    <form >
                            <input
                                type="text"
                                placeholder="Search..."
                                value={inputValue}
                                onChange={(e)=>handleInputChange(e.target.value)}
                                className="w-full md:w-100 p-2 rounded-l-md text-black focus:outline-none border-[5px] border-white"
                            />
                            <button className="bg-white text-pink-600 font-semibold px-4 py-2 rounded-r-md hover:bg-gray-200">
                                Search
                            </button>
                    </form>
                </div>
                </div>
                <div className="p-4">
            <button
              onClick={() => navigate("/history")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
                <FaCodePullRequest />
            </button>
          </div>

                {/* User Name */}
                <div className="w-full md:w-auto text-center md:text-right">
                <span className="font-medium text-2xl">Hello, {logInData.username}</span>
                </div>
            </div>
            </header>
  
            <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold  mb-8 animate-bounce text-green-800">User Profiles</h1>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {searchList.map(user => (
                <li
                    key={user._id}
                    className="max-w-sm text-black p-6 rounded-xl shadow-lg border-2 border-pink-500 max-w-sm bg-[#FDE2E4] text-black p-6 rounded-xl shadow-md border border-[#f8c5cb] p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-2 ">{user.username}</h2>

                    <div className="mb-2">
                    <p className="font-semibold text-gray-700">Skills Known:</p>
                    <ul className="list-disc list-inside text-gray-600">
                        {user.skillsKnow.map((skill, index) => (
                        <li key={index}>{skill}</li>
                        ))}
                    </ul>
                    </div>
                    <div className="mb-4">
                    <p className="font-semibold text-gray-700">Wants to Learn:</p>
                    <ul className="list-disc list-inside text-gray-600">
                        {user.skillsWantToLearn.map((skill, index) => (
                        <li key={index}>{skill}</li>
                        ))}
                    </ul>
                    </div>
                        <NavLink to={`/user/${user._id}`} >
                                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded hover:opacity-90 transition-all">
                                    View Profile
                                </button>
                        </NavLink>
                    
                </li>
                ))}
            </ul>
            </div>
        



        <Footer />
        </>
    )
}else{
    return <ErrorPage />
}
}