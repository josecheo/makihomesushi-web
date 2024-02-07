import React, { useRef } from "react";
import { Box, Sheet } from "@mui/joy";
import { categories } from "../../utils/data.tsx";

interface CategoriesProps {
  setCategory: (item: string) => void;
  category: string;
}

const Categories: React.FC<CategoriesProps> = ({ setCategory, category }) => {
  const categoriesRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: string) => {
    const beforeCategory = categories.findIndex((el) => el.name === category);
    const currentCategory = categories.findIndex((el) => el.name === item);
    if (categoriesRef.current) {
      if (beforeCategory === currentCategory) return;
      if (beforeCategory > currentCategory) {
        categoriesRef.current.scrollLeft -= 170;
      }
      if (beforeCategory < currentCategory) {
        categoriesRef.current.scrollLeft += 110;
      }
    }
    setCategory(item);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        padding: "1rem 0",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollBehavior: "smooth"
      }}
      ref={categoriesRef}
    >
      {categories.map((item) => (
        <Sheet
          variant={category === item.name ? "solid" : "plain"}
          onClick={() => handleItemClick(item.name)}
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
          <img src={item.image} alt={item.name} width={25} />
          <span>{item.name}</span>
        </Sheet>
      ))}
    </Box>
  );
};

export default Categories;
