'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CreateJobForm from '@/components/CreateJobForm';

export default function CreateJobPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <CreateJobForm />
        </div>
      </div>
    </main>
  );
}