import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
import amazon from "../../assets/images/amazon-pay.png";
import americanExpress from "../../assets/images/American-Express-Color.png";
import masterCard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";
import googlaPlay from "../../assets/images/get-google-play.png";
import apple from "../../assets/images/get-apple-store.png";

export default function Footer() {
  const [first, setfirst] = useState(0);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <footer className="md:py-16 py-6 px-2  bg-slate-100">
        <div className="container"> 
          <h2 className="text-2xl font-semibold mb-3">Get The FreshCart app</h2>
          <p className="mb-2 text-sm text-gray-500">
            We Will Send You A Link, Open It On Your Phone To Download The App..
          </p>
          <div className="form flex justify-between items-center flex-col lg:flex-row">
            <input
              type="email"
              name="email"
              id="emailsend"
              className="my-form-control lg:w-fit grow  lg:mr-4 w-full  "
              placeholder="Enter Your Email Address"
            />
            <button type="submit" className="btn w-fit mt-2">
              Share App Link
            </button>
          </div>

          <div className="payment mt-8 border-t  border-gray-300 border-b py-4 flex flex-col gap-4 lg:flex-row justify-between items-center">
            <div className="first flex items-center gap-3 ">
              <span className="-mt-2 text-sm md:text-base">Payment Partners</span>
              <img src={amazon} alt="" className="md:w-16 w-12 block" />
              <img src={americanExpress} alt="" className="md:w-16 w-12 block" />
              <img src={masterCard} alt="" className="md:w-16 w-12 block" />
              <img src={paypal} alt="" className="md:w-16 w-12 block" />
            </div>

            <div className="second flex items-center gap-3 ">
              <span className=" text-sm md:text-base">Get Deliveries With FreshCart</span>
              <img src={googlaPlay} alt="" className="md:w-16 w-12 block" />
              <img src={apple} alt="" className="md:w-16 w-12 block" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
