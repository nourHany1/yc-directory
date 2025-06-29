import React from "react";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white font-work-sans shadow-sm ">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden curser-pointer" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="max-sm:hidden">
                  Logout
                </button>
                <LogOut className="size-6 sm:hidden curser-pointer" />
              </form>
              <Link href={`/user/${session.id}`}>
                {/* <span>{session?.user?.name}</span> */}
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ""} alt="profile" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <Button type="submit" className="hover:text-white">
                Login
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
