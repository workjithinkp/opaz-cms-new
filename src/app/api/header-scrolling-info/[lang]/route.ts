import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    const { lang } = await params;
    
    const apiUrl = `https://testweb.adventzeventz.com/api/v1/header-scrolling-info/${lang}`;
    
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': lang,
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: 0, message: 'Failed to fetch header scrolling info' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Set no-cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    responseHeaders.set('Pragma', 'no-cache');
    responseHeaders.set('Expires', '0');
    
    return NextResponse.json(data, { headers: responseHeaders });
  } catch (error) {
   
    return NextResponse.json(
      { status: 0, message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}
