import logoPage from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../Context/TokenContext/Token.Context";
import { cartContext } from "../Context/CartContext/Cart.Context";
import { wishlistContext } from "../Context/wishlist/wishlist";

export default function Navbar() {
  const { token, logout } = useContext(tokenContext);
  const { cartData, getCartDetails } = useContext(cartContext);
  const { wishlist , getWishlistDetails } = useContext(wishlistContext);
const [toggleList, setToggleList] = useState(false);
  function handleToggleList() {
    setToggleList(!toggleList);
  }

  useEffect(() => {
    if (token) {
      getCartDetails();
      getWishlistDetails();
    }
  }, []);

  return (
    <nav className="Navbar bg-slate-100 py-4 px-2  fixed top-0 left-0 right-0 z-50 ">
      <div className="container flex items-center gap-8">
        <div className="logo">
          <Link to="/">
            <img src={logoPage} className="logo" alt="FreshCart Logo" />
          </Link>
        </div>

        {token && (
          <ul className="navs  gap-4 items-center ml-10 hidden lg:flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allorders"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Orders
              </NavLink>
            </li>
          </ul>
        )}


        {token && (
          <div className="cart-icon ml-auto -mb-2">
            <Link to="/cart">
              <div className="cart-icon-count relative fa-bounce">
                <i className="fa-solid fa-cart-shopping sm:text-2xl text-lg   text-primary-500 relative "></i>
                <div className="count flex items-center justify-center sm:p-3  p-1  absolute text-primary-800 bg-gray-300  rounded-500  w-5  h-5  rounded-full  -top-4  -right-4 duration-300">
                  {cartData === null ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    cartData.numOfCartItems
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}

{token && (
          <div className="heart-icon  mr-10 -mb-2">
            <Link to="/wishlist">
              <div className="heart-icon-count relative fa-beat-fade ">
                <i className="fa-solid fa-heart fa-beat-fade sm:text-2xl text-lg   text-primary-500 relative "></i>
                <div className="count flex items-center justify-center sm:p-3  p-1 absolute text-primary-800 bg-gray-300  rounded-500  w-5  h-5  rounded-full  -top-4  -right-4 duration-300">
                  {wishlist.count >= 0 ? (
                    wishlist.count
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin"></i>

                  )}
                </div>
              </div>
            </Link>
          </div>
        )}

        {token && (
          <ul className="social-icons gap-5 items-center hidden xl:flex">
            <li>
              <a target="_blank" href="https://www.facebook.com">
                <i className="fa-brands fa-facebook hover:text-blue-800 duration-300 transition-colors"></i>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.twitter.com">
                <i className="fa-brands fa-twitter hover:text-blue-500 duration-300 transition-colors"></i>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.instagram.com">
                <i className="fa-brands fa-instagram hover:text-pink-500 duration-300 transition-colors"></i>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.tiktok.com">
                <i className="fa-brands fa-tiktok hover:text-black duration-300 transition-colors"></i>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.linkedin.com">
                <i className="fa-brands fa-linkedin hover:text-blue-500 duration-300 transition-colors"></i>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.youtube.com">
                <i className="fa-brands fa-youtube hover:text-red-500 duration-300 transition-colors"></i>
              </a>
            </li>
          </ul>
        )}

        

        {!token ? (
          <ul
            className={` auth flex gap-4 items-center ${
              !token ? "ml-auto" : ""
            }`}
          >
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-primary-500 duration-300 transition-colors ${
                    isActive ? "text-primary-500 font-semibold" : ""
                  } `
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `hover:text-primary-500 duration-300 transition-colors ${
                    isActive ? "text-primary-500 font-semibold" : ""
                  } 
              `
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        ) : (
          ""
        )}

        {token && 
        <div className="menu-toggle lg:hidden transition-all duration-300">
          <i className="fa-solid fa-bars text-2xl cursor-pointer" onClick={handleToggleList} title="Menu" ></i>
        </div>
      }

        {token ? (
          <div
            className="logout cursor-pointer flex items-center"
            onClick={() => logout()}
          >
            <i
              className="fa-solid fa-right-from-bracket text-xl  hover:text-primary-500 duration-300 transition-colors"
              title="Logout"
            ></i>
          </div>
          
        ) : (
          ""
        )}




      </div>

      {toggleList && token && (<div className="menu-toggle lg:hidden w-full mt-4 mr-1 transition-all duration-300">
          <ul className="navs flex flex-col  w-full gap-4 ml-10 transition-all duration-300 " onClick={handleToggleList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allorders"
                className={({ isActive }) =>
                  `text-gray-500 transition-colors duration-3000 hover:text-primary-500 pb-2 cursor-pointer text-md ${
                    isActive
                      ? "relative font-semibold text-primary-500 after:absolute after:bg-primary-500 after:w-full after:h-[3px] after:bottom-0 after:left-0 after:transition-[width] after:duration-300"
                      : ""
                  } `
                }
              >
                {" "}
                Orders
              </NavLink>
            </li>
          </ul>
        </div>)}

      

    </nav>
  );
}
