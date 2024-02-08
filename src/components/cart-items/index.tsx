import React from "react";
import { Product } from "../../../type.t";
import { useCart } from "../../store/cart";
import { getProductFromID } from "../../utils/functions";
import { Box } from "@mui/joy";
import CartItemBody from "./cartItemBody";
interface CartItemsProps {}

const CartItems: React.FC<CartItemsProps> = () => {
  const { cart, removeCart } = useCart((state) => state);

  const removeItemCart = (idCart: string) => {
    const filterCart = cart.filter((el) => el.idCart !== idCart);
    removeCart(filterCart);
  };

  return (
    <Box>
      {cart.map((item) => {
        const product = getProductFromID(item.productId) as Product;
        return (
          <React.Fragment key={item.idCart}>
            <CartItemBody
              {...{
                product,
                item,
                removeItemCart,
              }}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default CartItems;
