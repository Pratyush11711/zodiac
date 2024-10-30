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
import { CartItem, removeItem } from "../../../store/cartSlice";

export default function AddToCart() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const removeFromCartHandler = (product: CartItem) => {
    dispatch(removeItem(product));
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
              <Typography className="text-gray-700 mt-2 text-lg">
                Quantity: {product.quantity}
              </Typography>
              <Link href={`/product/product-details/${product.id}`}>
                <Typography
                  className="text-blue-600 mt-2 font-medium hover:underline cursor-pointer"
                >
                  View Details
                </Typography>
              </Link>
              <Button
                onClick={() => removeFromCartHandler(product)}
                variant="outlined"
                color="secondary"
                className="mt-4"
              >
                Remove from Cart
              </Button>
            </Box>
          </Box>
        ))}
      </div>
      <TotalPrice />
    </div>
  );
}

const TotalPrice = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
<Box className="w-full max-w-3xl mt-6 p-6 bg-gray-50 rounded-lg text-gray-800 font-semibold text-lg shadow-md flex flex-col items-center space-y-4">
      <Box className="w-full flex justify-between">
        <Typography>Total Quantity: <span>{totalQuantity}</span></Typography>
        <Typography>Total Price: <span>${totalPrice}</span></Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        className="mt-4 w-full max-w-sm"
        style={{ padding: "0.75rem", fontWeight: "bold" }}
      >
        Place Order
      </Button>
    </Box>
  );
};
