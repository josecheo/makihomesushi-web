import React from "react";
import { products } from "../../utils/data.tsx";
import OverflowCard from "../overflowCard/index.tsx";
import { Box } from "@mui/joy";


interface Props {
  category: string;
}

const ProductList: React.FC<Props> = ({ category }) => {
    const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: ".6rem 0",
      }}
    >
      {filteredProducts.map((product) => (
        <OverflowCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductList;
