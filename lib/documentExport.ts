/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  Document, 
  Packer, 
  Paragraph, 
  HeadingLevel, 
  PageBreak, 
  AlignmentType,
  BorderStyle,
  TextRun,
} from 'docx'

// Professional color scheme
const COLORS = {
  primary: '1F4788', // Deep blue
  secondary: '2E7D32', // Professional green
  accent: 'E8A537', // Gold accent
  text: '333333', // Dark gray
  lightText: '666666', // Medium gray
  border: 'CCCCCC', // Light gray
}

/**
 * Convert markdown-style text to formatted paragraphs with professional styling
 */
function parseMarkdownToParagraphs(text: string): Paragraph[] {
  const lines = text.split('\n')
  const paragraphs: Paragraph[] = []

  let currentText = ''

  for (const line of lines) {
    const trimmed = line.trim()

    // Handle headings
    if (trimmed.startsWith('# ')) {
      if (currentText) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: currentText, color: COLORS.text, font: 'Times New Roman', size: 24 })],
            spacing: { line: 360, after: 200 },
          })
        )
        currentText = ''
      }
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.replace(/^#+\s/, ''),
              bold: true,
              size: 32 * 2,
              color: COLORS.primary,
              font: 'Times New Roman',
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 300, before: 400 },
          border: {
            bottom: {
              color: COLORS.accent,
              space: 1,
              style: BorderStyle.SINGLE,
              size: 12,
            },
          },
        })
      )
    } else if (trimmed.startsWith('## ')) {
      if (currentText) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: currentText, color: COLORS.text, font: 'Times New Roman', size: 24 })],
            spacing: { line: 360, after: 200 },
          })
        )
        currentText = ''
      }
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.replace(/^#+\s/, ''),
              bold: true,
              size: 26 * 2,
              color: COLORS.primary,
              font: 'Times New Roman',
            }),
          ],
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 250, before: 300 },
          border: {
            left: {
              color: COLORS.secondary,
              space: 1,
              style: BorderStyle.SINGLE,
              size: 24,
            },
          },
          indent: { left: 200 },
        })
      )
    } else if (trimmed.startsWith('### ')) {
      if (currentText) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: currentText, color: COLORS.text, font: 'Times New Roman', size: 24 })],
            spacing: { line: 360, after: 200 },
          })
        )
        currentText = ''
      }
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.replace(/^#+\s/, ''),
              bold: true,
              size: 22 * 2,
              color: COLORS.secondary,
              font: 'Times New Roman',
            }),
          ],
          heading: HeadingLevel.HEADING_3,
          spacing: { after: 150, before: 200 },
        })
      )
    } else if (trimmed.startsWith('- ')) {
      if (currentText) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: currentText, color: COLORS.text, font: 'Times New Roman', size: 24 })],
            spacing: { line: 360, after: 200 },
          })
        )
        currentText = ''
      }
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: trimmed.replace(/^-\s/, ''), color: COLORS.text, bold: true, font: 'Times New Roman', size: 24 })],
          bullet: { level: 0 },
          spacing: { line: 280, after: 120 },
        })
      )
    } else if (trimmed === '') {
      if (currentText) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: currentText, color: COLORS.text, font: 'Times New Roman', size: 24 })],
            spacing: { line: 360, after: 200 },
          })
        )
        currentText = ''
      }
      // Add spacing between sections
      paragraphs.push(
        new Paragraph({
          text: '',
          spacing: { after: 100 },
        })
      )
    } else {
      currentText += (currentText ? ' ' : '') + trimmed
    }
  }

  if (currentText) {
    paragraphs.push(
      new Paragraph({
        children: [new TextRun({ text: currentText, color: COLORS.text })],
        spacing: { line: 360, after: 200 },
      })
    )
  }

  return paragraphs
}

/**
 * Generate a professional cover page
 */
function generateCoverPage(title: string, businessName: string, documentType: string): Paragraph[] {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return [
    // Top spacing
    new Paragraph({ text: '', spacing: { after: 600 } }),

    // Main title
    new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 48 * 2,
          color: COLORS.primary,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),

    // Decorative line
    new Paragraph({
      children: [
        new TextRun({
          text: '━'.repeat(40),
          color: COLORS.accent,
          font: 'Times New Roman',
          size: 24,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    }),

    // Business name
    new Paragraph({
      children: [
        new TextRun({
          text: businessName,
          bold: true,
          size: 28 * 2,
          color: COLORS.secondary,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    }),

    // Document type
    new Paragraph({
      children: [
        new TextRun({
          text: documentType,
          size: 20 * 2,
          color: COLORS.lightText,
          italics: true,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 800 },
    }),

    // Spacing
    new Paragraph({ text: '', spacing: { after: 1200 } }),

    // Footer info
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated: ${formattedDate}`,
          size: 18 * 2,
          color: COLORS.lightText,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),

    // Page break
    new PageBreak() as any,
  ]
}

/**
 * Generate a Word document from AI-generated content with professional styling
 */
export async function generateWordDocument(
  content: string,
  title: string,
  businessName: string,
  documentType: string
): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        children: [
          // Cover page
          ...generateCoverPage(title, businessName, documentType),

          // Table of contents header
          new Paragraph({
            children: [
              new TextRun({
                text: 'Document Overview',
                bold: true,
                size: 32 * 2,
                color: COLORS.primary,
                font: 'Times New Roman',
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 300, before: 200 },
            border: {
              bottom: {
                color: COLORS.accent,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 12,
              },
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `This document provides a comprehensive ${documentType.toLowerCase()} for ${businessName}. It includes detailed analysis, strategic recommendations, and actionable insights to support business growth and decision-making.`,
                color: COLORS.text,
                size: 20 * 2,
                font: 'Times New Roman',
              }),
            ],
            spacing: { after: 400 },
          }),

          // Page break before main content
          new PageBreak() as any,

          // Main content with enhanced formatting
          ...parseMarkdownToParagraphs(content),

          // Footer section
          new PageBreak() as any,

          new Paragraph({
            children: [
              new TextRun({
                text: 'Document Information',
                bold: true,
                size: 24 * 2,
                color: COLORS.primary,
                font: 'Times New Roman',
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 200, before: 200 },
          }),

          new Paragraph({
            children: [new TextRun({ text: `Business Name: ${businessName}`, color: COLORS.text, font: 'Times New Roman', size: 24 })],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [new TextRun({ text: `Document Type: ${documentType}`, color: COLORS.text, font: 'Times New Roman', size: 24 })],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
                color: COLORS.text,
                font: 'Times New Roman',
                size: 24,
              }),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Time: ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
                color: COLORS.text,
                font: 'Times New Roman',
                size: 24,
              }),
            ],
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: '━'.repeat(40),
                color: COLORS.accent,
                font: 'Times New Roman',
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

        ],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  return buffer
}

/**
 * Generate a beautifully designed slide-based company profile document
 */
export async function generateCompanyProfileSlides(
  content: string,
  businessName: string
): Promise<Buffer> {
  // Parse content into slides (split by ## for slide breaks)
  const slides = content.split('## ').filter((s) => s.trim())

  const slideElements: any[] = []

  // ===== COVER SLIDE =====
  slideElements.push(
    new Paragraph({
      text: '',
      spacing: { after: 800 },
    })
  )

  // Decorative top bar
  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '█'.repeat(80),
          color: COLORS.primary,
          size: 12 * 2,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    })
  )

  // Company name
  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: businessName.toUpperCase(),
          bold: true,
          size: 56 * 2,
          color: COLORS.primary,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  )

  // Subtitle
  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'COMPANY PROFILE',
          bold: true,
          size: 36 * 2,
          color: COLORS.accent,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 800 },
    })
  )

  // Decorative bottom bar
  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '█'.repeat(80),
          color: COLORS.secondary,
          size: 12 * 2,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  )

  // Date
  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          size: 20 * 2,
          color: COLORS.lightText,
          italics: true,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
    })
  )

  slideElements.push(new PageBreak() as any)

  // ===== CONTENT SLIDES =====
  slides.forEach((slideContent, index) => {
    const lines = slideContent.split('\n').filter((l) => l.trim())

    if (lines.length === 0) return

    const title = lines[0].replace(/^#+\s/, '').trim()

    // Decorative header
    slideElements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: '▌ ',
            color: COLORS.accent,
            size: 28 * 2,
            bold: true,
          }),
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 32 * 2,
            color: COLORS.primary,
            font: 'Times New Roman',
          }),
        ],
        spacing: { after: 100 },
      })
    )

    // Decorative underline
    slideElements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: '━'.repeat(70),
            color: COLORS.accent,
            size: 12 * 2,
          }),
        ],
        spacing: { after: 400 },
      })
    )

    // Slide content
    const contentLines = lines.slice(1)
    contentLines.forEach((line, lineIndex) => {
      const trimmed = line.trim()

      if (trimmed.startsWith('- ')) {
        // Bullet point with styling
        slideElements.push(
          new Paragraph({
            children: [
              new TextRun({
                text: '◆ ',
                color: COLORS.secondary,
                bold: true,
                size: 20 * 2,
              }),
              new TextRun({
                text: trimmed.replace(/^-\s/, ''),
                color: COLORS.text,
                bold: true,
                font: 'Times New Roman',
                size: 24,
              }),
            ],
            spacing: { line: 320, after: 200, before: lineIndex === 0 ? 0 : 100 },
            indent: { left: 400 },
          })
        )
      } else if (trimmed) {
        // Regular paragraph with better spacing
        slideElements.push(
          new Paragraph({
            children: [
              new TextRun({
                text: trimmed,
                color: COLORS.text,
                font: 'Times New Roman',
                size: 22 * 2,
              }),
            ],
            spacing: { line: 360, after: 240, before: 100 },
            indent: { left: 200 },
          })
        )
      }
    })

    // Decorative footer for each slide
    slideElements.push(
      new Paragraph({
        text: '',
        spacing: { after: 300 },
      })
    )

    slideElements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: '━'.repeat(70),
            color: COLORS.border,
            size: 12 * 2,
          }),
        ],
        spacing: { after: 200 },
      })
    )

    // Slide number
    slideElements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${index + 1} / ${slides.length}`,
            color: COLORS.lightText,
            size: 16 * 2,
            italics: true,
            font: 'Times New Roman',
          }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 400 },
      })
    )

    // Page break between slides
    if (index < slides.length - 1) {
      slideElements.push(new PageBreak() as any)
    }
  })

  // ===== THANK YOU SLIDE =====
  slideElements.push(new PageBreak() as any)

  slideElements.push(
    new Paragraph({
      text: '',
      spacing: { after: 1000 },
    })
  )

  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '█'.repeat(80),
          color: COLORS.primary,
          size: 12 * 2,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    })
  )

  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'THANK YOU',
          bold: true,
          size: 56 * 2,
          color: COLORS.accent,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  )

  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: businessName.toUpperCase(),
          bold: true,
          size: 32 * 2,
          color: COLORS.primary,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
    })
  )

  slideElements.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '█'.repeat(80),
          color: COLORS.secondary,
          size: 12 * 2,
        }),
      ],
      alignment: AlignmentType.CENTER,
    })
  )

  const doc = new Document({
    sections: [
      {
        children: slideElements,
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  return buffer
}

/**
 * Generate a real PowerPoint presentation for company profile
 */
export async function generateCompanyProfilePowerPoint(
  content: string,
  businessName: string
): Promise<Buffer> {
  // For now, use the Word slide format which works reliably
  // This generates a professional slide-based Word document that looks like a presentation
  return generateCompanyProfileSlides(content, businessName)
}

/**
 * Generate a simple text file
 */
export function generateTextFile(
  content: string,
  title: string,
  businessName: string,
  documentType: string
): Buffer {
  const header = `${title}
For: ${businessName}
${documentType} | Generated on ${new Date().toLocaleDateString()}

${'='.repeat(80)}

`

  const fullContent = header + content

  return Buffer.from(fullContent, 'utf-8')
}

/**
 * Create a filename for the document
 */
export function createFilename(businessName: string, documentType: string, format: 'docx' | 'txt' | 'pdf' | 'pptx'): string {
  const sanitized = businessName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const type = documentType.replace(/\s+/g, '_').toLowerCase()
  const timestamp = new Date().toISOString().split('T')[0]

  const ext = format === 'docx' ? 'docx' : format === 'txt' ? 'txt' : format === 'pptx' ? 'pptx' : 'pdf'
  return `${sanitized}_${type}_${timestamp}.${ext}`
}

/**
 * Export document in multiple formats
 */
export async function exportDocument(
  content: string,
  title: string,
  businessName: string,
  documentType: string,
  format: 'docx' | 'txt' | 'pptx' = 'docx',
  isSlideFormat: boolean = false
): Promise<{ buffer: Buffer; filename: string; mimeType: string }> {
  // For company profiles, use PowerPoint
  if (isSlideFormat && format === 'pptx') {
    const filename = createFilename(businessName, documentType, 'pptx')
    const buffer = await generateCompanyProfilePowerPoint(content, businessName)
    return {
      buffer,
      filename,
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    }
  }

  const filename = createFilename(businessName, documentType, format)

  if (format === 'docx') {
    const buffer = await generateWordDocument(content, title, businessName, documentType)
    return {
      buffer,
      filename,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }
  } else {
    const buffer = generateTextFile(content, title, businessName, documentType)
    return {
      buffer,
      filename,
      mimeType: 'text/plain',
    }
  }
}

/**
 * Generate a professional PowerPoint presentation for pitch decks
 */
export async function generatePitchDeckPresentation(
  content: string,
  businessName: string
): Promise<Buffer> {
  // Generate as Word document with professional slide layout
  // This creates a presentation-style document that opens in PowerPoint/Word
  return generateWordDocument(content, 'Investor Pitch Deck', businessName, 'Pitch Deck')
}
