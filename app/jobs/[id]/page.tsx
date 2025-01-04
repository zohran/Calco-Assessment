import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Job } from '@/lib/types';

async function getJob(id: string): Promise<Job | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${id}`);
  if (!res.ok) return null;
  const job=await res.json() as Job;
  return job || null;
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96 w-full">
          <Image
            src={job?.imageUrl || ''}
            alt={job?.title}
            fill
            className="object-cover"
            sizes="100vw"
            //  loading="lazy"
            priority
            quality={90}
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
        </div>
      </div>
    </main>
  );
}