import { Box, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrowBlack.png";
import CartItems from "../../components/cart-items";


const Cart = () => {
  const navigate = useNavigate();

  
  const handleBackClick = () => {
    navigate(`/`);
  };

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      <Box sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        mb: "2rem"
      }}>
      <img
        onClick={handleBackClick}
        src={arrow}
        loading="lazy"
        alt={"back"}
      />
      <Typography level="title-lg" fontWeight={700}>
        Mi Carrito
      </Typography>
      </Box>
      <CartItems />
    </Box>
  );
};

export default Cart;
