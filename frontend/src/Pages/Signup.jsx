import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { postData } from "../apiRequests/apiResponse";

export const SignIn = () => {

  const navigate = useNavigate();

    const[inputValue,setInputValue] = useState({
        username:"",
        email:"",
        password:"",
        cpassword:""
    })

    const handleInputChange = (e) => {
        const{name,value} = e.target;
        setInputValue((prev)=>({...prev,[name]:value}));
    }

    const handleFormSubmit = async(e) => {
      e.preventDefault();
      try {
        const res = await postData(inputValue);
        if(res.status===200){
          alert(" Account Created!");
          navigate("/")
        }else if(res.status===401){
          alert("Password Not Matched");
        }
      } catch (error) {
        if(error.status===401){
            alert(" Passwords Not Matched");
            setInputValue((prev)=>({...prev,cpassword:""}))
        }else{  
            alert("The Password Must be Minimum 5 characters ");
            setInputValue((prev)=>({...prev,password:"",cpassword:""}))

        }
      }
      
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-900 flex items-center justify-center px-4 py-5">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 animate-fadeInUp">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
          Sign In to Skill-Swap
        </h2>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* {UserName} */}
            <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              name="username"
              
              value={inputValue.username}
              onChange={(e)=>handleInputChange(e)}

              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              name="email"
              value={inputValue.email}
              onChange={(e)=>handleInputChange(e)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              name="password"
              value={inputValue.password}
              onChange={(e)=>handleInputChange(e)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="cpassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              placeholder="Confirm your password"
              required
              name="cpassword"
              value={inputValue.cpassword}
              onChange={(e)=>handleInputChange(e)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-md font-semibold transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/"
            className="text-indigo-700 hover:text-indigo-900 font-semibold transition"
          >
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
