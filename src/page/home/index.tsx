import React from "react";
import Header from "../../components/header";
import InputSearch from "../../components/inputSearch";
import Categories from "../../components/categories";
import Products from "../../components/products";
import { Box, Typography } from "@mui/joy";

// import "./App.css";

function Home() {
  const [category, setCategory] = React.useState("Combos");

  return (
    <React.Fragment>
      <Header />
      <InputSearch />
      <Box
        sx={{
          padding: "0 2rem",
        }}
      >

        <Categories setCategory={setCategory} />
        <Typography
          level="title-sm"
          fontWeight={700}
          textColor="text.secondary"
        >
          {category}
        </Typography>
        <Products category={category} />
      </Box>
    </React.Fragment>
  );
}

export default Home;
