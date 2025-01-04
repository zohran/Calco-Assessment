'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function CreateJobForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const imageRes = await fetch('/api/unsplash');
      const imageData = await imageRes.json();


      if (!imageData.imageUrl) {
        throw new Error('Failed to get image');
      }

      const formData = new FormData(event?.target as HTMLFormElement);
      const jobData = {
        title: event?.target?.[0]?.value as string ,
        imageUrl: imageData.imageUrl,
      };


      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });


      if (!response.ok) throw new Error('Failed to create job');

      toast.success('Job created successfully!');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('Failed to create job');
    } finally {
      setLoading(false);
    }
  }


  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <Input
          id="title"
          name="title"
          required
          className="mt-1"
          placeholder="e.g. Senior Software Engineer"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating...' : 'Create Job'}
      </Button>
    </form>
  );
}