import { Children, useEffect, useState } from "react";
import { Product, ProductSelected } from "../../../type.t";
import { getProductFromID } from "../../utils/functions";
import {
  AspectRatio,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Sheet,
  Typography,
} from "@mui/joy";
import AddRemoveButton from "../add-remove-button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useCart } from "../../store/cart";

interface CartItemBodyProps {
  product: Product;
  item: ProductSelected;
  removeItemCart: (productId: number) => void;
}
const CartItemBody: React.FC<CartItemBodyProps> = ({
  product,
  item,
  removeItemCart,
}) => {
  const [showMore, setShowMore] = useState(false);
  const totalSelectedProducts = 0;
  const { increaseProduct, decreaseProduct, cart } = useCart((state) => state);
  const minProduct = 1;
  const [additionalsPrice, setAdditionalsPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [containerPrice, setContainerPrice] = useState<number>(0);
  
  const removeProduct = (productId: number) => {
    decreaseProduct(productId);
  };
  const addProduct = (productId: number) => {
    increaseProduct(productId);
  };

  useEffect(() => {
    let price = product.price * item.amount;
    const container = product.container * item.amount;
    let additionalsAmount = 0;

    if (item.isMedium) {
      price = price / 2;
    }
    if (item.summary.adicionales) {
      const getAdditionals = item.summary.adicionales.map((value) => {
        const productSummary = getProductFromID(value.productId) as Product;
        return productSummary.price * value.amount;
      });
      additionalsAmount = getAdditionals.reduce((a, b) => a + b, 0);
      price += additionalsAmount;
    }
    price += container;
    setTotalPrice(price);
    setAdditionalsPrice(additionalsAmount);
    setContainerPrice(container);
  }, [item, product.container, product.price, cart]);

  return (
    <Box
      sx={{
        height: showMore ? "100%" : "130px",
        overflow: showMore ? "none" : "hidden",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          padding: ".4rem",
          height: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={2}>
            <AddRemoveButton
              {...{
                removeProduct,
                maxProduct: 10,
                product,
                minProduct,
                addProduct,
                totalSelectedProducts,
                currentCount: item.amount,
                vertical: true,
              }}
            />
          </Grid>

          <Grid xs={8}>
            <Box>
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <AspectRatio
                    objectFit="cover"
                    ratio={"4/4"}
                    maxHeight={75}
                    sx={{
                      borderRadius: "5px",
                    }}
                  >
                    <img src={product.image} alt={product.name} />
                  </AspectRatio>
                </Grid>
                <Grid xs={8}>
                  <Typography level="title-lg" fontWeight={600} fontSize={14}>
                    {product.name.toUpperCase()}
                  </Typography>
                  <Box
                    sx={{
                      width: "130px",
                    }}
                  >
                    <Typography
                      level="body-xs"
                      noWrap={!showMore}
                      fontWeight={600}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                  {showMore && (
                    <Box
                      sx={{
                        gap: ".4rem",
                        display: "flex",
                        flexDirection: "column",
                        mt: ".4rem",
                      }}
                    >
                      {Object.keys(item.summary).length ? (
                        Children.toArray(
                          Object.keys(item.summary).map((key) => {
                            return (
                              <Sheet>
                                {item.summary[key].length > 0 && (
                                  <Typography level="body-xs" fontWeight={700}>
                                    {key.toUpperCase()}
                                  </Typography>
                                )}
                                {Children.toArray(
                                  item.summary[key].map((value) => {
                                    const productSummary = getProductFromID(
                                      value.productId
                                    ) as Product;
                                    if (productSummary) {
                                      return (
                                        <Typography
                                          level="body-xs"
                                          fontWeight={400}
                                        >
                                          {`x${value.amount} ${productSummary.name}`}
                                        </Typography>
                                      );
                                    }
                                  })
                                )}
                              </Sheet>
                            );
                          })
                        )
                      ) : (
                        <Typography
                          level="body-xs"
                          fontWeight={400}
                          fontSize={10}
                        >
                          Sin nada adicional
                        </Typography>
                      )}
                      <Divider
                        sx={{
                          mt: ".4rem",
                          mb: ".4rem",
                        }}
                      />
                      <Box>
                        <Typography
                          level="body-xs"
                          fontWeight={700}
                          sx={{ p: 0 }}
                        >
                          PRECIO DE COMBO:
                        </Typography>
                        <Typography level="body-xs" fontWeight={400}>
                          S/{product.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography level="body-xs" fontWeight={700}>
                          ADICIONALES:
                        </Typography>
                        <Typography level="body-xs" fontWeight={400}>
                          S/{additionalsPrice.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography level="body-xs" fontWeight={700}>
                          ENVASES:
                        </Typography>
                        <Typography
                          level="body-xs"
                          fontWeight={400}
                          sx={{ p: 0 }}
                        >
                          S/{containerPrice.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Chip
                    color="primary"
                    onClick={() => setShowMore(!showMore)}
                    sx={{
                      "--Chip-radius": "8px",
                      fontSize: "10px",
                      mb: ".4rem",
                      mt: ".4rem",
                    }}
                  >
                    {showMore ? "VER MENOS" : "VER MAS"}
                  </Chip>
                  <Typography
                    level="body-xs"
                    fontWeight={700}
                    fontSize={16}
                    sx={{ color: "#37D150" }}
                  >
                    S/{totalPrice.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={2}>
            <IconButton size="sm" onClick={() => removeItemCart(product.id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider
          sx={{
            mt: ".4rem",
            mb: ".4rem",
          }}
        />
      </Box>
    </Box>
  );
};

export default CartItemBody;
