import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function UpdatePassword() {
  const [formError, setFormError] = useState(null);
  const [submitLoading, setsubmitLoading] = useState(null);
  const navy=useNavigate();

  async function submitForm(values) {    
    setsubmitLoading(true);
    setFormError(null);
    let option = {
      method: "PUt",
      url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      data: values,
    };
    let idToast = toast.loading("Loading...");
    axios
      .request(option)
      .then((res) => {
        if (res.statusText === "OK") {
          toast.success("Update Password Successfully");
          setTimeout(() => {
            navy("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setFormError(err.response.data.message);
      })
      .finally(() => {
        toast.dismiss(idToast);
        setsubmitLoading(false);
      });
  }

  let validateForm = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
      newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must have Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: submitForm,
    validationSchema: validateForm
  });

  return (
    <>
    <Helmet>
      <title>Update Password</title>
    </Helmet>
    <section className='UpdatePassword pb-8' id='UpdatePassword'>
      <h1 className='text-2xl font-bold text-black text-center relative w-fit mx-auto pb-2 after:absolute after:left-1/2 after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300 after:bottom-0 after:w-1/2 after:h-1 after:bg-primary-500'>Update Password</h1>
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

          <div className="input-password mt-2">
            <label htmlFor="password" className="block text-gray-600">
            NewPassword :
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              id="newPassword"
              className="my-form-control"
              placeholder="Enter Your NewPassword"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-500 my-1">*{formik.errors.newPassword}</div>
            ) : null}
          </div>

          {formError && <div className="text-red-500 mt-2">*{formError}</div>}

          <button type='submit' disabled={submitLoading} className='btn cursor-pointer w-fit mt-4'>
            verify
          </button>
      </form>
    </section>
    </>
  )
}
