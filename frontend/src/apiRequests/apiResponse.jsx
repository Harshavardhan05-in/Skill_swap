import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:5000"
})

export const postData = (userD) => {
    return api.post("/signup",userD);
}

export const postLoginData = (userD) => {
    return api.post("/login",userD,{
        withCredentials:true
    });
}

export const getUserLog = () => {
    return api.get("/home",{
        withCredentials:true,
    });
}

export const updateUserData = (data) => {
    return api.put("/profile",data,{
        withCredentials:true
    })
}

export const logOutUser = () => {
    return api.get("/logout",{
        withCredentials:true
    })
}

export const deleteUserAcc = (id) => {
    return api.delete(`/delete/${id}`)
}

export const getAllUsers = () => {
    return api.get("/allusers",{
        withCredentials:true
    });
}

export const postUserRequest = (data) => {
    return api.post("/postreq",data,{
        withCredentials:true
    })
}

export const getProfileDetails = (id) => {
    return api.get(`/getprofile/${id}`,{
        withCredentials:true
    })
} 

export const getUserRequest = (id1,id2) => {
    return api.get(`/getreq/${id1}/${id2}`,{
        withCredentials:true
    })
}

export const getSentRequest = (id) => {
    return api.get(`/getsentreq/${id}`,{
        withCredentials:true
    })

}

export const getReceiveRequest = (id) => {
    return api.get(`/getreceivereq/${id}`,{
        withCredentials:true
    })
}

export const updateRequestStatus = (id,data) => {
    return api.put(`/updatereq/${id}`,data,{
        withCredentials:true
    })
}