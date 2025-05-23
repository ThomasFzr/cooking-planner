import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  req: NextRequest
) {
  try {
    const { db } = await connectToDatabase();
    const id = req.nextUrl.pathname.split('/').pop();

    const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(id) });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error(error); 
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}
