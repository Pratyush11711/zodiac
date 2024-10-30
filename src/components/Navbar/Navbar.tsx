"use client"
import { Heart, MenuIcon, ShoppingCart, SidebarCloseIcon } from 'lucide-react'
import React, { useState } from 'react'

import SearchBar from '../SearchBar/Search'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center p-6 bg-gray-800 shadow-md">
      <div className="text-white text-lg font-bold">Zodiac</div>
      
      {/* Hamburger Icon for Mobile */}
      <button 
        className="text-white lg:hidden" 
        onClick={toggleMenu}
      >
        {isOpen ? <SidebarCloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </button>

      {/* Navigation Menu */}
      <ul 
        className={`flex-col lg:flex-row gap-6 text-white lg:flex ${
          isOpen ? 'flex' : 'hidden'
        } absolute lg:static top-16 left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent lg:p-0 p-6`}
      >
        <Link href="/">
          <li className="hover:text-blue-400 cursor-pointer">Home</li>
        </Link>
        <Link href="/about">
          <li className="hover:text-blue-400 cursor-pointer">About</li>
        </Link>
        <Link href="/cart">
          <li className="flex items-center hover:text-blue-400 cursor-pointer">
            My Cart <span className="ml-1"><ShoppingCart /></span>
          </li>
        </Link>
        <Link href="/favourites">
          <li className="flex items-center hover:text-blue-400 cursor-pointer">
            Favourites <span className="ml-1"><Heart /></span>
          </li>
        </Link>
      </ul>

      <div className="hidden lg:flex items-center gap-2">
        <Box className="flex items-center">
          <Typography className="text-lg font-semibold text-white p-2">Zodiac</Typography>
          <Image src="/zodiac.jpg" alt="logo" height={40} width={40} className="rounded-full" />
        </Box>
      </div>
    </div>
  );
}