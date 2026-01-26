import {  Mona_Sans } from "next/font/google";
import "./globals.css";


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
        className={`${inter.className} ${inter.variable} no-scrollbar  font-mona antialiased text-black bg-gray-100 h-[100%]`}
      >
        

     
   
        {children}
        


      </body>
    </html>
  );
}