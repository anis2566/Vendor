"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Search = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center w-full">
      <Input
        type="search"
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-[400px]"
      />
    </form>
  );
};
