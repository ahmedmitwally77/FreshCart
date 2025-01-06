import { useState } from "react";
// import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import AnimatedSVG from "../../Components/svgComp/AnimatedSVG";
import animationData from '../../assets/images/Woman Shopping Online.json';


export default function Register() {
  const [formError, setFormError] = useState(null);
  const [submitLoading, setsubmitLoading] = useState(null);

  const navy = useNavigate();


  async function submitForm(values) {

    setsubmitLoading(true);
    setFormError(null);
    let option = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data: values,
    };
    let idToast=toast.loading("Loading...");
    axios.request(option)
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Register Successfully");
            navy("/login");
        }
      })
      .catch((err) => {
        setFormError(err.response.data.message);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        toast.dismiss(idToast);
        setsubmitLoading(false);
      });
  }


  let validateForm = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name must be at most 25 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must have Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Password does not match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(20)?01[0125][0-9]{8}$/, "Phone Must be Egyption Number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },    
    onSubmit: submitForm,
    validationSchema: validateForm,
  });


  return (
    <>
    <Helmet>
      <title>Register</title>
      <meta name="description" content="Register" />
    </Helmet>
      <div className="regitser  mx-auto pt-6 pb-10">
        <h1 className="text-3xl font-bold text-primary-500 text-center mb-5">
          Register Now <i className="fa-regular fa-circle-user ms-2"></i>
        </h1>

      <div className="flex w-full md:w-5/6 mx-auto justify-center items-center gap-8 flex-col md:flex-row ">
      <form action="" onSubmit={formik.handleSubmit} className="md:w-1/2 w-full"> 
          <div className="input-name">
            <label htmlFor="name" className="block text-gray-600">
              Name :
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              value={formik.values.name}
              type="text"
              id="name"
              placeholder="Enter Your Name"
              className="my-form-control"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 my-1">*{formik.errors.name}</div>
            ) : null}
          </div>
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
              Password :
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="password"
              value={formik.values.password}
              id="password"
              className="my-form-control"
              placeholder="Enter Your Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 my-1">*{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="input-rePassword mt-2">
            <label htmlFor="rePassword" className="block text-gray-600">
              rePassword :
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              id="rePassword"
              className="my-form-control"
              placeholder="Enter Your rePassword"
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div className="text-red-500 my-1">
                *{formik.errors.rePassword}
              </div>
            ) : null}
          </div>

          <div className="input-phone mt-2">
            <label htmlFor="phone" className="block text-gray-600">
              Phone :
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="phone"
              name="phone"
              value={formik.values.phone}
              id="phone"
              className="my-form-control"
              placeholder="Enter Your Phone"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 my-1">*{formik.errors.phone}</div>
            ) : null}
          </div>
          {formError && <div className="text-red-500 mt-2">*{formError} </div>}

          <button
            type="submit"
            disabled={submitLoading}
            className={`btn mt-8 `}
          >
            {submitLoading ? (
              <i className="fa fa-spinner fa-pulse"></i>
            ) : (
              "Send"
            )}
          </button>
        </form>
        <div className="image md:w-1/2 w-4/6">
          <AnimatedSVG animationData={animationData} />
        </div>
      </div>

      </div>
    </>
  );
}
