"use client"

import Image from "next/image";
import { useState } from "react";

interface BlurImageProps{
    image: string
    width: number
    height: number
    alt: string
}

export default function BlurImage({ image, width, height, alt }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={image} target="_blank" className="group">
      <div className="aspect-w-1 aspect-h-1 w-fit overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt={alt}
          src={image}
          width={width}
          height={height}
          className={`
              duration-700 ease-in-out group-hover:opacity-75 object-cover 
              ${
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
          onLoadingComplete={() => setLoading(false)}
          loading="lazy"
        />
      </div>
    </a>
  );
}