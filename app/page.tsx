import Link from 'next/link';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Job } from '@/lib/types';

async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const jobs = await getJobs();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <Link href="/jobs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Post a Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No jobs found. Be the first to post a job!
          </p>
        )}
      </div>
    </main>
  );
}