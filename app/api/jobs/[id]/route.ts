import { NextResponse } from 'next/server';
import { getJob } from '@/lib/jobQueue';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const job = await getJob(params.id);
  
  if (!job) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(job);
}