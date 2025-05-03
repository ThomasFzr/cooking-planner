// components/DragAndDrop.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function DragAndDrop() {
  const [isDropped, setIsDropped] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true)
  }, []);

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

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  function handleDragEnd(event: any) {
    if (event.over?.id === 'droppable') {
      setIsDropped(true)
    }
  }

  // Ensure that the drag and drop is rendered only on the client-side
  if (!isClient) return null

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center gap-10 mt-20">
        <Droppable id="droppable" />
        {/* Map over recipes and pass each one to the Draggable component */}
        {recipes.map((recipe) => (
          <Draggable key={recipe._id} id={recipe._id} recipe={recipe} />
        ))}
        {isDropped && <p className="text-green-600 font-semibold">Dropped!</p>}
      </div>
    </DndContext>
  )
}

function Draggable({ id, recipe }: { id: string; recipe: Recipe }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  }

  return (
    <div
      ref={setNodeRef}  // Make the entire card draggable
      {...listeners}
      {...attributes}
      style={style}
      className="border p-4 rounded-sm shadow-sm flex flex-col items-center w-64"
    >
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold">{recipe.title}</h2>
      <p className="text-gray-500">{recipe.description}</p>
    </div>
  )
}

function Droppable({ id }: { id: string }) {
  const { isOver, setNodeRef } = useDroppable({ id })
  const isActive = isOver
  const bgColor = isActive ? 'bg-green-200' : 'bg-gray-200'

  return (
    <div
      ref={setNodeRef}
      className={`w-40 h-40 rounded-xl border-4 border-dashed border-gray-400 flex items-center justify-center ${bgColor}`}
    >
      Drop here
    </div>
  )
}