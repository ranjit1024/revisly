import Image from "next/image";
import Logo from "../public/revisly.png"
export default function Home() {
  return (
    <div className="flex  bg-zinc-50 font-sans ">
      <header className="px-10 py-5 flex gap-2 justify-center text-black items-center">
        <Image src={Logo}  alt="logo" height={25} width={25} />
        <h1 className="font-medium">Revisly</h1>
      </header>
    </div>
  );
}
