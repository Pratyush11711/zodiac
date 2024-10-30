"use client"
import { ProductDetails } from "@/app/helpers/ProductType";
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

export default function RelatedProducts(){
    const[loading,setLoading]= useState(false)
    const[products,setProducts] = useState<ProductDetails[]>([])
    const fetchProducts = async(selectedCategory:string)=>{
        setLoading(true);
        try {
            const res = await fetch(`/api/route/specificcategory?category=${selectedCategory}`)
            const data = await res.json()
            if(res.ok){
                setProducts(data)
            }
            setLoading(false)
            return data
        } catch (error) {
            
        }
    }
    return(
        <>
         {loading && <CircularProgress />}

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
                <Button size="small">
                  Favourites <span className="ml-2"><Heart /></span>
                </Button>
                <Button size="small">
                  Add to cart <span className="ml-2"><ShoppingCart /></span>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
        </>
    )
}