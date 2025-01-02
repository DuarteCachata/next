"use client";

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Card from './card';
import FilterBar from '../../Components/SearchBar/FilterBar';
import Btn from '../../Components/Cart/Btn';
import { Cart } from '../../Components/Cart/Cart';
import { useFilters } from '../../Components/useFilters';
import { Product } from '../models/interfaces';
import { CartItem } from '../models/interfaces';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [name, setName] = useState('');
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<{ 
    totalCost: string; 
    reference: string; 
    message: string;
    error: string;
  }>( {
    totalCost: '',
    reference: '',
    message: '',
    error: '',
  });

  const { filteredData, setCategory, setSortType, search, setSearch } = useFilters(data);

  useEffect(() => {
    document.body.classList.add('bg-gray-50');
    return () => {
      document.body.classList.remove('bg-gray-50');
    };
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePurchase = () => {
    fetch('https://deisishop.pythonanywhere.com/buy/', {
      method: 'POST',
      body: JSON.stringify({
        products: cartItems.map((item) => item.id),
        student: isStudent,
        coupon: coupon,
        name: name,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then((dados) => {
        setPurchaseResult({
          totalCost: dados.totalCost,
          reference: dados.reference,
          message: dados.message,
          error: '',
        });
        setCartItems([]);
        setIsPurchaseModalOpen(false);
      })
      .catch((error) => {
        setPurchaseResult({
          totalCost: '',
          reference: '',
          message: '',
          error: `Erro na compra: ${error.message}`,
        });
      });
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <section className="container mx-auto px-6 py-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Selecione os seus Produtos</h2>
      <FilterBar
        onCategoryChange={setCategory}
        onSortChange={setSortType}
        onSearchChange={setSearch}
        searchValue={search}
      />
      <article className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.map((product) => (
          <Card key={product.id} {...product} addToCart={addToCart} />
        ))}
      </article>

      <Btn
        onOpen={() => setIsCartOpen(true)}
        cartItemCount={cartItems.length}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotal={getTotal}
        handlePurchase={() => setIsPurchaseModalOpen(true)}
      />

      {isPurchaseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-3xl font-semibold mb-6 text-center">Finalizar Compra</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Nome:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Cupom de Desconto:</label>
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="mt-2 p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Sou estudante</label>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setIsPurchaseModalOpen(false)}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-6 rounded-lg"
                >
                  Fechar
                </button>
                <button
                  onClick={handlePurchase}
                  className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-lg"
                >
                  Confirmar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {purchaseResult.reference && (
        <div className="mt-8 p-6 border border-green-200 bg-green-100 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold">Compra Finalizada!</h3>
          <p className="mt-3"><strong>Total:</strong> {purchaseResult.totalCost}€</p>
          <p className="mt-3"><strong>Referência:</strong> {purchaseResult.reference}</p>
          <p className="mt-3 p-4 border border-x-8 border-y-2 text-center border-gray-900 bg-gray-100 rounded-lg shadow-2xl"><strong>{purchaseResult.message}</strong></p>
        </div>
      )}

      {purchaseResult.error && (
        <div className="mt-8 p-6 border border-red-200 bg-red-100 rounded-lg shadow-xl">
          <p className="text-red-600 text-lg">{purchaseResult.error}</p>
        </div>
      )}
    </section>
  );
}
