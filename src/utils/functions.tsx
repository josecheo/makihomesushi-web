import { products } from "./data.tsx";

export const getProductFromID = (id: number) => {
  const product = products.find((product) => product.id === Number(id));
  return product;
};
