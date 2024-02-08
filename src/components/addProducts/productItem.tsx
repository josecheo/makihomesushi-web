import React, { useState } from "react";
import { Product } from "../../../type.t";
import { Grid, IconButton, Typography } from "@mui/joy";
import AddRemoveButton from "../add-remove-button";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import ShowImage from "../show-image";

interface Props {
  product: Product;
  maxProduct: number;
  category: string;
  currentCount: number;
  addProduct: (productId: number) => void;
  removeProduct: (productId: number) => void;
  totalSelectedProducts: number;
}

const ProductItem: React.FC<Props> = ({
  product,
  maxProduct,
  category,
  currentCount,
  addProduct,
  removeProduct,
  totalSelectedProducts,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid
      container
      spacing={2}
      key={product.id}
      sx={{
        alignItems: "center",
        padding: ".3rem 0",
      }}
    >
      <Grid xs={2}>
        <IconButton
          size="sm"
          onClick={() => setOpen(true)}
        >
          <ImageSearchIcon />
        </IconButton>
      </Grid>
      <Grid xs={6}>
        <Typography level="body-md">{product.name}</Typography>
        {category === "adicionales" && (
          <Typography level="body-md">s/{product.price.toFixed(2)}</Typography>
        )}
      </Grid>
      <Grid xs={4}>
        <AddRemoveButton
          {...{
            removeProduct,
            maxProduct,
            product,
            addProduct,
            totalSelectedProducts,
            currentCount,
          }}
        />
      </Grid>
      <ShowImage open={open} setOpen={setOpen} product={product} />
    </Grid>
  );
};

export default ProductItem;
