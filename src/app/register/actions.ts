'use server';

import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function registerUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    return { error: 'User already exists.' };
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.users.create({
    data: {
      email,
      password: hashed,
      name: email.split('@')[0],
    },
  });

  redirect('/login');
}
