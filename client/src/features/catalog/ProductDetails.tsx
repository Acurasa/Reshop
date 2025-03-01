import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((p) => p.json())
      .then((p) => setProduct(p))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const productDetails = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity In Stock", value: product.quantityInStock },
  ];

  return (
    <Grid container spacing={6} maxWidth="lg" sx={{ mx: "auto" }} alignItems="center">
      {/* Левая часть с картинкой */}
      <Grid item xs={12} sm={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }} />
      </Grid>

      {/* Правая часть с описанием */}
      <Grid item xs={12} sm={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {(product.price / 100).toFixed(2)}
        </Typography>

        {/* Таблица с деталями */}
        <TableContainer>
          <Table>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Блок с инпутом и кнопкой */}
        <Grid container spacing={2} marginTop={3}>
          <Grid item xs={6}>
            <TextField variant="outlined" type="number" label="Quantity in basket" fullWidth defaultValue={1} />
          </Grid>
          <Grid item xs={6}>
            <Button sx={{ height: "55px" }} color="primary" size="large" variant="contained" fullWidth>
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
