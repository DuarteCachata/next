import React from "react";
import { Product } from "../models/interfaces";

export default function Card({
  title,
  category,
  price,
  description,
  image,
  rating,
}: Product) {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-transform duration-200 hover:-translate-y-1 flex flex-col p-4 space-y-4">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-contain rounded-lg bg-gray-100 transition-transform duration-300 hover:scale-105"
      />
      <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
      <p className="text-sm text-gray-500">{category}</p>
      <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-lg font-bold text-gray-700">{price.toFixed(2)}€</span>
        <div className="flex items-center text-sm text-gray-700">
          <span>{rating.rate}⭐</span>
          <span className="text-gray-500 ml-2">({rating.count})</span>
        </div>
      </div>
    </div>
  );
}

