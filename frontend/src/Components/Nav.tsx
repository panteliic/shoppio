import { useState } from "react";
import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import cartIcon from "@/assets/shopping_cart.svg";
import userIcon from "@/assets/user-regular.svg";
import userProfileIcon from "@/assets/circle-user-regular.svg";
import searchIcon from "@/assets/search_icon.svg";
import { useProvider } from "@/Context/Provider";

export default function Nav() {
  const provider = useProvider();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  
  return (
    <div className="w-screen p-6 bg-primary m-auto flex flex-col gap-3">
      <div className="container flex m-auto items-center justify-between">
        <div className="text-2xl font-bold text-primary-foreground uppercase tracking-wide">
          <a href="/">Shoppio</a>
        </div>
        <div className=" bg-input hidden items-center rounded-full p-1 md:w-1/3 md:flex xl:w-1/4  ">
          <Input
            className="border-0 ring-0 shadow-none focus:border-0 focus-visible:ring-0 text-sm"
            placeholder="Enter a search term "
          />
          <MagnifyingGlassIcon className=" w-12 cursor-pointer" />
        </div>
        <ul className="flex items-center gap-4 ">
          {provider.user ? (
            <li className="flex items-center gap-2 text-primary-foreground cursor-pointer text-lg">
              <img src={userProfileIcon} alt="profile icon" className="w-6" />
              <p className="hidden md:flex">
                {provider.user.firstname} {provider.user.lastname}
              </p>
            </li>
          ) : (
            <li>
              <a href="/account/login" className="flex items-center gap-2 text-primary-foreground cursor-pointer  text-lg">
                <img src={userIcon} alt="profile icon" className="w-5" />
                <p className="hidden md:flex"> Pijavite se</p>
              </a>
            </li>
          )}
          <li>
            <img
              src={cartIcon}
              alt="cart icon"
              className="w-6 cursor-pointer"
            />
          </li>
          <li
            className="flex md:hidden cursor-pointer  "
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <img
              src={searchIcon}
              alt="cart icon"
              className="w-6 cursor-pointer"
            />
          </li>
        </ul>
      </div>
      {searchOpen && (
        <div className=" container m-auto bg-input flex items-center rounded p-1 md:hidden ">
          <Input
            className="border-0 ring-0 shadow-none focus:border-0 focus-visible:ring-0 text-sm"
            placeholder="Enter a search term "
          />
          <MagnifyingGlassIcon className=" w-12 cursor-pointer" />
        </div>
      )}
    </div>
  );
}
