'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Job } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job: initialJob }: JobCardProps) {
  const [job, setJob] = useState(initialJob);

  useEffect(() => {
    if (job.status !== 'completed' && job.status !== 'failed') {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/jobs/${job.id}`);
          if (!res.ok) throw new Error('Failed to fetch job');
          const updatedJob = await res.json();
          setJob(updatedJob);

          if (updatedJob.status === 'completed' || updatedJob.status === 'failed') {
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Error polling job:', error);
        }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [job.id, job.status]);

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48 w-full bg-gray-100">
          {job.status === 'completed' && job.imageUrl ? (
            <Image
              src={job.imageUrl}
              alt={job.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={75}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {job.status === 'failed' ? (
                <p className="text-red-500">Failed to load image</p>
              ) : (
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              )}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-1">Status: {job.status}</p>
        </div>
      </div>
    </Link>
  );
}