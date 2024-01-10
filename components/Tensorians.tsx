'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Tensorians: React.FC = () => {
  const [buyNowPrice, setBuyNowPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('/api/tensor');
        const data = await response.json();
        setBuyNowPrice(data.data.instrumentTV2.statsV2.buyNowPrice / 1000000000);
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    fetchPrice();
  }, []);

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <Image src="/1580.png" alt="Tensorian #1580" width={400} height={400} objectFit="cover" className="hover:scale-105 transition-transform duration-300 ease-in-out" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tensorians</h2>
        {buyNowPrice ? (
          <p className="text-xl font-semibold text-gray-700">Buy Now Price: <span className="text-green-600">{buyNowPrice} SOL</span></p>
        ) : (
          <p className="text-xl font-semibold text-gray-700">loading price...</p>
        )}
        <Link href="https://www.tensor.trade/trade/tensorians">
          <p className="text-xl text-blue-500 hover:underline cursor-pointer">View Collection on Tensor.Trade</p>
        </Link>
      </div>
    </div>
  );
};

export default Tensorians;
