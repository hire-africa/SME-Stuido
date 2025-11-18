import { NextRequest, NextResponse } from 'next/server'
import { exportDocument } from '@/lib/documentExport'

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

    const { buffer, filename, mimeType } = await exportDocument(
      content,
      'Investor Pitch Deck',
      businessName,
      'Pitch Deck',
      'docx'
    )

    return new NextResponse(buffer as any, {
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
        error: error instanceof Error ? error.message : 'Failed to export document',
      },
      { status: 500 }
    )
  }
}
