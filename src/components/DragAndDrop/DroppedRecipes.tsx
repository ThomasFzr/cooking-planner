// components/DroppedRecipes.tsx
'use client'

import React from 'react'

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

type DroppedRecipesProps = {
  droppedRecipes: Recipe[]
}

const DroppedRecipes = ({ droppedRecipes }: DroppedRecipesProps) => {
  return (
    <div className="w-1/3 h-80 bg-gray-100 p-4 border-4 border-dashed border-gray-400 flex flex-col items-center justify-center">
      {droppedRecipes.length === 0 ? (
        <p className="text-gray-500">Drag recipes here!</p>
      ) : (
        <div className="flex flex-wrap flex-row justify-center gap-4">
          {droppedRecipes.map((recipe) => (
            <div key={recipe._id} className="border p-4 rounded-sm shadow-sm flex flex-row items-center w-64">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-500">{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DroppedRecipes