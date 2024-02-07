import { Box, Button, Snackbar } from "@mui/joy";
import React from "react";
import { Product } from "../../../type.t";

interface AddToCartProps {
  item: Product;
  quantity: number;
  onAddToCart: (item:Product) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({
  item,
  // quantity,
  onAddToCart,
}) => {
  const [open, setOpen] = React.useState(false);


  const handleClick = () => {
    onAddToCart(item);
    setOpen(true);
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
        color={"success"}
        onClose={(_event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
        }}
      >
        Agregado al carrito exitosamente!
      </Snackbar>
    </Box>
  );
};

export default AddToCart;
