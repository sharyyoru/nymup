import { NextRequest, NextResponse } from 'next/server';
import { put, list, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const VALID_FILES = ['home', 'about', 'investments', 'site', 'pages', 'team'];

// Get static file content as fallback
function getStaticContent(file: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', `${file}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { file, data } = await request.json();

    if (!file || !data) {
      return NextResponse.json(
        { error: 'Missing file or data' },
        { status: 400 }
      );
    }

    if (!VALID_FILES.includes(file)) {
      return NextResponse.json(
        { error: 'Invalid file name' },
        { status: 400 }
      );
    }

    // Delete existing blob with same prefix first (to avoid duplicates)
    try {
      const existingBlobs = await list({ prefix: `content/${file}` });
      for (const blob of existingBlobs.blobs) {
        await del(blob.url);
      }
    } catch (e) {
      // Ignore errors when listing/deleting - might not exist yet
    }

    // Save to Vercel Blob storage
    const blob = await put(`content/${file}.json`, JSON.stringify(data, null, 2), {
      access: 'public',
    });

    return NextResponse.json({ success: true, message: 'Content saved successfully', url: blob.url });
  } catch (error: any) {
    console.error('Error saving content:', error?.message || error);
    return NextResponse.json(
      { error: `Failed to save content: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'Missing file parameter' },
        { status: 400 }
      );
    }

    if (!VALID_FILES.includes(file)) {
      return NextResponse.json(
        { error: 'Invalid file name' },
        { status: 400 }
      );
    }

    // Try to get from Vercel Blob by listing blobs with prefix
    try {
      const blobs = await list({ prefix: `content/${file}` });
      if (blobs.blobs.length > 0) {
        const response = await fetch(blobs.blobs[0].url);
        if (response.ok) {
          const content = await response.json();
          return NextResponse.json(content);
        }
      }
    } catch {
      // Fall through to static fallback
    }

    // Fall back to static file content
    const staticContent = getStaticContent(file);
    if (staticContent) {
      return NextResponse.json(staticContent);
    }

    return NextResponse.json(
      { error: 'Content not found' },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Error reading content:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}
