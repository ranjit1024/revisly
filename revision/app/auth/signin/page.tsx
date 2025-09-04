"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import side from "../../../public/info.png";
import newUser from "@/lib/actions/newUser";

export default function LoginForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      router.push("/revisly/home");
    }
  }, [session, router, status]);
  if (status === "loading") return <Loader />;
  if (!session)
    return (
      <div className="w-full grid grid-cols-[50%_50%] relative">
        <div className="flex w-[100%] h-[100%] relative justify-center items-center bg-center bg-contain flex-col  bg-no-repeat bg-white">
          <Image src={side} alt="images" fill className="object-contain" />
          <div className="flex absolute top-13 bg-white  left-53 items-center gap-2 max-md:ml-2 "></div>
        </div>
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="w-full max-w-lg rounded-2xl p-8 ">
            <h2 className=" mb-6 text-center text-2xl font-semibold">
              Welcome !
            </h2>

            <div className="space-y-4">
              <Button
                onClick={async () =>
                  signIn("google", { callbackUrl: "/revisly/home" })
                  
                }
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover:cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Login with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}
