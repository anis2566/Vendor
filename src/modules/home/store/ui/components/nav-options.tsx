import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { CartButton } from "./cart";

export const NavOptions = () => {
  return (
    <div className="flex items-center gap-2">
      <CartButton />
      <SignedIn>
        <UserButton fallback="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">Sign In</SignInButton>
      </SignedOut>
    </div>
  );
};
