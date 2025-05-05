'use client';

import Link from 'next/link';

type RecipeCardProps = {
  recipe: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    time: string;
  };
  favoritedRecipes: Set<string>;
  onFavoriteClick: (recipeId: string) => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, favoritedRecipes, onFavoriteClick }) => {
  const { _id, title, imageUrl, time } = recipe;

  return (
    <div className="flex flex-col items-center justify-center border p-4 rounded-2xl shadow-sm h-[400px] w-[250px]">
      <Link href={`/recipes/${_id}`} className="w-full h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <div className="relative w-full text-center mb-2">
          <h2 className="text-xl font-semibold hover:underline">{title}</h2>
        </div>
        <div className="text-sm text-gray-500 min-h-[20px]">
          {time && <span>{time} minutes</span>}
        </div>
      </Link>
      <button
        className="right-2 top-2 text-2xl hover:cursor-pointer hover:scale-120 transition-transform duration-200"
        onClick={() => onFavoriteClick(_id)}
        style={{ color: favoritedRecipes.has(_id) ? 'red' : 'gray' }}
      >
        {favoritedRecipes.has(_id) ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default RecipeCard;