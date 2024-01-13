import { commonRequest } from "./axios";

export async function login({ credential, password }) {
  const response = await commonRequest.post("/auth/login",{
    credential,
    password,
  },{
    headers:{
      "Content-Type":"application/json",
      'authorization' : undefined
    }
  });
  return response.data;
}
export async function getGoogleToken(props) {
  const response = await commonRequest.get(props);
  return response.data;
}


export async function signUp({ email, code, username, password }) {
  const response = await commonRequest.post("/auth/email-register", {
    email,
    code,
    username,
    password
  },{
    headers:{
      "Content-Type":"application/json",
      'authorization' : undefined
    }
  });
  return response.data;
}

export async function signUpByPassword({ username, password,plainPassword,nickname }) {
  const response = await commonRequest.post("/auth/register", {
    username,
    password,
    plainPassword,
    nickname
  },{    headers:{
    "Content-Type":"application/json",
    'authorization' : undefined
  }});
  return response.data;
}

export async function getUserProfile() {
  const response = await commonRequest.get("/account/profile");
  return response.data;
}

export async function updateUserProfile({
  nickname,
}) {
  const response = await commonRequest.patch("/account", {
    nickname
  });
  return response.data;
}

export async function getOrders(data) {
  const response = await commonRequest.get("/shop/orders", {params:data});
  return response.data;
}


export async function sendCodeApi(data){
  const response = await commonRequest.post("/auth/send-register-email", data,{
    headers:{
      "Content-Type":"application/json",
      'authorization' : undefined
    }
  });
  return response.data;
}
export async function sendResetPasswordCodeApi(data){
  const response = await commonRequest.post("/auth/send-retrieve-password-email", data,{
    headers:{
      "Content-Type":"application/json",
      'authorization' : undefined
    }
  });
  return response.data;
}


export async function uploadImg(data){
  const res = await commonRequest.post("/account/avatar",data);
  return res.data;
}


export async function loginByEmail(data){
  const res = await commonRequest.post("/auth/email-login",data,{
    headers:{
      "Content-Type":"application/json",
      'authorization' : undefined
    }
  });
  return res.data;
}

export async function sendLoginEmail(params) {
  const res = await commonRequest.post("/auth/send-login-email", params,{
    headers:{
      "Content-Type":"application/json",
      'authorization' : undefined
    }
  });
  return res.data;
}
  
export async function sendEmailBound(email:string) {
  const res = await commonRequest.post("/account/send-email-bound",{
    email
  },{    headers:{
    "Content-Type":"application/json",
    'authorization' : undefined
  }});
  return res.data;
}

export async function boundEmail(email:string,code:string) {
  const res = await commonRequest.patch("/account/bound-email",{
    email,
    code
  },{
    headers:{
      "Content-Type":"application/json",
      'authorization' : undefined
    }
  });
  return res.data;
}

export async function resetPasswordByCode(data){
  const res = await commonRequest.patch("/auth/retrieve-password",data,{
    headers:{
      "Content-Type":"application/json",
      'authorization' : undefined
    }
  });
  return res.data;
}