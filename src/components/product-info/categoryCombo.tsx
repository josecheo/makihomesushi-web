import { Accordion, AccordionGroup, Box } from "@mui/joy";
import React from "react";
import { Product, SelectedProducts, SummaryProduct } from "../../../type.t";
import { makis, alitas, bebidas, adicionales } from "../../utils/data.tsx";
import AddProduct from "../addProducts/index.tsx";

interface ProductInfoProps {
  filteredProducts: Product;
  handleAddProduct: (
    selectedProducts: SelectedProducts[],
    category: string,
    totalSelectedProducts: number
  ) => void;
  selectedProducts: SummaryProduct;
}

const CategoryCombo: React.FC<ProductInfoProps> = ({
  filteredProducts,
  handleAddProduct,
  selectedProducts,
}) => {
  const { amountSushi, amountWings, amountDrinks } = filteredProducts;
  const [index, setIndex] = React.useState<number | null>(0);

  return (
    <Box
      sx={{
        mt: "1rem",
      }}
    >
      <AccordionGroup disableDivider>
        {amountSushi > 0 && (
          <Accordion
            expanded={index === 0}
            onChange={(_event, expanded) => {
              setIndex(expanded ? 0 : null);
            }}
          >
            <AddProduct
              title={`Sabores de makis`}
              products={makis}
              maxProduct={amountSushi}
              handleAddProduct={handleAddProduct}
              category="makis"
            />
          </Accordion>
        )}
        {amountWings > 0 && (
          <Accordion
            expanded={index === 1}
            onChange={(_event, expanded) => {
              setIndex(expanded ? 1 : null);
            }}
          >
            <AddProduct
              title={`Sabores de alitas`}
              products={alitas}
              maxProduct={amountWings}
              handleAddProduct={handleAddProduct}
              category="alitas"
            />
          </Accordion>
        )}
        {amountDrinks > 0 && (
          <Accordion
            expanded={index === 2}
            onChange={(_event, expanded) => {
              setIndex(expanded ? 2 : null);
            }}
          >
            <AddProduct
              title={`Sabores de bebidas`}
              products={bebidas}
              maxProduct={amountDrinks}
              selectedProducts={selectedProducts}
              handleAddProduct={handleAddProduct}
              category="bebidas"
            />
          </Accordion>
        )}

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

export default CategoryCombo;
