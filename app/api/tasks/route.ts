import { NextResponse } from 'next/server';

const tasks = [
  { id: '1', text: 'Sample Task 1' },
  { id: '2', text: 'Sample Task 2' },
];

export async function GET() {
  return NextResponse.json(tasks);
}