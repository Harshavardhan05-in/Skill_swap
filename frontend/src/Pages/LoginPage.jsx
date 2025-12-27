import { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom"
import { postLoginData } from "../apiRequests/apiResponse";
export const LoginPage = () => {

  const[inputValue,setInputValue] = useState({
    email:"",
    password:""
  })

  const naviagte = useNavigate();

  const handleInputChange = (e) => {
    const{name,value} = e.target;
    setInputValue((prev)=>({...prev,[name]:value}))
  }

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    console.log(inputValue);
    try {
      const result = await postLoginData(inputValue);
      if(result.status===200){
         naviagte("/home");
      }
    } catch (error) {
      if(error.status===401){
          alert("Please Fill all the Fields");
      }else if(error.status===500 || error.status===404){
        alert("Invalid Credentials");
        setInputValue({
          email:"",
          password:""
        })
      }
      console.log("ERROR:",error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to your account</h2>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="off"
            value={inputValue.email}
            onChange={(e)=>handleInputChange(e)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            value={inputValue.password}
            onChange={(e)=>handleInputChange(e)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don&apos;t have an account?{' '}
          <NavLink to="/signup"> <button className="text-indigo-600 hover:underline font-medium">
            Sign up
          </button>
          </NavLink>
          
        </p>
      </div>
    </div>
  );
}

