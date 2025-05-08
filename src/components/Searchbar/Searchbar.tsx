"use client";

import { useState } from "react";

export default function Searchbar() {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="p-8">
        <input
          type="text"
          placeholder="Rechercher une recette"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>
  );
}