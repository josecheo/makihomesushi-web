import React from "react";
import { Input, Box } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

interface InputSearchProps {
  //   onSearch: (query: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = () => {
  return (
    <Box
      sx={{
        padding: "1rem 2rem",
      }}
    >
      <Input
        placeholder="Busca tu sabor preferido"
        startDecorator={<SearchIcon />}
      />
    </Box>
  );
};

export default InputSearch;
