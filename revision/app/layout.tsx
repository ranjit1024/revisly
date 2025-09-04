import type { Metadata } from "next";
import {  Mona_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "../lib//provider";
import { Provider } from "react-redux";

const inter = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',     // optional
  weight: ['200', '300', '400', '500', '600', '700', '900'], // optional: choose specific weights
  variable: '--font-inter', // optional: use as a CSS variable
});
export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable}  font-mona antialiased text-black bg-gray-100 h-[100%]`}
      >
        

     
        <Providers>
        {children}
        
        </Providers>

      </body>
    </html>
  );
}
