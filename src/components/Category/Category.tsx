"use client"
import React, { useState, useEffect } from 'react';
import { Box, Button,Alert , Grid, Card, CardContent, Typography, CircularProgress, CardMedia, CardActions, Snackbar } from '@mui/material';
import { ProductDetails } from '@/app/helpers/ProductType';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { addToFav } from '../../../store/favouriteSlice';
import { RootState } from '../../../store/store';



export default function CategoryProducts() {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>(''); // Default category to be selected dynamically
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Fetch categories from the API on component mount
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/route/allcategory'); // Assuming /api/allcategory returns the array of categories
      const data = await res.json();
      setCategories(data); // Set fetched categories
      setCategory(data[0]); // Set the first category as default
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  // Fetch products for the selected category
 const fetchProducts = async (selectedCategory: string) => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const res = await fetch(`/api/route/specificcategory?category=${selectedCategory}`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    if (category) {
      fetchProducts(category);
    }
  }, [category]);

  const dispatch = useDispatch();
  const favouritems = useSelector((state:RootState)=>state.favourite.items)
  const addToCartHandler = (product: Omit<ProductDetails, "quantity">) => {
    // To check if the function is working
      dispatch(addToCart(product));
      setSnackbarMessage(`${product.title} added to cart!`);
      setSnackbarOpen(true);
      
    };
    const addToFavHandler = (product: ProductDetails) => {
      const itemExists = favouritems.some(item => item.id === product.id);
      
      if (itemExists) {
        setSnackbarMessage(`Already added ${product.title} to favorites!`);
      } else {
        dispatch(addToFav(product));
        setSnackbarMessage(`${product.title} added to favorites!`);
      }
      
      // Open the snackbar in both cases
      setSnackbarOpen(true);
    };
    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };
  return (
    <Box sx={{ padding: 2 }}>
      {/* Display fetched categories as buttons */}
      <Box sx={{ marginBottom: 2 }}>
        {categories.map((cat, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => setCategory(cat)} // Set selected category
            sx={{ mx: 1 }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      <Typography variant="h4" gutterBottom>
        Products in {category}
      </Typography>

      {/* Show loading spinner when data is being fetched */}
      {loading && <CircularProgress />}

      {/* Show error if there is any */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Render products in a grid */}
      <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia className="flex justify-center items-center w-full h-full p-4">
                <div className="w-[200px] h-[150px] mx-auto flex justify-center items-center ">
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
                <Button onClick={()=>addToFavHandler(product)} size="small">
                  Favourites <span className="ml-2"><Heart /></span>
                </Button>
                <Button onClick={()=>addToCartHandler(product)} size="small">
                  Add to cart <span className="ml-2"><ShoppingCart /></span>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
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
