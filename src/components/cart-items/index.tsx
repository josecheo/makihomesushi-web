import React, { Children } from "react";
import { Product } from "../../../type.t";
import { useCart } from "../../store/cart";
import { getProductFromID } from "../../utils/functions";
import { Box } from "@mui/joy";
import CartItemBody from "./cartItemBody";
interface CartItemsProps {}

const CartItems: React.FC<CartItemsProps> = () => {
  const { cart,removeCart } = useCart((state) => state);

  const removeItemCart = (productId: number) => {
    const filterCart = cart.filter((el) => el.productId !== productId);
    removeCart(filterCart);
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: ".3rem",
      }}
    >
      {Children.toArray(
        cart.map((item) => {
          const product = getProductFromID(item.productId) as Product;
          return (
            <CartItemBody
              {...{
                product,
                item,
                removeItemCart,
              }}
            />
          );
        })
      )}
    </Box>
  );
};

export default CartItems;
