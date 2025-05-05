import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// POST /api/favorite/[id] - Ajouter une recette aux favoris
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const recipeId = params.id; // récupère l'ID de la recette dans l'URL
  const userEmail = session.user.email;

  if (!ObjectId.isValid(recipeId)) {
    return NextResponse.json({ message: 'Invalid recipe ID' }, { status: 400 });
  }

  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ email: userEmail });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Vérifier si la recette est déjà dans les favoris
  const existing = await db.collection('favorites').findOne({
    userId: user._id,
    recipeId: new ObjectId(recipeId),
  });

  if (existing) {
    return NextResponse.json({ message: 'Already favorited' }, { status: 200 });
  }

  // Ajouter la recette aux favoris
  await db.collection('favorites').insertOne({
    userId: user._id,
    recipeId: new ObjectId(recipeId),
    createdAt: new Date(),
  });

  return NextResponse.json({ message: 'Favorite added' }, { status: 201 });
}

// DELETE /api/favorite/[id] - Supprimer une recette des favoris
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const recipeId = params.id; // récupère l'ID de la recette dans l'URL
  const userEmail = session.user.email;

  if (!ObjectId.isValid(recipeId)) {
    return NextResponse.json({ message: 'Invalid recipe ID' }, { status: 400 });
  }

  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ email: userEmail });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Vérifier si la recette est déjà dans les favoris
  const existing = await db.collection('favorites').findOne({
    userId: user._id,
    recipeId: new ObjectId(recipeId),
  });

  if (!existing) {
    return NextResponse.json({ message: 'Not favorited' }, { status: 404 });
  }

  // Supprimer la recette des favoris
  await db.collection('favorites').deleteOne({
    userId: user._id,
    recipeId: new ObjectId(recipeId),
  });

  return NextResponse.json({ message: 'Favorite removed' }, { status: 200 });
}