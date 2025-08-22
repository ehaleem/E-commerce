import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import forget from '../../assets/images/forget.svg'
useNavigate
export default function ForgetPassword() {
  const [showCodeInput, setShowCodeInput] = useState(false);
    const [email, setEmail] = useState('')
    const [code, setCode] = useState(null)
      const [isLoding, setIsLoding] = useState(false)
    let nav = useNavigate()
        async function sendEmail(email){
    setIsLoding(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{email})
        console.log(data);
        setShowCodeInput(true)
    }

    async function sendCode(resetCode){
    setIsLoding(true)
     let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{resetCode})
     console.log(data);
     if (data.status=== "Success"){
        nav ('/resetpassword') 
     }
     
     

  }
  return <>
  <div className="flex items-center bg-gray-50">
    <div className="w-1/2">
      <img className='h-[530px]' src={forget}   alt="" />
    </div>
  
    <div className="w-1/2 flex items-center justify-center  p-4 min-h-screen">
      <form className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-4"
      onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-center text-2xl font-semibold">Forgot Password</h2>

        <p className="text-sm text-gray-600">
          Step 1: Enter your email and click <strong>Send Code</strong>.<br />
          Step 2: Check your email for the code and enter it below, then click <strong>Verify</strong>.
        </p>

        {/* Email Input */}
        <div>
          <label className="block text-sm text-left font-medium mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>

        {!showCodeInput && (
          <button
            type="button"
            onClick={() => sendEmail(email)}
            className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
          >
           {isLoding? <span className="loader"></span>: <span>send</span>}
          </button>
        )}

        {showCodeInput && (
          <>
            <div>
              <label className="block text-sm text-left font-medium mb-2">Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the code you received"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            <button
              type="submit"
              onClick={()=>sendCode(code)}
              className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium"
            >
              Verify
            </button>
          </>
        )}
      </form>
    </div>
    </div>
  </>
}
