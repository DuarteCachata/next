"use client";

import React from 'react';
import useSWR from 'swr';
import Card from './card'; 
import { Product } from '../models/interfaces';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);

  if (error) return <div className="text-center text-red-500 mt-8">Erro ao carregar os produtos.</div>;
  if (isLoading) return <div className="text-center text-gray-500 mt-8">Carregando...</div>;
  if (!data) return <div className="text-center text-gray-500 mt-8">Nenhum dado disponível.</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Produtos</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            price={product.price}
            description={product.description}
            image={product.image}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}
