import React from "react";
import { Box, Sheet } from "@mui/joy";
import { categories } from "../../utils/data.tsx";

interface CategoriesProps {
  setCategory: (item: string) => void;
  //   children: ReactNode;
}

const Categories: React.FC<CategoriesProps> = ({ setCategory }) => {
  
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        padding: "1rem 0",
        overflowX: "auto",
         '&::-webkit-scrollbar': {
          display: 'none',
         }
      }}
    >
      {categories.map((item) => (
        <Sheet
          onClick={() => setCategory(item.name)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "44px",
            gap: "10px",
            minWidth: "120px",
            padding: "0 10px",
            borderRadius: "30px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          key={item.id}
        >
          <img src={item.image} alt={item.name} width={25}  />
          <span>{item.name}</span>
        </Sheet>
      ))}
    </Box>
  );
};

export default Categories;
