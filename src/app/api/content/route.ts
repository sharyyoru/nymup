import { NextRequest, NextResponse } from 'next/server';
import { put, head } from '@vercel/blob';

const VALID_FILES = ['home', 'about', 'investments', 'site', 'pages', 'team'];

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

    // Save to Vercel Blob storage
    const blob = await put(`content/${file}.json`, JSON.stringify(data, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true, message: 'Content saved successfully', url: blob.url });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
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

    // Try to get from Vercel Blob
    const blobUrl = `${process.env.BLOB_URL || ''}/content/${file}.json`;
    
    try {
      const response = await fetch(blobUrl);
      if (response.ok) {
        const content = await response.json();
        return NextResponse.json(content);
      }
    } catch {
      // Fall through to return error
    }

    return NextResponse.json(
      { error: 'Content not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}
