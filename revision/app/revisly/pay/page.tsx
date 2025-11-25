"use client"
import { Sparkles } from "lucide-react"
export default function Home(){
    const handleBuy = async () => {
    // Your buy logic here
    console.log('Item added to cart');
    await new Promise(resolve => setTimeout(resolve, 1000));
  };
    return <div className="h-[90vh] flex justify-center items-center">
    <div className="w-full  rounded-lg border border-gray-200 bg-white max-md:bg-gray-100 p-6 shadow-md max-md:shadow-none">
      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900">
        Custom Session
      </h3>
      
      {/* Description */}
      <p className="mt-2 text-sm text-gray-600">
        
      </p>
      
      {/* Price */}
      <div className="mt-6 flex items-baseline">
        <span className="text-4xl font-extrabold text-gray-900">₹10</span>
        <span className="ml-2 text-gray-600">/session</span>
      </div>
      
      {/* Features List (Optional) */}
      <ul className="mt-6 space-y-3">
        <li className="flex items-center text-sm text-gray-700">
          <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          2 Months Limit
        </li>
        <li className="flex items-center text-sm text-gray-700">
          <svg className="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Custom pdf upload
        </li>
      </ul>
      
      {/* Buy Now Button */}
      <button className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        Buy Now
      </button>
    </div>
    </div>
}