import React from "react";
import { Badge, Box } from "@mui/joy";
import cartImg from "../../assets/cartIcon.svg";
import { useCart } from "../../store/cart";
import { useNavigate } from "react-router-dom";


const CartButton: React.FC = () => {
  const { cart } = useCart((state) => state);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cart`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#222222",
        borderRadius: "9999999999px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
      }}
      onClick={handleClick}
    >
      <Badge
        badgeContent={cart.length || 0}
        color="danger"
        showZero
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <img
          src={cartImg}
          alt="cart-icon"
          style={{
            padding: "5px",
          }}
        />
      </Badge>
    </Box>
  );
};

export default CartButton;
