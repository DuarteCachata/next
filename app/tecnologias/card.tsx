import React from "react";
import { Tecnologia } from "../models/interfaces";

export default function Card({
  title,
  image,
  description,
  rating,
}: Tecnologia) {
  return (
    <div className="bg-white border rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 flex flex-col p-4 space-y-4">
      <img
        src={image}
        alt={title}
        className="w-full h-36 object-contain rounded-lg bg-gray-100 hover:scale-105"
      />
      <h2 className="text-lg font-bold truncate">{title}</h2>
      <p className="text-sm line-clamp-3">{description}</p>
      <div className="flex justify-end items-center border-t pt-4">
        <span className="text-sm">{rating}⭐</span>
      </div>
    </div>
  );
}
