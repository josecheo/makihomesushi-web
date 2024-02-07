import { products } from "../../utils/data.tsx";
import { useParams } from "react-router-dom";
import { Box } from "@mui/joy";
import arrow from "../../assets/arrow.png";
import { useNavigate } from "react-router-dom";
import ProductInfo from "../../components/product-info/index.tsx";
import CartButton from "../../components/cart/index.tsx";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const filteredProducts = products.find(
    (product) => product.id === Number(id)
  );

  const handleBackClick = () => {
    navigate(`/`);
  };
  return filteredProducts ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          flexShrink: 1,
          minHeight: "220px",
          maxHeight: "330px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 10, right: 20, zIndex: 3 }}>
        <CartButton />
        </div>
        <img
          onClick={handleBackClick}
          src={arrow}
          loading="lazy"
          width={25}
          style={{ position: "absolute", top: 90, left: 20, zIndex: 2 }}
          alt={filteredProducts.name}
        />
        <img
          src={filteredProducts.image}
          loading="lazy"
          width={"100%"}
          height={"300px"}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1, objectFit: "cover"}}
          alt={filteredProducts.name}
        />
      </Box>

      <ProductInfo filteredProducts={filteredProducts} />
    </Box>
  ) : (
    <h1>Product not found</h1>
  );
};

export default ProductPage;
