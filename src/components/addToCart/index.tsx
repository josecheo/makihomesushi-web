import { Box, Button, Snackbar } from "@mui/joy";
import React from "react";
import { Product } from "../../../type.t";

interface AddToCartProps {
  item: Product;
  quantity: number;
  onAddToCart: () => void;
  handleValidate: () => boolean;
}

const AddToCart: React.FC<AddToCartProps> = ({
  onAddToCart,
  handleValidate,
}) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClick = () => {
 
    if (handleValidate()) {
      onAddToCart();
      setOpen(true);
      setError(false);
    } else {
      setOpen(true);
      setError(true);
    }
  };

  return (
    <Box>
      <Button sx={{ width: "100%" }} onClick={handleClick}>
        Agregar a carrito
      </Button>

      <Snackbar
        autoHideDuration={2000}
        open={open}
        variant={"soft"}
        color={error ? "danger" : "success"}
        onClose={(_event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
        }}
      >
        {error
          ? "Debe seleccionar los todos los sabores"
          : "Agregado al carrito exitosamente!"}
      </Snackbar>
    </Box>
  );
};

export default AddToCart;
