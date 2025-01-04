import { NextResponse } from "next/server";
import { createJob, getAllJobs } from "@/lib/jobQueue";

export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = await getAllJobs();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    }

    const jobId = await createJob(body?.title);
    return NextResponse.json({ id: jobId }, { status: 201 }); // Set status to 201 for resource creation
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
