import * as React from "react";
import { Product } from "../../../type.t";
import {
  AspectRatio,
  Typography,
  ModalClose,
  Modal,
  Sheet,
} from "@mui/joy";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}
const ShowImage: React.FC<Props> = ({ open, setOpen, product }) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: 300,
          borderRadius: "md",
          p: 2,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {product.name}
        </Typography>

        <AspectRatio
          objectFit="cover"
          ratio={"4/4"}
          sx={{
            borderRadius: "5px",
          }}
        >
          <img src={product.image} alt={product.name} />
        </AspectRatio>
        <Typography
          level="body-xs"
          fontWeight={600}
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          {product.description}
        </Typography>
      </Sheet>
    </Modal>
  );
};
export default ShowImage;
