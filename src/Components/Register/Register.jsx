import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { UserContext } from './../../Context/UserContext';
import signup from '../../assets/images/Sign up.svg'


export default function Register() {
  let {userLogin ,setUserLogin} = useContext(UserContext)
  const [APIerorr, setAPIerorr] = useState("")
  const [isLoding, setIsLoding] = useState(false)
  let navigate =useNavigate()

  async function handlRegister(values){
    try{
      setIsLoding(true)
      let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
      setIsLoding(false)
      setAPIerorr("")
      navigate("/")
    if(data.message === "success"){
      localStorage.setItem("userToken", data.token)
      setUserLogin(data.token)
    }
    }
    catch(erorr){
      setAPIerorr(erorr.response.data.message)
      setIsLoding(false)
  } }

  let validationSchema = yup.object().shape({
      name : yup.string().required("Required").min(3,"must be more 3 ").max(10,"must be less 10"),
      email : yup.string().email("not valid email").required("Required"),
      password : yup.string().required("Required").min(6,"must be more 6"),
      rePassword : yup.string().required("Required").oneOf([yup.ref("password")],"password is not matched"),
      phone : yup.string().required("Required").matches(/^01[1025][0-9]{8}$/,"enter phone number")
    })
  
      let formik = useFormik({
        initialValues :{
          name :"",
          email: "",
          password: "",
          rePassword: "",
          phone: "",
        },
        validationSchema ,
        onSubmit:handlRegister,
      })







  return <>
  <div className=' flex items-center mb-5 gap-4'>

  <div className='w-1/2 hidden md:block'>
    <img className='w-full h-[530px]' src={signup} alt="" />
  </div>

  <div className = "w-full md:w-1/2">
    {APIerorr?<h1 className='bg-red-400'>{APIerorr}</h1> :null}
  
    <h1 className=" font-extrabold text-2xl text-gray-700 my-4">Registeration</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-10">
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
            <label htmlFor="name" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            { formik.errors.name&&formik.touched.name ? <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium"> {formik.errors.name }</span> 
            </div> :null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
            <label htmlFor="email" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            { formik.errors.email&&formik.touched.email ? <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium"> {formik.errors.email }</span> 
            </div> :null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
            <label htmlFor="password" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            { formik.errors.password&&formik.touched.password ? <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium"> {formik.errors.password }</span> 
            </div> :null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
            <label htmlFor="rePassword" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
            { formik.errors.rePassword&&formik.touched.rePassword ? <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium"> {formik.errors.rePassword }</span> 
            </div> :null}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
            <label htmlFor="phone" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
            { formik.errors.phone&&formik.touched.phone ? <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium"> {formik.errors.phone }</span> 
            </div> :null}
          </div>
          <div className='flex-col md:flex-row gap-3 items-center'>
              <button type="submit" className="mb-3 text-white bg-emerald-500 hover:emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                {isLoding? <span className="loader"></span>: <span>Register</span>}
              </button>
              <span> do you have an account?<Link to="/login" className='text-emerald-500 font-bold ms-2'>Login Now</Link></span>
          </div>
          
        </form>
  </div>
  </div>
    </>
  
}
