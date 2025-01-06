import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ForgetPassword() {
  const [msg, setmsg] = useState(false);
  const navy=useNavigate();
  const formik=useFormik({
    initialValues:{
      email:""
    },
    onSubmit:handleForgetPassword,  
    validationSchema:Yup.object({
      email:Yup.string().required("Please Enter Your Email").email("Please Enter Valid Email").min(5,"minimum 5 characters").max(50,"maximum 50 characters")
    })
  })

  function handleForgetPassword(values){
    setmsg(true);
    const idToast=toast.loading("Loading...");
    const option={
      method:"POST",
      url:"https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      data:values
    }
    axios.request(option)
    .then((res)=>{
      toast.success(res.data.message);
      
      if(res.data.statusMsg==="success"){
        setTimeout(()=>{
          navy("/verifycode");
        },1000)
      }
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
      setmsg(err.response.data.message);
    }).finally(()=>{
      toast.dismiss(idToast);
      setmsg(false);
    })
  }

  return (
    <section className='forgetpassword pb-8' id='forgetpassword'>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <h1 className='text-2xl font-bold text-black text-center relative w-fit mx-auto pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300 after:bottom-0 after:w-1/2 after:h-1 after:bg-primary-500'>Find Your Account</h1>
      <form action="" onSubmit={formik.handleSubmit}>
      <div className="input-email mt-2">
            <label htmlFor="email" className="block text-gray-600">
              Email :
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              value={formik.values.email}
              id="email"
              className="my-form-control"
              placeholder="Enter Your Email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 my-1">*{formik.errors.email}</div>
            ) : null}
          </div>
          <button type='submit' disabled={msg} className='btn cursor-pointer w-fit mt-4'>
            verify
          </button>
      </form>
    </section>
  )
}
