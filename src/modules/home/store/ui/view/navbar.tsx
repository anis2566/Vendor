import Image from "next/image";
import Link from "next/link";

import { getStore } from "@/lib/vendor.action";
import { Search } from "../components/search";
import { NavOptions } from "../components/nav-options";

export const Navbar = async () => {
  const store = await getStore();

  return (
    <div className="w-full p-3 border-b border-muted">
      <div className="flex justify-between items-center gap-x-3">
        <Link href={`/store/${store.id}`} className="flex items-center gap-2">
          <Image
            src={store.image}
            alt={store.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-lg font-medium hidden md:block">
            {store.name}
          </span>
        </Link>
        <Search />
        <NavOptions />
      </div>
    </div>
  );
};
