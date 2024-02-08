import { Box, Button, Sheet, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrowBlack.png";
import CartItems from "../../components/cart-items";
import { useCart } from "../../store/cart";
import { buildMessage } from "../../utils/functions";
import React from "react";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useCart((state) => state);

  const total = cart.reduce((acc, el) => acc + el.totalPrice, 0);
  const containerTotal = cart.reduce((acc, el) => acc + el.containerPrice, 0);
  const additionalsTotal = cart.reduce(
    (acc, el) => acc + el.additionalsPrice,
    0
  );
  const subTotal = cart.reduce((acc, el) => acc + el.basePrice, 0);

 
  const handleBackClick = () => {
    navigate(`/`);
  };

  const handleSendOrderClick = () => {
    const message = buildMessage(cart);
    const url = `https://api.whatsapp.com/send?phone=927389072&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 2rem)",
        overflowY: "hidden",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          height: "4rem",
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

      {cart.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            height: "420px",
            overflowY: "auto",
            mt: "1rem",
          }}
        >
          <CartItems />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1rem",
            height: "100%",
          }}
        >
          <React.Fragment>
            <Typography level="body-xs" fontWeight={700}>
              No hay ningun productos para mostrar
            </Typography>

            <Button
              onClick={handleBackClick}
              color="primary"
              variant="outlined"
              fullWidth
              sx={{
                mt: "2rem",
              }}
            >
              Seguir comprando
            </Button>
          </React.Fragment>
        </Box>
      )}

      {cart.length > 0 && (
        <Box>
          <Sheet
            sx={{
              background: "#F5FDF6",
              borderRadius: 10,
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              // gap: ".1rem",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Typography level="body-xs" fontWeight={700}>
              SUBTOTAL:
            </Typography>
            <Typography level="body-xs" fontWeight={400}>
              S/{subTotal.toFixed(2)}
            </Typography>
            <Typography level="body-xs" fontWeight={700}>
              ADICIONALES:
            </Typography>
            <Typography level="body-xs" fontWeight={400}>
              S/{additionalsTotal.toFixed(2)}
            </Typography>

            <Typography level="body-xs" fontWeight={700}>
              ENVASES:
            </Typography>
            <Typography level="body-xs" fontWeight={400}>
              S/{containerTotal.toFixed(2)}
            </Typography>

            <Typography level="body-xs" fontWeight={700}>
              TOTAL A PAGAR:
            </Typography>
            <Typography level="body-sm" fontWeight={700}>
              S/{total.toFixed(2)}
            </Typography>
          </Sheet>

          <Button
            onClick={handleSendOrderClick}
            color="primary"
            fullWidth
            sx={{
              mt: ".4rem",
            }}
          >
            enviar pedido
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
