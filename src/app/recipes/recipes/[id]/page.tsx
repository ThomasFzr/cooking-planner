type Recipe = {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
};

async function getRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recipe');
  }

  return res.json();
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
    </div>
  );
}
