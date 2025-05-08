'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";

type Recipe = {
  _id: string;
  title: string;
  ingredients: string[];
  description: string;
  imageUrl: string;
};

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch recipe');
        const data = await res.json();
        setRecipe(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  if (loading) return <p className="w-full flex flex-col items-center justify-center text-4xl">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!recipe) return <p className="p-4">No recipe found.</p>;

  return (
    <div className='w-full flex flex-col justify-center items-center p-4'>
      <h1 className='text-3xl font-bold mb-4'>{recipe.title}</h1>

      <div className='w-[80%] flex flex-row justify-center items-center p-4'>
        <div className='w-[40%] flex flex-col justify-center items-center p-4'>
          <Image src={recipe.imageUrl} alt={recipe.title} className="max-h-84 object-cover rounded mb-4" />
          <p className="text-gray-700">{recipe.description ?? 'Aucune description disponible.'}</p>
        </div>
        <div className='w-[40%] flex flex-col justify-center items-center p-4'>
          <span className='text-2xl underline text-gray-600'>Ingrédients</span>
          {recipe.ingredients.map((ingredient, index) => (
            <ul key={index} className="flex items-center">
              <li className="text-gray-600">{ingredient}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
