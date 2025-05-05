'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import RecipeCard from '@/components/RecipeCard/RecipeCard'; // Import the new RecipeCard component

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
  const [favoritedRecipes, setFavoritedRecipes] = useState<Set<string>>(new Set());

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
          const recipeIds: Set<string> = new Set(data.map((favorite: { recipe: { _id: string } }) => favorite.recipe._id));
          console.log(data);
          setFavoritedRecipes(recipeIds);
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

    setFavoritedRecipes((prev) => {
      const updated = new Set(prev);
      if (isFavorited) {
        updated.delete(recipeId);
      } else {
        updated.add(recipeId);
      }
      return updated;
    });

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
      <div className="flex flex-row flex-wrap items-center gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            favoritedRecipes={favoritedRecipes}
            onFavoriteClick={handleFavoriteClick}
          />
        ))}
      </div>
    </div>
  );
}