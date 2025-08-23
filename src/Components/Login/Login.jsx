import axios from 'axios'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { UserContext } from '../../Context/UserContext'
import signin from '../../assets/images/Signin.svg'
import { WishListConrext } from '../../Context/WishlistContext'


export default function Login() {

  let {getWishList} = useContext(WishListConrext)
  let {userLogin ,setUserLogin} = useContext(UserContext)
  const [APIerorr, setAPIerorr] = useState("")
  const [isLoding, setIsLoding] = useState(false)
  let navigate =useNavigate()

  async function handlLogin(values){
    try{
      setIsLoding(true)
      let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
      console.log( data);
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
      email : yup.string().email("not valid email").required("Required"),
      password : yup.string().required("Required").min(6,"must be more 6"),
    })
  
      let formik = useFormik({
        initialValues :{
          email: "",
          password: "",
        },
        validationSchema ,
        onSubmit:handlLogin,
      })



  return <>
  <div className='flex items-center gap-4'>
    <div className='w-1/2 hidden md:block'>
    <img className=' h-[530px]' src={signin} alt="" />
    </div>
  
  <div className = "w-full md:w-1/2">
    {APIerorr?<h1 className='bg-red-400'>{APIerorr}</h1> :null}
  
    <h1 className=" font-extrabold text-2xl text-gray-700 my-4">Login Now</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-10">

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
          <div className='flex flex-col md:flex-row gap-3 items-center justify-between'>
            <button type="submit" className="mb-3  text-white bg-emerald-500 hover:emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-1/2 sm:w-auto px-5 py-2.5 text-center ">
              {isLoding? <span className="loader"></span>: <span>Login</span>}
            </button>
              <div > <Link to="/forgetpassword" className='text-emerald-500 font-bold ms-2'>Forget Passward?</Link></div>
          </div>
          <div >Creat an Account ? <Link to="/register" className='text-emerald-500 font-bold ms-2 my-2'>Register Now</Link></div>
          
        </form>
  </div>
  </div>
    </>
  
}
