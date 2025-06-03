import { Copy, StoreIcon } from "lucide-react";
import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";

import { Store } from "@/generated/prisma";

interface Props {
  store: Store;
}

export const ShopInfo = ({ store }: Props) => {
  const appUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL;
  return (
    <div className="w-full bg-muted p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <StoreIcon className="w-5 h-5 text-gray-500" />
            {store.name}
          </h3>
          <CopyButton text={store.name} />
        </div>
        <Button asChild>
          <Link target="_blank" href={`${appUrl}/store/${store.id}`}>
            Visit
          </Link>
        </Button>
      </div>
    </div>
  );
};
