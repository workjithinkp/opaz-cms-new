import { NextRequest, NextResponse } from 'next/server'
import { API_BASE_URL } from '@/lib/api'

type Params = Promise<{ lang: string; slug: string }>

export async function GET(
  request: NextRequest,
  context: { params: Params }
) {
  const { lang, slug } = await context.params

  // Try different endpoint formats
  const endpoints = [
    `${API_BASE_URL}/news-details/${lang}/${slug}`
  ]

  for (const url of endpoints) {
    try {
      const upstream = await fetch(url, { 
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        }
      })

      if (upstream.ok) {
        const data = await upstream.json()
        return NextResponse.json(data)
      }
    } catch (error) {
      continue
    }
  }

  // If all endpoints fail, return 404
  return NextResponse.json(
    { status: 0, message: 'News not found' },
    { status: 404 }
  )
}
