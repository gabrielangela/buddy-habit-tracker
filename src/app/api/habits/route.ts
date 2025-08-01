import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Tambah habit
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, date } = body;

    if (!title || !date) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newHabit = await prisma.habit.create({
      data: {
        title,
        description,
        date: new Date(date),
      },
    });

    return NextResponse.json(newHabit, { status: 201 });
  } catch (error) {
    console.error('Error creating habit:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// GET: Ambil semua habit berdasarkan query ?date=
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ message: 'Date is required' }, { status: 400 });
    }

    const habits = await prisma.habit.findMany({
      where: {
        date: new Date(date),
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(habits);
  } catch (error) {
    console.error('Error fetching habits:', error);
    return NextResponse.json({ message: 'Failed to fetch habits' }, { status: 500 });
  }
}
