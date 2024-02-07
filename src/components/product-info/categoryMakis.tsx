import {
  Accordion,
  AccordionGroup,
  Box,
  Radio,
  RadioGroup,
  Sheet,
} from "@mui/joy";
import React from "react";
import { Product, ProductSelected, SelectedProducts, SummaryProduct } from "../../../type.t.ts";
import { adicionales } from "../../utils/data.tsx";
import AddProduct from "../addProducts/index.tsx";

interface ProductInfoProps {
  filteredProducts: Product;
  handleAddProduct: (
    selectedProducts: SelectedProducts[],
    category: string
  ) => void;
  selectedProducts: SummaryProduct;
  setProductSelected: React.Dispatch<React.SetStateAction<ProductSelected>>;
}

const CategoryMakis: React.FC<ProductInfoProps> = ({
  // filteredProducts,
  handleAddProduct,
  // selectedProducts,
  setProductSelected,
}) => {
  // const { amountWings, amountDrinks } = filteredProducts;
  const [index, setIndex] = React.useState<number | null>(0);
  // const [isMedium, setIsMedium] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setProductSelected((prevState) => {
      return {
        ...prevState,
        isMedium: value === "full" ? false : true,
      };
    });
  };

  return (
    <Box
      sx={{
        mt: "1rem",
      }}
    >
      <Sheet>
        <RadioGroup
          defaultValue="full"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <Radio value="full" label="1 tabla (10 piezas)" size="sm" />
          <Radio value="medium" label="1/5 tabla (5 piezas)" size="sm" />
        </RadioGroup>
      </Sheet>

      <AccordionGroup disableDivider>
        <Accordion
          expanded={index === 3}
          onChange={(_event, expanded) => {
            setIndex(expanded ? 3 : null);
          }}
        >
          <AddProduct
            title={`Adicionales`}
            products={adicionales}
            maxProduct={1000}
            handleAddProduct={handleAddProduct}
            category="adicionales"
          />
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};

export default CategoryMakis;
