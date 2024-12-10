"use client";

import React from "react";
import Card from "./card";
import tecnologias from "@/app/data/tecnologias.json";

export default function Page() {
  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 m-8 text-center">Tecnologias</h1>
      <article className="gap-6 grid grid-cols-1 lg:grid-cols-4">
        {tecnologias.map((tec,index) => (
          <Card
            key={index}
            id={index}
            title={tec.title}
            image={tec.image}
            description={tec.description}
            rating={tec.rating}
          />
        ))}
      </article>
      </section>
  );
}