import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Adjust path as needed

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const recipes = await db.collection('recipes').find({}).toArray();
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}
