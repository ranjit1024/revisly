import Image from "next/image";
import Navbar from "./components/ui/header";
import TrustBadge from "./components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans text-gray-800 ">
      <Navbar/>
      <TrustBadge/>
      </div>
  );
}
