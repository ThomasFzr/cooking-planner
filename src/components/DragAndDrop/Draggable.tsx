// components/Draggable.tsx
'use client'

import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import Image from "next/image";

type Recipe = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

type DraggableProps = {
  id: string
  recipe: Recipe
}

export const Draggable = ({ id, recipe }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="border p-4 rounded-sm shadow-sm flex flex-col items-center w-64"
    >
      <Image
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold hover:underline">{recipe.title}</h2>
      <p className="text-gray-500">{recipe.description}</p>
    </div>
  )
}