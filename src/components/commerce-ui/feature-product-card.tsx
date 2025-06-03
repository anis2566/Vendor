"use client";

import { Button } from "@/components/ui/button";
import ImageViewer from "./image-viewer";
import PriceFormat from "./price-formater";

const DEFAULT_IMAGE_URL =
  "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/speaker-01.jpg";

interface ProductCard_06Props {
  imageUrl?: string;
  newRelease?: boolean;
  productName?: string;
  description?: string;
  price?: number;
  availableStock?: number;
  releaseDate?: string;
  features?: string[];
  onAddToCart?: () => void;
  onPreOrder?: () => void;
  currencyPrefix?: string;
}

function FeatureProductCard({
  availableStock = 24,
  currencyPrefix = "$",
  description = "Next-generation portable speaker with 360° spatial audio and 24-hour battery life",
  features = [
    "360° Immersive Sound",
    "Waterproof Design",
    "Voice Assistant",
    "Multi-room Sync",
  ],
  imageUrl = DEFAULT_IMAGE_URL,
  newRelease = true,
  onAddToCart = () => {},
  onPreOrder = () => {},
  price = 199.99,
  productName = "SoundSphere Ultra Wireless Speaker",
  releaseDate = "August 15, 2023",
}: ProductCard_06Props = {}) {
  const isLowStock = availableStock <= 25;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md sm:h-[220px] sm:flex-row dark:border-gray-800 dark:bg-gray-900">
      {/* Image section with highlight effect */}
      <div className="relative h-52 w-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 sm:h-full sm:w-2/5 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
        {newRelease && (
          <div className="absolute top-3 left-3 z-10 flex items-center justify-center">
            <div className="animate-pulse-slow rounded-full bg-blue-600 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-md">
              Just Released
            </div>
          </div>
        )}

        {/* Highlight glow effect */}
        <div className="absolute inset-0">
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-300/30 blur-2xl"></div>
          <div className="absolute right-0 -bottom-8 h-28 w-28 rounded-full bg-indigo-400/20 blur-xl"></div>
        </div>

        {/* Image with hover effect */}
        <div className="flex h-full items-center justify-center p-4">
          <div className="transition-all duration-500 group-hover:scale-[1.05] group-hover:-rotate-2">
            <ImageViewer
              imageUrl={imageUrl}
              classNameThumbnailViewer="rounded-lg h-full object-contain drop-shadow-lg max-h-[180px]"
            />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Product name and description */}
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {productName}
              </h3>
              <PriceFormat
                prefix={currencyPrefix}
                value={price}
                className="text-xl font-bold text-blue-600 dark:text-blue-400"
              />
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-end justify-between">
          {/* Action buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onAddToCart}
              className="border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              Add to cart
            </Button>
            <Button
              onClick={onPreOrder}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProductCard;
export type { ProductCard_06Props };
