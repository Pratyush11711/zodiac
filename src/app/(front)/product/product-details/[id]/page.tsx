import { ProductDetails } from '@/app/helpers/ProductType';
import RelatedProducts from '@/components/RelatedProduct/RelatedProduct';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default async function SingleProduct({ params }: { params: { id: string } }) {
  const { id } = await params; // No need to await params as it's already resolved

  const data = await fetch(`${process.env.NEXT_URL}/api/route/singleproduct?id=${id}`);
  const res = await data.json();

  return (
    <>
      <Box className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-6 md:space-x-10 p-8 bg-gray-50 h-[100vh]">
        <Box className="w-full md:w-1/2 flex justify-center">
          <Image src={res.image} height={200} width={200} alt="Product Image" className="rounded-lg object-cover" />
        </Box>
        <Box className="w-full md:w-1/2 space-y-6">
          <Typography variant="h4" className="text-gray-800 font-semibold">
            {res.title}
          </Typography>
          <Typography variant="h4" className="text-gray-800 ">
            <span>$</span>{res.price}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            {res.description}
          </Typography>
          <Box className="flex space-x-4 mt-4">
            <Button variant="contained" color="primary" startIcon={<ShoppingCart />}>
              Add to Cart
            </Button>
            <Button variant="outlined" color="secondary" startIcon={<Heart />}>
              Add to Favourites
            </Button>
          </Box>
        </Box>
      </Box>
      <RelatedProducts />
    </>
  );
}
