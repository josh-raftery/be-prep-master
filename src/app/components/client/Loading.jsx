'use client'
import React from 'react';
import animationData from '../../../../public/loading-animation.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Loading() {
  return (
    // <h1>loading...</h1>
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

