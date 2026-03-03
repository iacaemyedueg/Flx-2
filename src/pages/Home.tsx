import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { Categories } from '../components/home/Categories';
import { BestSelling } from '../components/home/BestSelling';
import { MusicBanner } from '../components/home/MusicBanner';
import { ExploreProducts } from '../components/home/ExploreProducts';

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories title="Popular Categories" />
        <Categories title="Browse Categories" variant="browse" />
        <BestSelling />
        <MusicBanner />
        <ExploreProducts />
      </main>
      <Footer />
    </div>
  );
};
