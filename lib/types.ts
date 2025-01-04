export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Job {
  id: string;
  title: string;
  status: JobStatus;
  imageUrl?: string;
  createdAt: string;
  error?: string;
}

export interface JobResponse {
  id: string;
  status: JobStatus;
}