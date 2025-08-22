import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import resetpassword from '../../../assets/images/resetpassword.svg'


export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
 let nav = useNavigate()
   async function sub(email,newPassword){
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
        email:email,
        newPassword :newPassword
    })
    console.log(data.token);
    localStorage.getItem("usetToken",data.token)
    nav('/login')
 }

  return (

    <div className="py-10 flex  items-center bg-gray-50">
      <div className="w-1/2">
        <img src={resetpassword} className="w-1/2" alt="" />
      </div>
      <div className="flex justify-center items-center mt-5 w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white px-6 py-12 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4  text-center">
          Reset Password
        </h2>

        <label className="block text-left mb-2 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-emerald-300"
          required
        />

        <label className="block text-left mb-2 font-medium">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring focus:ring-emerald-300"
          required
        />

        <button
          type="submit"
          onClick={()=>sub(email,newPassword)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium"
        >
          Submit
        </button>
      </form>
    </div>
    </div>

    
  );
}
