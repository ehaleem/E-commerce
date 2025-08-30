
import { useFormik } from 'formik'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'

export default function Checkout() {

    let { checkout, cartID } = useContext(CartContext)

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: () => { handelCheckout(cartID, "http://localhost:5173") }
    })
    async function handelCheckout(cartID, url) {
        let { data } = await checkout(cartID, url, formik.values)
        console.log(data.session.url);
        location.href = data.session.url
    }



    return <>
        <div className="w-full ">
            <h1 className=" font-extrabold text-2xl text-gray-700 my-4">Checkout Now</h1>
            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-10">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
                    <label htmlFor="details" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Details</label>
                    <span className="font-medium"></span>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
                    <label htmlFor="phone" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-emerald-500 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-500 peer" placeholder=" " required />
                    <label htmlFor="city" className="left-4 peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
                </div>
                <button type="submit" className="mb-3  text-white bg-emerald-500 hover:emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-1/2 sm:w-auto px-5 py-2.5 text-center ">Checkout
                </button>

            </form >
        </div >

    </>
}
