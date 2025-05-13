"use client";

import { useState } from "react";

export default function Searchbar() {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="p-8">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Rechercher une recette"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:['#5e0787']"
        />
        <img
          src="/images/search.svg"
          alt="Search"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        />
      </div>
    </div>
  );
}