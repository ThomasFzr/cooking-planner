// components/DragAndDrop.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { DndContext } from '@dnd-kit/core'
import RecipeList from './RecipeList'
import DroppedRecipes from './DroppedRecipes'

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function DragAndDrop() {
  const [isClient, setIsClient] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [droppedRecipes, setDroppedRecipes] = useState<Recipe[]>([]) // State for dropped recipes
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes')
        if (!res.ok) throw new Error('Failed to fetch recipes')
        const data = await res.json()
        setRecipes(data)
      } catch (err: any) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  const handleDragEnd = (event: any) => {
    const droppedRecipe = recipes.find(recipe => recipe._id === event.active.id)
    if (droppedRecipe) {
      // Add the dropped recipe to the droppedRecipes state
      setDroppedRecipes((prev) => [...prev, droppedRecipe])
    }
  }

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>

  // Ensure that the drag and drop is rendered only on the client-side
  if (!isClient) return null

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex justify-between gap-10 mt-20">
        {/* Left Area: Recipe List */}
        <RecipeList recipes={recipes} droppedRecipes={droppedRecipes} />

        {/* Right Area: Droppable Zone */}
        <DroppedRecipes droppedRecipes={droppedRecipes} />
      </div>
    </DndContext>
  )
}