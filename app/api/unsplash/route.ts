// app/api/unsplash/route.ts
import { NextResponse } from "next/server";

const UNSPLASH_ACCESS_KEY =
  process.env.UNSPLASH_ACCESS_KEY || "YOUR_UNSPLASH_ACCESS_KEY";

export async function GET(request: Request) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=food&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) throw new Error("Failed to fetch image");

    const data = await response.json();
    const imageUrl = data.urls.raw;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
