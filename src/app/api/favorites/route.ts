import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/favorites - Fetch all user's favorite recipes
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

  // Fetch all favorited recipe IDs for the user
  const favorites = await db.collection('favorites').find({ userId: user._id }).toArray();
  const recipeIds = favorites.map(fav => fav.recipeId.toString()); // Convert ObjectId to string

  return NextResponse.json(recipeIds);
}