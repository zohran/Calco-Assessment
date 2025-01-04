import fs from "fs/promises";
import path from "path";
import { Job, JobStatus } from "./types";

const JOBS_DIR = path.join(process.cwd(), "data", "jobs");

// Ensure directories exist
async function ensureDirectories() {
  await fs.mkdir(JOBS_DIR, { recursive: true });
}

// Get random delay between 5s and 5m
function getRandomDelay(): number {
  const min = 5000; // 5 seconds
  const max = 300000; // 5 minutes
  const step = 5000; // 5 second step
  const steps = Math.floor((max - min) / step);
  return min + Math.floor(Math.random() * steps) * step;
}

export async function createJob(title: string): Promise<string> {
  await ensureDirectories();

  const job: Job = {
    id: Date.now().toString(),
    title,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  await fs.writeFile(
    path.join(JOBS_DIR, `${job.id}.json`),
    JSON.stringify(job)
  );

  // Start processing in background
  processJob(job.id).catch(console.error);

  return job.id;
}

export async function getJob(id: string): Promise<Job | null> {
  try {
    const data = await fs.readFile(path.join(JOBS_DIR, `${id}.json`), "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function getAllJobs(): Promise<Job[]> {
  await ensureDirectories();

  try {
    const files = await fs.readdir(JOBS_DIR);
    const jobs = await Promise.all(
      files.map(async (file) => {
        const data = await fs.readFile(path.join(JOBS_DIR, file), "utf-8");
        return JSON.parse(data);
      })
    );
    return jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

async function updateJobStatus(
  id: string,
  status: JobStatus,
  updates: Partial<Job> = {}
): Promise<void> {
  const job = await getJob(id);
  if (!job) return;

  const updatedJob = {
    ...job,
    ...updates,
    status
  };

  await fs.writeFile(
    path.join(JOBS_DIR, `${id}.json`),
    JSON.stringify(updatedJob)
  );
}

async function processJob(id: string): Promise<void> {
  await updateJobStatus(id, "processing");

  try {
    const delay = getRandomDelay();

    // Simulate random processing time
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Fetch random food image
    const response = await fetch(
      "https://api.unsplash.com/photos/random?query=food&orientation=landscape",
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) throw new Error("Failed to fetch image");

    const data = await response.json();
    const imageUrl = data.urls.raw + "&w=800&h=600&fit=crop";

    await updateJobStatus(id, "completed", { imageUrl });
  } catch (error) {
    await updateJobStatus(id, "failed", {
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
