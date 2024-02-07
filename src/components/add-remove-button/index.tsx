import React from "react";
import { Product } from "../../../type.t";
import { Box, IconButton, Typography } from "@mui/joy";
import { Add, Remove } from "@mui/icons-material";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

interface Props {
  removeProduct: (productId: number) => void;
  maxProduct: number;
  product: Product;
  addProduct: (productId: number) => void;
  totalSelectedProducts: number;
  currentCount: number;
  vertical?: boolean;
  minProduct?: number;
}

const AddRemoveButton: React.FC<Props> = ({
  removeProduct,
  maxProduct,
  product,
  addProduct,
  totalSelectedProducts,
  currentCount,
  vertical,
  minProduct
}) => {
  return (
    <React.Fragment>
      {vertical ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            size="sm"
            onClick={() => addProduct(product.id)}
            disabled={
              !(totalSelectedProducts < maxProduct) ||
              product.category === "Combos"
            }
          >
            <KeyboardArrowUpOutlinedIcon />
          </IconButton>
          <Typography level="body-md">{currentCount || 0}</Typography>
          <IconButton
            size="sm"
            onClick={() => removeProduct(product.id)}
            disabled={currentCount <= (minProduct || 0) || product.category === "Combos"}
          >
            <KeyboardArrowDownOutlinedIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton
            variant="outlined"
            size="sm"
            onClick={() => removeProduct(product.id)}
            disabled={currentCount <= 0}
          >
            <Remove />
          </IconButton>
          <Typography level="body-md">{currentCount || 0}</Typography>
          <IconButton
            variant="outlined"
            size="sm"
            onClick={() => addProduct(product.id)}
            disabled={!(totalSelectedProducts < maxProduct)}
          >
            <Add />
          </IconButton>
        </Box>
      )}
    </React.Fragment>
  );
};

export default AddRemoveButton;
