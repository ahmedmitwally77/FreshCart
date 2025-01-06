import { useFormik } from "formik";
import  { useContext, useState } from "react";
import * as Yup from "yup";
import { cartContext } from "../../Components/Context/CartContext/Cart.Context";
import { tokenContext } from "../../Components/Context/TokenContext/Token.Context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const [order, setOrder] = useState("cash");
  const { cartData } = useContext(cartContext);
  const { token } = useContext(tokenContext);
  const navigateMe = useNavigate();
  const { getCartDetails } = useContext(cartContext);
  const [loadingCash, setLoadingCash] = useState(false);
  const [loadingOnline, setLoadingOnline] = useState(false);

  // *Cash Order
  function handleCashOrder() {
    setLoadingCash(true);
    setLoadingOnline(true);
    const toastId = toast.loading("We are processing your order...");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartData.cartId}`,
      method: "POST",
      headers: {
        token,
      },
    };

    axios
      .request(options)
      .then(({ data }) => {
        if (data.status === "success") {
          toast.success("Order Placed Successfully");
          getCartDetails();
          setTimeout(() => {
            navigateMe("/allorders");
          }, 1000);
        }
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => {toast.dismiss(toastId) ; setLoadingCash(false);});
  }

  // * Online Payment
  function handleOnlinePayment(values) {
    setLoadingOnline(true);
    setLoadingCash(true);
    const toastId = toast.loading("We are processing your order...");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartData.cartId}?url=${location.origin}`,      
      // because we want to get the url of the current page daynamic
      method: "POST",
      headers: {
        token,
      },
      data: values,
    };

    axios
      .request(options)
      .then(({ data }) => {
        if (data.status === "success") {
          toast.success("You will be redirected to payment page ...");
          getCartDetails();
          setTimeout(() => {
            window.location.href = data.session.url;
          }, 1000);
        }
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => {toast.dismiss(toastId) ; setLoadingOnline(false)});
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema: Yup.object({
      shippingAddress: Yup.object({
        details: Yup.string()
          .required("Required")
          .min(10, "Too Short!")
          .max(100, "Too Long!"),
        city: Yup.string()
          .required("Required")
          .min(3, "Too Short!")
          .max(20, "Too Long!"),
        phone: Yup.string()
          .required("Required")
          .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
      }),
    }),
    onSubmit: (values) => {
      if (order === "cash") {
        handleCashOrder();
      } else {
        handleOnlinePayment(values);
      }
    },
  });

  return (
    <section className="checkout w-3/4 mx-auto">
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Checkout" />
      </Helmet>
      <h1 className="text-3xl mb-3 text-center font-bold text-primary-500">
        Shipping Address
      </h1>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="input-city mt-2">
          <label htmlFor="email" className="block text-gray-600">
            City :
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="shippingAddress.city"
            value={formik.values.shippingAddress.city}
            id="city"
            className="my-form-control"
            placeholder="Enter Your city"
          />
          {formik.touched.shippingAddress?.city &&
          formik.errors.shippingAddress?.city ? (
            <p className="text-red-500 text-sm my-2">
              *{formik.errors.shippingAddress.city}
            </p>
          ) : null}
        </div>
        <div className="input-city mt-2">
          <label htmlFor="email" className="block text-gray-600">
            phone :
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="shippingAddress.phone"
            value={formik.values.shippingAddress.phone}
            id="phone"
            className="my-form-control"
            placeholder="Enter Your phone"
          />
          {formik.touched.shippingAddress?.phone &&
          formik.errors.shippingAddress?.phone ? (
            <p className="text-red-500 text-sm my-2">
              *{formik.errors.shippingAddress.phone}
            </p>
          ) : null}
        </div>
        <div className="input-city mt-2">
          <label htmlFor="email" className="block text-gray-600">
            details :
          </label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="shippingAddress.details"
            value={formik.values.shippingAddress.details}
            id="details"
            className="my-form-control"
            placeholder="Enter Your details"
          ></textarea>
          {formik.touched.shippingAddress?.details &&
          formik.errors.shippingAddress?.details ? (
            <p className="text-red-500 text-sm my-2">
              *{formik.errors.shippingAddress.details}
            </p>
          ) : null}
        </div>
        <button
          onClick={() => setOrder("online")}
          type="submit"
          disabled={loadingOnline}
          className="btn mt-5 w-fit bg-green-700 font-semibold hover:bg-green-600 "
        >
          Online Payment
        </button>
        <button
          onClick={() => setOrder("cash")}
          type="submit"
          disabled={loadingCash}
          className="btn w-fit  mt-5 bg-blue-700 font-semibold ml-2 hover:bg-blue-600"
        >
          Cash Order
        </button>
        
      </form>
    </section>
  );
}
