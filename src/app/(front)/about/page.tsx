import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <>
    <Box className='h-[100vh]'>
    <Box
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 lg:p-16 rounded-lg shadow-lg max-w-4xl mx-auto mt-10"
    >
      <Typography
        variant="h3"
        className="text-3xl lg:text-5xl font-extrabold text-center mb-6 lg:mb-8 drop-shadow-md pb-4"
      >
        What is Zodiac?
      </Typography>
      
      <Typography
        variant="h6"
        className="text-lg lg:text-xl text-justify leading-relaxed drop-shadow-sm"
      >
        We connect customers with skilled tailors and designers worldwide to create custom, made-to-order clothing. Users can design their own outfits by selecting garment styles, fabrics, and personalized details, while our AI-powered measurement tool ensures a perfect fit.
      </Typography>
    </Box>
    <Box
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 lg:p-16 rounded-lg shadow-lg max-w-4xl mx-auto mt-10"
    >
      <Typography
        variant="h3"
        className="text-3xl lg:text-5xl font-extrabold text-center mb-6 lg:mb-8 drop-shadow-md pb-4"
      >
        Why Zodiac?
      </Typography>
      
      <Typography
        variant="h6"
        className="text-lg lg:text-xl text-justify leading-relaxed drop-shadow-sm"
      >
      Because it combines my passion for fashion, sustainability, and empowering artisans. In today’s world, consumers crave personalized clothing that fits their body and style, but off-the-rack options often fall short. TailorFit bridges this gap by offering custom-made clothing through a seamless digital platform, allowing users to design unique pieces and support skilled tailors globally.

      </Typography>
    </Box>
    </Box>
    </>
  );
}
