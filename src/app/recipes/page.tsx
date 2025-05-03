'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Découvrir des recettes</h1>
      <div className="flex flex-row flex-wrap gap-4">
        {recipes.map((recipe) => (
          <Link key={recipe._id} href={`/recipes/${recipe._id}`}>
            <div className="border p-4 rounded-sm shadow-sm">
              <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 w-64 object-cover rounded mb-4" />
              <h2 className="text-xl font-semibold hover:underline">{recipe.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
