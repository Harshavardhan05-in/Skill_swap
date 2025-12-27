import { useEffect, useState } from "react";
import {ErrorPage} from "./ErrorPage";
import { getReceiveRequest, getSentRequest, getUserLog, updateRequestStatus } from "../apiRequests/apiResponse";

export const RequestHistory = () => {

  const [activeTab, setActiveTab] = useState("sent");

    const[logInData,setLogInData] = useState({});
    const[sentUsers,setSentUsers] = useState([]);
    const[receiveUsers,setReceiveusers] = useState([]);
    const[isValidated,setIsValidated] = useState(false);


    const getUserDetails = async() => {
              try {
                const res = await getUserLog();
                if(res.status===200){
                  setLogInData(res.data);
                  setIsValidated(true);
    
                }
              } catch (error) {
                  console.log(error);
            }
        }
    
        useEffect(()=>{
          getUserDetails();
        },[])


  const getLoginDetails = async() => {
        try {
            if(logInData && logInData._id){
                const res1 = await getSentRequest(logInData._id);
                const res2 = await getReceiveRequest(logInData._id);
                if(res1.status===201){
                    setSentUsers(res1.data);
                }
                if(res2.status==201){
                    setReceiveusers(res2.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
  }

  useEffect(()=>{
    getLoginDetails();
  },[logInData])

  const handleRequest = async(action,user) => {
      try {
          let UserD;
          if(action==="accept"){
             UserD = {
                statusCode:"accepted"
             }
          }else if(action==="reject"){
            UserD = {
              statusCode:"rejected"
            }
          }
          const res = await updateRequestStatus(user._id,UserD);
          if(res.status===201){
              setReceiveusers((prev)=>{
                 return prev.map((curr)=>{
                    return curr._id===res.data._id?{...curr,statusCode:res.data.statusCode}:curr
                 })

              })
          }

      } catch (error) {
        console.log(error);
      }

  }

  if(isValidated){
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 border border-purple-200">
        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-l-lg font-bold text-sm uppercase tracking-wide transition ${
              activeTab === "sent"
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
            onClick={() => setActiveTab("sent")}
          >
            Requests Sent
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-bold text-sm uppercase tracking-wide transition ${
              activeTab === "received"
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
            onClick={() => setActiveTab("received")}
          >
            Requests Received
          </button>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {activeTab === "sent" &&
            sentUsers.map((req) => (
<div
  key={req._id}
  className="flex justify-between items-center bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-600 bg-opacity-80 p-6 rounded-xl shadow-xl border border-purple-300 backdrop-blur-md hover:shadow-2xl transition-all duration-300"
>
  {/* Left Section */}
  <div>
    <p className="text-xl font-bold text-white tracking-wide">{req.receiver}</p>

    {/* Status Badge */}
    <span
      className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full border shadow-sm 
        ${
          req.statusCode === "accepted"
            ? "bg-green-200 text-green-900 border-green-400"
            : req.statusCode === "rejected"
            ? "bg-red-200 text-red-900 border-red-400"
            : "bg-yellow-200 text-yellow-900 border-yellow-400"
        }`}
    >
      {req.statusCode.toUpperCase()}
    </span>
  </div>

  {/* Right Section */}
  {req.statusCode === "accepted" && (
    <button className="bg-white text-purple-700 px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-purple-100 hover:text-purple-900 transition-colors duration-200">
      💬 Chat
    </button>
  )}
</div>


            ))}

          {activeTab === "received" &&
            receiveUsers.map((req) => (
              <div
                key={req._id}
                className="flex justify-between items-center bg-gradient-to-r from-yellow-100 to-yellow-200 p-5 rounded-lg shadow-md border border-yellow-300"
              >
                <div>
                  <p className="text-lg font-bold text-yellow-900">{req.sender}</p>
                </div>
                { req.statusCode==="pending" && <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm font-semibold shadow-sm" onClick={()=>handleRequest("accept",req)}>
                    Accept
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm font-semibold shadow-sm" onClick={()=>handleRequest("reject",req)} >
                    Reject
                  </button>
                  {/* <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-semibold shadow-sm" >
                    Chat
                  </button> */}
                </div>

                }
                {
                    req.statusCode==="accepted" && <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm font-semibold shadow-sm" disabled={true} >
                    Accepted
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-semibold shadow-sm" >
                    Chat
                  </button>
                </div>
                }
                {
                    req.statusCode==="rejected" && <div className="flex space-x-2">
                  
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm font-semibold shadow-sm" disabled={true} >
                    Rejected
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm font-semibold shadow-sm" >
                    Chat
                  </button>
                </div>
                }
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}else{
  return <ErrorPage />
}
};

