import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function VerifyCode() {
  const [msg, setmsg] = useState(false);
  const navy=useNavigate();
  const formik=useFormik({
    initialValues:{
      resetCode:""
    },
    onSubmit:handleVerifyCode,  
    validationSchema:Yup.object({
      resetCode:Yup.string().required("Code is required").min(3,"minimum 6 characters").max(6,"maximum 6 characters")
    })
  })

  function handleVerifyCode(values){
    setmsg(true);
    const idToast=toast.loading("Loading...");
    const option={
      method:"POST",
      url:"https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      data:values
    }
    axios.request(option)
    .then((res)=>{
      toast.success("Verify Code Successfully");
      if(res.data.status==="Success"){
        setTimeout(()=>{
          navy("/updatepassword");
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
    <section className='VerifyCode pb-8' id='VerifyCode'>
      <Helmet>
        <title>Verify Code</title>
        <meta name="description" content="Verify Code" />
      </Helmet>
      <h1 className='text-2xl font-bold text-black text-center relative w-fit mx-auto pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300 after:bottom-0 after:w-1/2 after:h-1 after:bg-primary-500'>Verify Code</h1>
      <form action="" onSubmit={formik.handleSubmit}>
      <div className="input-resetCode mt-2">
            <label htmlFor="resetCode" className="block text-gray-600">
              Code   :
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="resetCode"
              value={formik.values.resetCode}
              id="resetCode"
              className="my-form-control"
              placeholder="Enter Code"
            />
            {formik.touched.resetCode && formik.errors.resetCode ? (
              <div className="text-red-500 my-1">*{formik.errors.resetCode}</div>
            ) : null}
          </div>
          <button type='submit' disabled={msg} className='btn cursor-pointer w-fit mt-4'>
            verify
          </button>
      </form>
    </section>
  )
}
