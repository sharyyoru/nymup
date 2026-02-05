import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

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

    const filePath = path.join(CONTENT_DIR, `${file}.json`);
    
    // Write the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Content saved successfully' });
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

    const filePath = path.join(CONTENT_DIR, `${file}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}
