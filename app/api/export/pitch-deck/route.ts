import { NextRequest, NextResponse } from 'next/server'
import { exportToPowerPoint } from '@/lib/pptxExport'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, businessName } = body

    if (!content || !businessName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { buffer, filename, mimeType } = await exportToPowerPoint({
      title: 'Investor Pitch Deck',
      businessName,
      type: 'pitch-deck',
      content,
    })

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to export presentation',
      },
      { status: 500 }
    )
  }
}
