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
      console.error(`[Header Scrolling API] Response not ok: ${response.status}`);
      return NextResponse.json(
        { status: 0, message: 'Failed to fetch header scrolling info' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    console.log(`[Header Scrolling API] === FULL RAW RESPONSE ===`);
    console.log(JSON.stringify(data, null, 2));
    console.log(`[Header Scrolling API] Response status:`, data.status);
    console.log(`[Header Scrolling API] Data items count:`, data.data?.length || 0);
    if (data.data && data.data[0]) {
      console.log(`[Header Scrolling API] First item c_1 type:`, typeof data.data[0].c_1);
      console.log(`[Header Scrolling API] First item c_1 value:`, data.data[0].c_1);
      console.log(`[Header Scrolling API] First item c_1 length:`, data.data[0].c_1?.length || 0);
      console.log(`[Header Scrolling API] Full first item:`, JSON.stringify(data.data[0], null, 2));
      console.log(`[Header Scrolling API] All items c_1 values:`, data.data.map((item: any) => item.c_1));
    }
    
    // Set no-cache headers
    const responseHeaders = new Headers();
    responseHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    responseHeaders.set('Pragma', 'no-cache');
    responseHeaders.set('Expires', '0');
    
    return NextResponse.json(data, { headers: responseHeaders });
  } catch (error) {
    console.error('[Header Scrolling API] Error:', error);
    return NextResponse.json(
      { status: 0, message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}
