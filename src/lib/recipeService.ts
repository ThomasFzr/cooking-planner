// /src/lib/recipeService.ts
import { connectToDB } from "./mongodb";
import Recipe from "@/models/recipe";

export async function getRecipes() {
  await connectToDB();
  return Recipe.find().lean();
}

export async function getRecipeById(id: string) {
  await connectToDB();
  return Recipe.findById(id).lean();
}
