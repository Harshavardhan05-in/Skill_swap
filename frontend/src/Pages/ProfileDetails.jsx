import { useParams } from "react-router-dom"
import {getProfileDetails, getUserLog, getUserRequest, postUserRequest} from "../apiRequests/apiResponse"
import { useEffect } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useState } from "react";
import { ErrorPage } from "./ErrorPage";

export const ProfileDetails= () => {
    const params = useParams();
    const id = params.id;

    const[logInData,setLogInData] = useState({});
    const[isValidated,setIsValidated] = useState(false);
    const[reqStatus,setReqStatus] = useState("Send Request");
    const[isRequesting,setIsRequesting] = useState(false);
    
    const[userDetails,setUserDetails] = useState({
        username: "",
        email: "",
        skillsKnow: [],
        skillsWantToLearn: [],
        location: "",
        phone: "",
    });

    const getMoreDetails = async() => {
        try {
            const res = await getProfileDetails(id);
            if(res.status===201){
                setUserDetails(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getMoreDetails();
    },[])


const sections = [
  "intro",
  "skillsKnow",
  "skillsWantToLearn",
  "contact",
  "password",
];

  const [visible, setVisible] = useState({});

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const show = rect.top < window.innerHeight * 0.85;
        if (show) {
          setVisible((v) => ({ ...v, [section]: true }));
        }
      });
    };
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal logic for Send Request
  const [modalOpen, setModalOpen] = useState(false);

  const getUserDetails = async() => {
          try {
            const res = await getUserLog();
            if(res.status===200){
                setIsValidated(true);
              setLogInData(res.data);

            }
          } catch (error) {
              console.log(error);
        }
    }

    useEffect(()=>{
      getUserDetails();
    },[])

  const handleRequestUser = async() => {
      console.log(" SENDER :",logInData._id,"/n RECEIVER :",userDetails._id);
        const reqInfo = {
            senderId:logInData._id,
            receiverId:userDetails._id,
            sender:logInData.username,
            receiver:userDetails.username,
        }
        try {
            setIsRequesting(true);
            const res = await postUserRequest(reqInfo);
            if(res.status===201){
              setReqStatus("pending");
                alert("Request Sucessfully Sent");
            }
        } catch (error) {
            console.log("Error->",error);
            setIsRequesting(false);
            
        }
  }

  const getRequestDetails = async() => {
      try {
          if(logInData._id && userDetails._id){
              // console.log("SENDER ID:",logInData._id," Receiver Id ",userDetails._id);
              const res = await getUserRequest(logInData._id,userDetails._id);
              if(res.status===200){
                  //  console.log("Responce :",res);
                   setReqStatus(res.data.statusCode);
              }
          }
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(()=>{
      if(logInData && userDetails){
        getRequestDetails();
      }
  },[logInData,userDetails]);

  const hanldeButtonToogle = () => {
    switch(reqStatus){
      case "pending":return "Request Sent";
      case "accepted":return "Request Accepted";
      case "rejected":return "Request Rejected";
      default : return "Send Request";
    }
  }

  if(isValidated){
  return (
    <>
      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-sm mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-700">
              Request Sent!
            </h2>
            <p className="mb-6">Thank you, {user.username}. Your request has been sent successfully.</p>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-300 to-purple-300 font-sans">
        {/* Header with wave */}
        <div className="relative bg-gradient-to-r from-pink-500 via-purple-700 to-indigo-600 h-48 rounded-b-[80px] shadow-lg overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-full h-24"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#fff"
              fillOpacity="0.3"
              d="M0,64L48,58.7C96,53,192,43,288,80C384,117,480,203,576,240C672,277,768,267,864,213.3C960,160,1056,64,1152,53.3C1248,43,1344,117,1392,154.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>

       <div className="relative flex flex-col items-center justify-center h-full pt-12">
  <div className="rounded-full border-2 border-white shadow-lg w-36 h-36 overflow-hidden animate-pulse z-10">
    <IoPersonCircle 
      className=" w-full h-full"
    />
  </div>

            <h1
            className="mt-6 text-6xl font-extrabold text-white relative z-20"
            style={{
                textShadow: `0 0 4px rgba(255, 255, 255, 0.4),
                            0 0 8px rgba(255, 255, 255, 0.3)`,
            }}
            >
            {userDetails.username}
            </h1>
            <p
            className="mt-2 text-2xl font-semibold text-white relative z-20"
            style={{
                textShadow: `0 0 3px rgba(255, 255, 255, 0.35),
                            0 0 6px rgba(255, 255, 255, 0.25)`,
            }}
            >
            {userDetails.email}
            </p>

            </div>



        </div>

        {/* Content Sections */}
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-24">
          {/* Skills Know */}
<section
  id="skillsKnow"
  className={`transform transition-all duration-700 ease-in-out ${
    visible.skillsKnow
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-[-50px]"
  }`}
>
  <h2 className="text-3xl font-bold mb-6 text-purple-900">🛠 Skills I Know</h2>
  <div className="flex flex-wrap gap-4">
    {userDetails.skillsKnow.map((skill, i) => (
      <span
        key={i}
        className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 text-white font-semibold shadow-lg transform hover:scale-110 transition"
        style={{ textShadow: "0 0 3px rgba(0,0,0,0.6)" }}
      >
        {skill}
      </span>
    ))}
  </div>
</section>

{/* Skills Want To Learn */}
<section
  id="skillsWantToLearn"
  className={`transform transition-all duration-700 ease-in-out ${
    visible.skillsWantToLearn
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-[50px]"
  }`}
>
  <h2 className="text-3xl font-bold mb-6 text-yellow-900">📚 Skills I Want To Learn</h2>
  <div className="flex flex-wrap gap-4">
    {userDetails.skillsWantToLearn.map((skill, i) => (
      <span
        key={i}
        className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-600 via-orange-700 to-red-800 text-white font-semibold shadow-lg transform hover:scale-110 transition"
        style={{ textShadow: "0 0 3px rgba(0,0,0,0.6)" }}
      >
        {skill}
      </span>
    ))}
  </div>
</section>


          {/* Contact Info */}
          <section
            id="contact"
            className={`transform transition-all duration-700 ease-in-out ${
              visible.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold mb-6 text-indigo-900">📍 Contact Information</h2>
            <ul className="text-xl space-y-2 text-gray-900 font-semibold">
              <li>Location: {userDetails.location}</li>
              <li>Phone: {userDetails.phone}</li>
            </ul>
          </section>

          {/* Send Request Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleRequestUser}
              disabled={isRequesting || reqStatus==="accepted" || reqStatus==="pending"}
              className="relative px-12 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white font-extrabold shadow-lg overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-30 transition"></span>
              <span className="relative" >💌 {hanldeButtonToogle()} </span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}else{
  return <ErrorPage />
}
}