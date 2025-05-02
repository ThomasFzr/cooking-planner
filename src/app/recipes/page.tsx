'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Recipe = {
  _id: string;
  title: string;
  description: string;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes');
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setRecipes(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="border p-4 rounded shadow-sm">
            <Link href={`/recipes/${recipe._id}`}>
              <h2 className="text-xl font-semibold hover:underline">{recipe.title}</h2>
            </Link>
            <p className="text-gray-600">{recipe.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
