import React, { useEffect, useState } from "react";
import { Product, SelectedProducts } from "../../../type.t";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/joy";
import AddRemoveButton from "../add-remove-button";

interface Props {
  products: Product[];
  maxProduct: number;
  title: string;
  category: string;
  handleAddProduct: (
    selectedProducts: SelectedProducts[],
    category: string
  ) => void;
}

const AddProduct: React.FC<Props> = ({
  products,
  maxProduct,
  title,
  handleAddProduct,
  category,
}) => {
  const [selected, setSelected] = useState<SelectedProducts[]>([]);
  // const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
  //   []
  // );

  useEffect(() => {
    handleAddProduct(selected, category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const totalSelectedProducts = selected.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const addProduct = (productId: number) => {
    setSelected((prevState) => {
      const newSelected = [...prevState];
      const index = newSelected.findIndex((el) => el.productId === productId);
      if (index !== -1) {
        newSelected[index].amount++;
      } else {
        newSelected.push({ productId, amount: 1 });
      }

      return newSelected;
    });
  };

  const removeProduct = (productId: number) => {
    setSelected((prevState) => {
      const newSelected = [...prevState];
      const index = newSelected.findIndex((el) => el.productId === productId);
      if (index !== -1) {
        if (newSelected[index].amount <= 1) {
          newSelected.splice(index, 1);
        } else {
          newSelected[index].amount--;
        }
      } else {
        return newSelected;
      }

      return newSelected;
    });
  };

  return (
    <React.Fragment>
      <AccordionSummary>
        {category === "adicionales" ? (
          <Typography level="title-md">{`${title}`}</Typography>
        ) : (
          <Typography level="title-md">{`${title} ${totalSelectedProducts}/${maxProduct}`}</Typography>
        )}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          background: "#F5FDF6",
          borderRadius: 10,
        }}
      >
        {products.map((product) => {
          const currentCount =
            selected.find((el) => el.productId === product.id)?.amount || 0;

          return (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: ".56rem 0",
              }}
            >
              <Box>
                <Typography level="body-md">{product.name}</Typography>
                {category === "adicionales" && (
                  <Typography level="body-md">
                    s/{product.price.toFixed(2)}
                  </Typography>
                )}
              </Box>
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
            </Box>
          );
        })}
      </AccordionDetails>
    </React.Fragment>
  );
};

export default AddProduct;
