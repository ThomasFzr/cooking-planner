import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/favorites - Fetch all user's favorite recipes with details
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userEmail = session.user.email;
  const { db } = await connectToDatabase();

  // Find the user
  const user = await db.collection('users').findOne({ email: userEmail });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Fetch all favorited recipe IDs and join with the recipes collection
  const favoritesWithRecipes = await db.collection('favorites').aggregate([
    { $match: { userId: user._id } },
    {
      $lookup: {
        from: 'recipes', // Assuming the recipes collection is named 'recipes'
        localField: 'recipeId', // Field in 'favorites' collection
        foreignField: '_id', // Field in 'recipes' collection
        as: 'recipeDetails', // Name of the new array field to store the recipe details
      },
    },
    {
      $unwind: {
        path: '$recipeDetails', // Unwind the 'recipeDetails' array to flatten the result
        preserveNullAndEmptyArrays: true, // If there is no recipe match, preserve the favorite entry
      },
    },
    {
      $project: {
        _id: 0, // Optionally exclude the MongoDB _id field
        recipe: '$recipeDetails', // Add the recipe details as a field in the result
      },
    },
  ]).toArray();

  if (favoritesWithRecipes.length === 0) {
    return NextResponse.json({ message: 'No favorite recipes found' }, { status: 404 });
  }

  return NextResponse.json(favoritesWithRecipes);
}