import Image from "next/image";
import logo from "../public/image.png"
export default function Page() {
  return (
    <div className='bg-gray-50 min-h-screen flex items-center'>
      <Image src={logo} width={120} height={120} alt="logo"></Image>
    </div>
  );
}