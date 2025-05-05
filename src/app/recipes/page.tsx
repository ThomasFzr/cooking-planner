'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  time: string;
};

export default function RecipesPage() {
  const { data: session } = useSession();
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritedRecipes, setFavoritedRecipes] = useState<Set<string>>(new Set()); // Set of recipe IDs that are favorited

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

  useEffect(() => {
    const fetchFavorites = async () => {
      if (session) {
        try {
          const res = await fetch('/api/favorites');
          if (!res.ok) {
            throw new Error(`Failed to fetch favorites: ${res.status} ${res.statusText}`);
          }
          const data = await res.json();
          setFavoritedRecipes(new Set(data)); // Update favorited recipes with the response
        } catch (err: any) {
          console.error("Error fetching favorites:", err);
          alert('Failed to fetch favorites');
        }
      }
    };
  
    fetchFavorites();
  }, [session]);

  const handleFavoriteClick = async (recipeId: string) => {
    if (!session) {
      alert('You must be logged in to favorite a recipe');
      return;
    }

    const isFavorited = favoritedRecipes.has(recipeId);

    // Optimistically update UI
    setFavoritedRecipes((prev) => {
      const updated = new Set(prev);
      if (isFavorited) {
        updated.delete(recipeId);
      } else {
        updated.add(recipeId);
      }
      return updated;
    });

    // Make API call to add/remove the recipe from the user's favorites
    try {
      const method = isFavorited ? 'DELETE' : 'POST';
      const res = await fetch(`/api/favorites/${recipeId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to update favorites');
      }
    } catch (err: any) {
      console.error(err);
      alert('Failed to update recipe favorites');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Découvrir des recettes</h1>
      <div className="flex flex-row flex-wrap gap-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="flex flex-col items-center justify-center border p-4 rounded-2xl shadow-sm h-[400px] w-[250px]">
            <Link href={`/recipes/${recipe._id}`}>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <div className="relative w-full text-center mb-2">
                <h2 className="text-xl font-semibold hover:underline">{recipe.title}</h2>
              </div>
            </Link>
            <div className="text-sm text-gray-500 min-h-[20px]">
              {recipe.time && <span>{recipe.time} minutes</span>}
            </div>

            {/* Heart Button for adding/removing from favorites */}
            <button
              className="right-2 top-2"
              onClick={() => handleFavoriteClick(recipe._id)}
              style={{ color: favoritedRecipes.has(recipe._id) ? 'red' : 'gray' }}
            >
              {favoritedRecipes.has(recipe._id) ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}