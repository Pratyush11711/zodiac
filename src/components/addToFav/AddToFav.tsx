"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CardMedia } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ProductDetails } from "@/app/helpers/ProductType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Image from "next/image";
import { removeItemFromFav } from "../../../store/favouriteSlice";
import { CartItem } from "../../../store/cartSlice";

export default function AddToFav() {
  const items = useSelector((state: RootState) => state.favourite.items);
  const dispatch = useDispatch();
  const removeFromFav = (product: CartItem) => {
    dispatch(removeItemFromFav(product));
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full p-6">
      <div className="w-full max-w-3xl">
        {items.map((product) => (
          <Box
            key={product.id}
            className="flex items-center w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4"
          >
            <Image
              src={product.image}
              height={100}
              width={100}
              alt={product.title}
              className="rounded-lg object-cover"
            />
            <Box className="flex flex-col justify-between pl-6 w-full">
              <Typography variant="h6" className="text-xl font-semibold text-gray-800">
                {product.title}
              </Typography>
              <Typography className="text-gray-700 mt-2 text-lg">
                Price: ${product.price.toFixed(2)}
              </Typography>
              <Link href={`/product/product-details/${product.id}`}>
                <Typography
                  className="text-blue-600 mt-2 font-medium hover:underline cursor-pointer"
                >
                  View Details
                </Typography>
              </Link>
              <Button
                onClick={() => removeFromFav(product)}
                variant="outlined"
                color="secondary"
                className="mt-4"
              >
                Remove from Favourite
              </Button>
            </Box>
          </Box>
        ))}
      </div>

    </div>
  );
}