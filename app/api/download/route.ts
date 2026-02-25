import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File parameter required' }, { status: 400 });
  }

  // Map file names to actual file paths
  const fileMap: Record<string, string> = {
    '5-automations-checklist': '5-automations-checklist.pdf',
  };

  const fileName = fileMap[file];
  if (!fileName) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'public', 'downloads', fileName);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found on server' }, { status: 404 });
  }

  // Track download with GA4 (client-side will handle this)
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}
