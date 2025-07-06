"use client";
import React from "react";

interface InfiniteCarouselProps {
  images: string[];
  productIds?: number[];
  speed?: number;
}

export default function InfiniteCarousel({
  images,
  productIds = [],
  speed = 60,
}: InfiniteCarouselProps) {
  return (
    <div className="w-full overflow-hidden relative">
      <div
        className="animate-scroll flex gap-6 py-4 px-6"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {images.map((image, index) => (
          <a
            href={`/products/${productIds[index] ?? index + 1}`}
            key={index}
            className="flex-shrink-0"
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="h-40 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </a>
        ))}
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 10s !important;
          }
        }
      `}</style>
    </div>
  );
}
