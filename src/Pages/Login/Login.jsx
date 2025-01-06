import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { tokenContext } from "../../Components/Context/TokenContext/Token.Context";
import { Helmet } from "react-helmet";
// import loginImage from "../../assets/images/Woman Shopping Online.json";
import AnimatedSVG from "../../Components/svgComp/AnimatedSVG";
import animationData from '../../assets/images/signup.json';


export default function Login() {
  const [formError, setFormError] = useState(null);
  const [submitLoading, setsubmitLoading] = useState(null);
  const { token, setToken } = useContext(tokenContext);  
  const navy = useNavigate();

  async function submitForm(values) {
    setsubmitLoading(true);
    setFormError(null);
    let option = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      data: values,
    };
    let idToast = toast.loading("Loading...");
    axios
      .request(option)
      .then((res) => {
        if (res.data.message === "success") {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Login Successfully");
          setTimeout(() => {
            navy("/");
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
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must have Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: validateForm
  });

  return (
    <>
    <Helmet>
      <title>Login</title>
      <meta name="description" content="Login" />
    </Helmet>
      <div className="regitser mx-auto pt-6 pb-10">
        <h1 className="text-3xl font-bold text-primary-500 text-center mb-5">
          Login Now <i className="fa-regular fa-circle-user ml-2"></i>
        </h1>

        <div className="flex md:w-5/6 mx-auto justify-center items-center gap-8 flex-col md:flex-row">
        <div className="image md:w-1/2">
          <AnimatedSVG animationData={animationData} />
        </div>
        <form action="" onSubmit={formik.handleSubmit} className="form w-full md:w-1/2">
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

          {formError && <div className="text-red-500 mt-2">*{formError}</div>}

            <div className="divider mt-6 flex justify-between items-center">

            
          <button
            type="submit"
            disabled={submitLoading || !formik.isValid}
            className={`btn w-[150px]  `}
          >
            {submitLoading ? (
              <i className="fa fa-spinner fa-pulse"></i>
            ) : (
              "Login"
            )}
          </button>

          <Link to={"/forgetpassword"}  className="hover:text-primary-500 ml-2 w-fit block relative transition-all after:transition-all after:duration-300  duration-300 hover:after:w-full after:absolute after:w-0 after:h-1 after:bg-primary-400 after:-bottom-2 after:left-0">
            <h5>Forgtten Password?</h5>
          </Link >

            </div>

          

        </form>
        
        </div>
        
      </div>
    </>
  );
}
