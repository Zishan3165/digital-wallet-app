"use client";
import { useMetaMask } from "@/contexts/useMetaMaskContext";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { disconnect } = useMetaMask();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/dashboard"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <WalletIcon className="h-8 w-8" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DWAPP
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isMenuOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="m-auto">
              <Link
                href={"/dashboard"}
                className={`block py-2 px-3 text-white rounded md:p-0 dark:text-white  ${
                  isActiveLink("/dashboard")
                    ? "md:dark:text-blue-500"
                    : "md:dark:text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="m-auto">
              <Link
                href={"/dashboard/about"}
                className={`block py-2 px-3 text-white rounded md:p-0 dark:text-white  ${
                  isActiveLink("/dashboard/about")
                    ? "md:dark:text-blue-500"
                    : "md:dark:text-white"
                }`}
              >
                About
              </Link>
            </li>
            <li className="m-auto">
              <ToggleThemeButton />
            </li>
            <li className="m-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarFallback>
                      <UserIcon />
                    </AvatarFallback>
                    <span className="sr-only">Toggle user menu</span>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => disconnect()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
