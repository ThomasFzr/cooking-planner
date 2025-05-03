"use client";

import { useState } from "react";

const items = [
  "Apple",
  "Banana",
  "Orange",
  "Grape",
  "Pineapple",
  "Mango",
  "Strawberry",
];

export default function Searchbar() {
  const [query, setQuery] = useState<string>("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

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