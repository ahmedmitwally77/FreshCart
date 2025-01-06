import { createContext, useContext, useState } from "react";
import { tokenContext } from "../TokenContext/Token.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(0);

export function CartProvider({ children }) {
  const { token } = useContext(tokenContext);
  let [cartData, setCartData] = useState(null);
  let [addLoading, setAddLoading] = useState(false);

  // * ADD TO CART
  function addToCart({ productId }) {
    setAddLoading(true);
    let idToast = toast.loading("Adding Product...");
    const option = {
      method: "POST",
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      headers: {
        token,
      },
      data: { productId: productId },
    };
    axios
      .request(option)
      .then(({ data }) => {
        if (data.status === "success") {
          toast.success(data.message);
          getCartDetails(); 
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        toast.dismiss(idToast);
        setAddLoading(false);
        return true;
      });
  }

  // * GET CART DETAILS
  function getCartDetails() {
    const option = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      headers: {
        token,
      },
    };

    axios
      .request(option)
      .then(({ data }) => {
        setCartData(data);
      })
      .catch((err) => toast.error(err.response.data.message));
  }

  // * REMOVE SPECIFIC PRODUCT FROM CART
  function removeProduct({ productId }) {
    {
      let idToast = toast.loading("Removing Product...");
      const option = {
        method: "DELETE",
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        headers: {
          token,
        },
      };
      axios
        .request(option)
        .then(({ data }) => {
          if (data.status === "success") {
            toast.success("Product Removed Successfully");
            setCartData(data);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
        .finally(() => {
          toast.dismiss(idToast);
        });
    }
  }

  // * CLEAR CART
  function clearCart() {
    let idToast = toast.loading("Clearing Cart...");
    const option = {
      method: "DELETE",
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      headers: {
        token,
      },
    };
    axios
      .request(option)
      .then(({ data }) => {
        if (data.message === "success") {
          toast.success("Cart Cleared Successfully");
          setCartData({
            numOfCartItems: 0,
          });
        }
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => {
        toast.dismiss(idToast);
      });
  }

  // * UPDATE QUANTITY
  function updateQuantity({ productId, count }) {
    let idToast = toast.loading("Updating Product...");
    const option = {
      method: "PUT",
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      headers: {
        token,
      },
      data: { count: count },
    };

    axios
      .request(option)
      .then(({ data }) => {
        if (data.status === "success") {
          toast.success("Product Updated Successfully");
          setCartData(data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        toast.dismiss(idToast);
      });
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        addLoading,
        cartData,
        getCartDetails,
        removeProduct,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
