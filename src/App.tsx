import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ShopDemo from './components/ShopDemo';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F8]">
      <Header />
      <main className="flex-grow">
        <ShopDemo />
      </main>
      <Footer />
    </div>
  );
}

export default App;
