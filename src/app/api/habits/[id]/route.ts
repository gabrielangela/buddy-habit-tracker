import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil habit berdasarkan ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const habitId = Number(params.id);
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!habit) {
      return NextResponse.json({ message: 'Habit not found' }, { status: 404 });
    }

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Error fetching habit:', error);
    return NextResponse.json({ message: 'Failed to fetch habit' }, { status: 500 });
  }
}

// PUT: Update habit
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const habitId = Number(params.id);
    const body = await req.json();
    const { title, description, date } = body;

    if (!title || !date) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const updated = await prisma.habit.update({
      where: { id: habitId },
      data: {
        title,
        description,
        date: new Date(date),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating habit:', error);
    return NextResponse.json({ message: 'Failed to update habit' }, { status: 500 });
  }
}

// DELETE: Hapus habit
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const habitId = Number(params.id);

    await prisma.habit.delete({
      where: { id: habitId },
    });

    return NextResponse.json({ message: 'Habit deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting habit:', error);
    return NextResponse.json({ message: 'Failed to delete habit' }, { status: 500 });
  }
}
