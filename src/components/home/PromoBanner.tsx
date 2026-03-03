import React from 'react';
import { Button } from '../common/Button';

export const PromoBanner = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Summer Sale is Here!</h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Get up to 50% off on selected items. Limited time offer.</p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-none">
          Shop the Sale
        </Button>
      </div>
    </section>
  );
};
