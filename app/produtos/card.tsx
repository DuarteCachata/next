import React, { useState } from "react";
import { CardProps } from "../models/interfaces";

export default function Card({ addToCart, ...props }: CardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(props);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-transform duration-200 hover:scale-105 flex flex-col p-4 space-y-4">
      <img
        src={props.image}
        alt={props.title}
        className="w-full h-40 object-contain rounded-lg bg-gray-100 transition-transform duration-300 hover:scale-105"
      />
      <h2 className="text-lg font-semibold text-gray-900 truncate">{props.title}</h2>
      <p className="text-sm text-gray-500">{props.category}</p>
      <p className="text-sm text-gray-700 line-clamp-3">{props.description}</p>
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-lg font-bold text-gray-700">{props.price.toFixed(2)}€</span>
        <div className="flex items-center text-sm text-gray-700">
          <span>{props.rating.rate}⭐</span>
          <span className="text-gray-500 ml-2">({props.rating.count})</span>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className={`w-full py-2 mt-4 rounded transition-colors duration-200 
          bg-blue-400 hover:bg-blue-500 text-white`}
      >
        {isAdded ? 'Adicionado' : 'Adicionar ao Carrinho'}
      </button>
    </div>
  );
}

