'use client'
import React from 'react';
import animationData from '../../../../public/loading-animation.json';

import Lottie from "lottie-react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white bg-opacity-80 z-50">
      <Lottie
        autoplay
        loop
        animationData={animationData} // Use animationData instead of src
        style={{ height: '400px', width: '400px' }} // Adjust size as needed
      />
    </div>
  );
}

