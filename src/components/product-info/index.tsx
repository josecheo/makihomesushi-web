import { Box, Divider, Typography } from "@mui/joy";
import React, { useState } from "react";
import { Product, ProductSelected, SelectedProducts } from "../../../type.t";
import CategoryCombo from "./categoryCombo";
import AddToCart from "../addToCart/index.tsx";
import { useCart } from "../../store/cart.tsx";
import CategoryMakis from "./categoryMakis.tsx";
import { getProductFromID } from "../../utils/functions.tsx";

interface ProductInfoProps {
  filteredProducts: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ filteredProducts }) => {
  const { category, description, name, price, id, container } =
    filteredProducts;
  const { addCart } = useCart((state) => state);

  const [productSelected, setProductSelected] = useState<ProductSelected>({
    productId: id,
    amount: 1,
    totalPrice: 0,
    containerPrice: 0,
    additionalsPrice: 0,
    summary: {},
    isMedium: false,
  });

  const handleAddProductToCart = () => {
    let scopePrice = price;
    let additionalsAmount = 0;

    const containerPrice = container * productSelected.amount;
    if (productSelected.summary.adicionales) {
      const getAdditionals = productSelected.summary.adicionales.map(
        (value) => {
          const productSummary = getProductFromID(value.productId) as Product;
          return productSummary.price * value.amount;
        }
      );
      additionalsAmount = getAdditionals.reduce((a, b) => a + b, 0);
      scopePrice += additionalsAmount;
    }
    scopePrice += containerPrice;

    addCart({
      ...productSelected,
      totalPrice: scopePrice,
      containerPrice,
      additionalsPrice: additionalsAmount,
    });

    setProductSelected((prevState) => {
      return {
        ...prevState,
        totalPrice: scopePrice,
        containerPrice,
        additionalsPrice: additionalsAmount,
      };
    });
    // addCart(productSelected);
  };

  const handleAddProduct = (obj: SelectedProducts[], category: string) => {
    setProductSelected((prevState) => {
      return {
        ...prevState,
        summary: {
          ...prevState.summary,
          [category]: obj,
        },
      };
    });
  };

  return (
    <Box
      sx={{
        background: "white",
        flexGrow: 1,
        width: "100%",
        borderTopLeftRadius: "3rem",
        borderTopRightRadius: "3rem",
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          background: "transparent",
        }}
      >
        <Typography level="title-md" fontSize={24}>
          {name}
        </Typography>

        <Typography
          level="body-md"
          fontWeight={600}
          fontSize={18}
          sx={{
            color: "#37D150",
          }}
        >
          s/{" "}
          {productSelected.isMedium ? (price / 2).toFixed(2) : price.toFixed(2)}
        </Typography>

        <Divider
          sx={{
            mt: 1,
            mb: 1,
          }}
        />
        <Typography level="title-md">Descripción</Typography>
        <Typography level="body-sm">{description}</Typography>

        {category === "Combos" && (
          <CategoryCombo
            filteredProducts={filteredProducts}
            handleAddProduct={handleAddProduct}
            selectedProducts={productSelected.summary}
          />
        )}

        {category === "Makis" && (
          <CategoryMakis
            setProductSelected={setProductSelected}
            filteredProducts={filteredProducts}
            handleAddProduct={handleAddProduct}
            selectedProducts={productSelected.summary}
          />
        )}

        <Divider
          sx={{
            mt: "1rem",
            mb: "1rem",
          }}
        />
        <AddToCart
          item={filteredProducts}
          quantity={1}
          onAddToCart={handleAddProductToCart}
        />
      </Box>
    </Box>
  );
};

export default ProductInfo;
