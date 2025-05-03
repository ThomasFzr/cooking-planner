// components/RecipeList.tsx
'use client'

import React from 'react'
import { Draggable } from './Draggable'

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

type RecipeListProps = {
  recipes: Recipe[]
  droppedRecipes: Recipe[]
}

const RecipeList = ({ recipes, droppedRecipes }: RecipeListProps) => {
  return (
    <div className="flex flex-col w-1/3 gap-6">
      {recipes.map((recipe) => (
        !droppedRecipes.some(droppedRecipe => droppedRecipe._id === recipe._id) && (  // Check if the recipe is already dropped
          <Draggable key={recipe._id} id={recipe._id} recipe={recipe} />
        )
      ))}
    </div>
  )
}

export default RecipeList