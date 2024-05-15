import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";

import React from 'react'

import DashHeader from './components/dashHeader'
import HeaderMobile from "./components/header-mobile-doc";
import SideBar from "./components/Sidebar-doc";
import MarginWidthWrapper from "./components/margin-width-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black ${inter.className}`}>
        <div className="flex">
          <SideBar />
          <main className="flex-1">
            <MarginWidthWrapper>
        <DashHeader />
        <HeaderMobile />
        {children}
        </MarginWidthWrapper>
        </main>
        </div>
        </body>
    </html>
  );
}