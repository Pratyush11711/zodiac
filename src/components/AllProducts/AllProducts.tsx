"use client"
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Box, Grid, Snackbar } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { ProductDetails } from "@/app/helpers/ProductType";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { RootState } from '../../../store/store';
import { addToFav } from '../../../store/favouriteSlice';

// Function defined outside of useEffect
const fetchProducts = async (setData: React.Dispatch<React.SetStateAction<ProductDetails[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    const fetchData = await fetch(`/api/route/allproducts`);
    const jsonData: ProductDetails[] = await fetchData.json();
    setData(jsonData);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setLoading(false);
  }
};

export default function AllProducts() {
  const [data, setData] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const favouriteItems = useSelector((state:RootState)=>state.favourite.items)
  useEffect(() => {
    fetchProducts(setData, setLoading);
  }, []); // Empty dependency array means it runs only once after the initial render

  // Moved hooks to a consistent order
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);


  // Handler that dispatches the product to the cart
  const addToCartHandler = (product: Omit<ProductDetails, "quantity">) => {
  // To check if the function is working
    dispatch(addToCart(product));
    setSnackbarMessage(`${product.title} added to cart!`);

    setSnackbarOpen(true)
  };
  const addToFavHandler =(product:ProductDetails)=>{
    const itemsExist = favouriteItems.some((item)=>item.id===product.id)
    if (itemsExist) {
      setSnackbarMessage(`Already added ${product.title} to favorites!`);
    } else {
      dispatch(addToFav(product));
      setSnackbarMessage(`${product.title} added to favorites!`);
    }
    setSnackbarOpen(true)

  }
  const handleCloseSnackbar =()=>{
    setSnackbarOpen(false)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {data.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia className="flex justify-center items-center w-full h-full p-4">
                <div className="w-[200px] h-[150px] mx-auto flex justify-center items-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    height={100}
                    width={100}
                  />
                </div>
              </CardMedia>
              <CardContent>
                <Link href={`/product/product-details/${product.id}`}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="sm:truncate hover:cursor-pointer hover:underline"
                  >
                    {product.title}
                  </Typography>
                </Link>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Price: ${product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>addToFavHandler(product)}>
                  Favourites <span className="ml-2"><Heart /></span>
                </Button>
                {/* Corrected the onClick to call the handler properly */}
                <Button size="small" onClick={() => addToCartHandler(product)}>
                  Add to cart <span className="ml-2"><ShoppingCart /></span>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
