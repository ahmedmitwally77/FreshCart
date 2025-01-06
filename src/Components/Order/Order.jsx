import React from "react";
import { Link } from "react-router-dom";

export default function Order({ myorder }) {

  return (
    <section className="order p-4 border rounded-lg border-gray-300 ">
      <header className="flex justify-between items-center">
        <div className="left">
          <h2 className="text-md text-gray-400">Order ID</h2>
          <h3 className="text-lg font-semibold text-gray-800">#{myorder.id}</h3>
        </div>
        <div className="right">
          {myorder?.isDelivered ? (
            <span className="px-3 py-1  bg-lime-600 rounded-full font-cairo text-white">
              تم التسليم
            </span>
          ) : (
            <span className="px-3 py-1  bg-blue-500 rounded-full font-cairo text-white">
              قيد التوصيل
            </span>
          )}
          {myorder?.isPaid ? (
            <span className="px-3 py-1 mr-2 bg-lime-600 rounded-full font-cairo text-white">
              تم الدفع
            </span>
          ) : (
            <span className="px-3 py-1  mr-2 bg-blue-500 rounded-full font-cairo text-white">
              قيد الدفع
            </span>
          )}
        </div>
      </header>
      <div className="data flex flex-wrap mt-2">
        {myorder.cartItems.map((item) => (
          <div
            key={item._id}
            className="w-1/2 md:w-1/3 lg:w-1/5 p-2 overflow-hidden "
          >
            <div className="border border-gray-300 rounded-lg border-opacity-50">
              <img src={item.product.imageCover} alt="" />
              <div className="text p-3">
                <h3 className="text-lg font-bold text-black line-clamp-1 my-2">
                  <Link to={`/product/${item.product._id}`}>{item.product.title}</Link>
                </h3>
                <div className="count-price flex justify-between items-center">
                  <span className="count ">
                    Count:{" "}
                    <span className="text-primary-800">{item.count}</span>
                  </span>
                  <span className="price font-bold text-primary-500">
                    {item.price} LE
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <h5 className="text-xl font-bold text-gray-800 mt-4">
          Your Total Order Price is:{" "}
          <span className="text-primary-500">
            {" "}
            {myorder.totalOrderPrice} LE
          </span>
        </h5>
      </footer>
    </section>
  );
}
