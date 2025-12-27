import  { useEffect, useState } from "react";
import { deleteUserAcc, getUserLog, logOutUser, updateUserData } from "../apiRequests/apiResponse";
import { useNavigate } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

export const Profile = () => {

    const navigate = useNavigate();
    const[isValidated,setIsValidated] = useState(false);
    const[logInData,setLogInData] = useState({});
    const[userLog,setUserLog] = useState({
        _id:"",
        username:"",
        email:"",
        phone:"",
        location:"",
        skillsKnow:[""],
        skillsWantToLearn:[""]
    })

    const [skills, setSkills] = useState([""] );
    const [skillsToLearn, setSkillsToLearn] = useState([""]);

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

    useEffect(()=>{
        setUserLog({
            _id:logInData._id || "",
            username:logInData.username || "",
            email:logInData.email || "",
            phone:logInData.phone || "",
            location:logInData.location || "",
            skillsKnow:logInData.skillsKnow || [""],
            skillsWantToLearn:logInData.skillsWantToLearn || [""]

        })
        setSkills(logInData.skillsKnow || []);
        setSkillsToLearn(logInData.skillsWantToLearn || []);
    },[logInData])


    

    const handleInputChange = (e) => {
        const{name,value} = e.target;
        setUserLog((prev)=>({...prev,[name]:value}))
        
    }

    

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
    setUserLog((prev)=>({...prev,skillsKnow:newSkills}))
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillToLearnChange = (index, value) => {
    const newSkillsToLearn = [...skillsToLearn];
    newSkillsToLearn[index] = value;
    setSkillsToLearn(newSkillsToLearn);
    setUserLog((prev)=>({...prev,skillsWantToLearn:newSkillsToLearn}))

  };

  const addSkillToLearn = () => {
    setSkillsToLearn([...skillsToLearn, ""]);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
        const result = await updateUserData(userLog);
        if(result.status===201){
            alert(" Details Sucessfully Updated");
            navigate("/home");
        }else{
            alert("Unble to Update Please Try again Later");
            navigate("/profile");
        }
    } catch (error) {
        console.log("Error :",error);
    }
    
  }

  const handleLogoutUser = async () => {
    try {
      const res = await logOutUser();
      console.log("RESPONCE",res);
      if(res.status===200){
        alert("Logout Sucessfull!");
         navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("UNABLE TO LOGOUT");
    }
  }

  const handleDeleteAccount = async() => {
    try {
      const result = await deleteUserAcc(logInData._id);
      console.log(result);
      if(result.status===201){
        alert("Account Deactivation SUcessfull");
        navigate("/signup");
      }
    } catch (error) {
        alert("Deletion Failed Please try Again");
        console.log("Error Part:",error);
    }
  }

  if(isValidated){

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 font-sans">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-8 text-center drop-shadow-md">
          Edit Profile
        </h2>

        <form onSubmit={handleFormSubmit}>
          {/* Username */}
          <label className="block mb-5">
            <span className="text-purple-700 font-semibold mb-2 block text-lg">
              Username
            </span>
            <input
              type="text"
                name="username"
                value={userLog.username}
                onChange={(e)=>handleInputChange(e)}
              placeholder="Enter username"
              className="w-full px-5 py-3 rounded-xl border-2 border-purple-300 focus:outline-none focus:border-purple-600 shadow-md transition"
            />
          </label>

          {/* Email */}
          <label className="block mb-5">
            <span className="text-pink-600 font-semibold mb-2 block text-lg">
              Email
            </span>
            <input
              type="email"
             name="email"
             value={userLog.email}
                onChange={(e)=>handleInputChange(e)}
              placeholder="Enter email"
              className="w-full px-5 py-3 rounded-xl border-2 border-pink-300 focus:outline-none focus:border-pink-600 shadow-md transition"
            />
          </label>

          {/* Phone */}
          <label className="block mb-5">
            <span className="text-red-600 font-semibold mb-2 block text-lg">
              Phone
            </span>
            <input
              type="tel"
              name="phone"
              value={userLog.phone}
                onChange={(e)=>handleInputChange(e)}
              placeholder="Enter phone number"
              className="w-full px-5 py-3 rounded-xl border-2 border-red-300 focus:outline-none focus:border-red-600 shadow-md transition"
            />
          </label>

          {/* Location */}
          <label className="block mb-10">
            <span className="text-purple-800 font-semibold mb-2 block text-lg">
              Location
            </span>
            <input
              type="text"
              name="location"
              value={userLog.location}
                onChange={(e)=>handleInputChange(e)}
              placeholder="Enter location"
              className="w-full px-5 py-3 rounded-xl border-2 border-purple-400 focus:outline-none focus:border-purple-800 shadow-md transition"
            />
          </label>

          {/* Skills Section */}
          <div className="mb-10 bg-purple-100 rounded-2xl p-6 shadow-inner">
            <h3 className="text-purple-700 font-bold text-xl mb-4">Skills</h3>
            {skills.map((skill, idx) => (
              <input
                key={idx}
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(idx, e.target.value)}
                placeholder="Add a skill"
                className="w-full mb-3 px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:border-purple-600 shadow-sm transition"
              />
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
              aria-label="Add Skill"
              title="Add Skill"
            >
              +
            </button>
          </div>

          {/* Skills to Learn Section */}
          <div className="mb-10 bg-pink-100 rounded-2xl p-6 shadow-inner">
            <h3 className="text-pink-700 font-bold text-xl mb-4">
              Skills to Learn
            </h3>
            {skillsToLearn.map((skill, idx) => (
              <input
                key={idx}
                type="text"
                value={skill}
                onChange={(e) => handleSkillToLearnChange(idx, e.target.value)}
                placeholder="Add a skill to learn"
                className="w-full mb-3 px-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:border-pink-600 shadow-sm transition"
              />
            ))}
            <button
              type="button"
              onClick={addSkillToLearn}
              className="text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
              aria-label="Add Skill to Learn"
              title="Add Skill to Learn"
            >
              +
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-xl font-extrabold text-white shadow-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Outside Form Buttons */}
      <div className="mt-8 flex space-x-6">
        <button
          onClick={handleDeleteAccount}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl font-extrabold text-white shadow-lg transition"
        >
          Delete Account
        </button>
        <button
          onClick={handleLogoutUser}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-800 active:bg-gray-900 rounded-xl font-extrabold text-white shadow-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}else{
  return <ErrorPage />
}
}

