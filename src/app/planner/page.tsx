'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import RecipeCard from '@/components/RecipeCard/RecipeCard';

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  time: string;
};

const Page = () => {
  const { data: session } = useSession();
  const [favoritedRecipes, setFavoritedRecipes] = useState<Recipe[]>([]);
  const [favoritedRecipesIds, setFavoritedRecipesIds] = useState<Set<string>>(new Set());

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const data = await res.json();
        console.log('data', data);

        const recipeIds: Set<string> = new Set(data.map((favorite: { recipe: { _id: string } }) => favorite.recipe._id));
        setFavoritedRecipesIds(recipeIds);

        const recipesWithDetails = data.map((favorite: { recipe: Recipe }) => favorite.recipe);
        setFavoritedRecipes(recipesWithDetails);

      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Could not load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [session]);


  const handleFavoriteClick = async (recipeId: string) => {
    if (!session) {
      alert('You must be logged in to favorite a recipe');
      return;
    }

    const isFavorited = favoritedRecipes.some(recipe => recipe._id === recipeId);

    try {
      const method = isFavorited ? 'DELETE' : 'POST';
      const res = await fetch(`/api/favorites/${recipeId}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to update favorites');

      // Refresh the favorite list after update
      const updatedRes = await fetch('/api/favorites');
      const updatedData = await updatedRes.json();

      // Ensure updatedData is an array before calling map
      if (Array.isArray(updatedData)) {
        const updatedRecipes = updatedData.map((favorite: { recipe: Recipe }) => favorite.recipe);
        setFavoritedRecipes(updatedRecipes);

        // Update favorited recipes' ids in a set as well
        const updatedRecipeIds = new Set<string>(updatedData.map((favorite: { recipe: { _id: string } }) => favorite.recipe._id));
        setFavoritedRecipesIds(updatedRecipeIds);
      } else {
        // Handle the case where updatedData is not an array (e.g., no favorites left)
        setFavoritedRecipes([]);
        setFavoritedRecipesIds(new Set());
      }

    } catch (err) {
      console.error(err);
      alert('Failed to update recipe favorites');
    }
  };

  return (
    <div className="w-full flex flex-row items-center justify-center">
      {session ?
        <>
          <button onClick={() => signOut()}>Se déco</button>
          {loading && <p>Loading favorites...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && favoritedRecipes.length === 0 && (
            <p className="mt-4 text-gray-500">No favorite recipes found.</p>
          )}

          {favoritedRecipes.map((recipe) => (
            console.log(recipe),
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              favoritedRecipes={favoritedRecipesIds}
              onFavoriteClick={handleFavoriteClick}
            />
          ))}</>
        : <span>Connecter vous pour voir vos favoris</span>}


    </div>
  );
};

export default Page;