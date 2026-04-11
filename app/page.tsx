import Image from "next/image";
import Navbar from "./components/ui/header";
import TrustBadge from "./components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center relative bg-gray-50 font-sans text-gray-800 ">
      <div className="relative">
      <Navbar/>
      </div>
      <div className="mt-40">

      <TrustBadge/>
      </div>
      <div className="flex justify-center items-center w-[70%] mt-5">
     <h1 className="text-[3.6rem] font-semibold text-black text-center tracking-tight leading-tight">
  Upload policies. Generate tests.
  <br />
  Measure understanding
</h1>
      </div>
      </div>
  );
}
