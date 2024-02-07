import { Box, Button, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrowBlack.png";
import CartItems from "../../components/cart-items";
import { useCart } from "../../store/cart";
import { buildMessage } from "../../utils/functions";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useCart((state) => state);

  console.log(cart);
  const handleBackClick = () => {
    navigate(`/`);
  };

  const handleSendOrderClick = () => {
    const message = buildMessage(cart);
    console.log(message);
    const url = `https://wa.me/${927389072}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          mb: "2rem",
        }}
      >
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
      <Button
        onClick={handleSendOrderClick}
        color="primary"
        fullWidth
        sx={{
          mt: "2rem",
        }}
      >
        enviar pedido
      </Button>
    </Box>
  );
};

export default Cart;
