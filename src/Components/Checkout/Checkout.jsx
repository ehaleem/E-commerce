import React from 'react'

export default function Checkout() {
    return <>
        <div className="w-full ">
            <h1 className=" font-extrabold text-2xl text-gray-700 my-4">Checkout Now</h1>
            <form className="max-w-md mx-auto mt-10">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
                    <label htmlFor="email" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    <span className="font-medium"></span>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
                    <label htmlFor="password" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
                    <label htmlFor="password" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                    <button type="submit" className="mb-3  text-white bg-emerald-500 hover:emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-1/2 sm:w-auto px-5 py-2.5 text-center ">Checkout
                    </button>
                
        </form >
    </div >

    </>
}
