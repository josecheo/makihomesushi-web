import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { Product } from "../../../type.t";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

const OverflowCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <Card
      onClick={handleClick}
      variant="outlined"
      sx={{
        width: "300px",
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={product.image} loading="lazy" alt={product.name} />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{product.name}</Typography>
        <Typography level="body-sm">{product.description}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "#FFF" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <FavoriteBorderIcon />

          <Divider orientation="vertical" />
          <Typography
            level="body-xs"
            fontWeight="md"
            textColor="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <DeliveryDiningIcon />
            20-25 min
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="title-sm"
            fontWeight={700}
            textColor="text.secondary"
          >
            s/{product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};
export default OverflowCard;
