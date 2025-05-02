// /src/app/recipes/[id]/page.tsx
import { getRecipeById } from "@/lib/recipeService";
import { notFound } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};

export default async function RecipeDetailPage({ params }: Params) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
      <p className="mb-4">{recipe.description}</p>

      <h2 className="text-xl font-semibold">Ingredients:</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold">Instructions:</h2>
      <p>{recipe.instructions}</p>
    </main>
  );
}
