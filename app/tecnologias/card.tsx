import React from "react";
import { Tecnologia } from "../models/interfaces";

export default function Card({
  title,
  image,
  description,
  rating,
}: Tecnologia) {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 flex flex-col">
      <article className="overflow-hidden rounded-t-2xl p-4">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-contain"
        />
      </article>
      <article className="p-4 flex-grow">
        <h2 className="text-lg font-bold text-gray-800">
          {title}
        </h2>
        <p className="text-sm text-gray-700">
          {description}
        </p>
      </article>
      <article className="p-4 border-t border-gray-200 flex justify-between items-center">
        <article className="text-sm text-gray-800 flex items-center">
          {rating}⭐
        </article>
      </article>
    </section>
  );
}
