import React from 'react';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container w-[80%] pt-[30px] mt-[55px] mx-auto flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
