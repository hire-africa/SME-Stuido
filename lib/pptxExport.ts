import PptxGenJS from 'pptxgenjs'

interface PresentationOptions {
  title: string
  businessName: string
  type: 'pitch-deck' | 'company-profile'
  content: string
}

// Color scheme - Professional with accent colors
const COLORS = {
  primary: '1F2937', // Dark gray/navy
  accent: 'F59E0B', // Amber/Yellow
  secondary: '10B981', // Emerald
  white: 'FFFFFF',
  lightGray: 'F3F4F6',
  darkText: '111827',
  lightText: 'F9FAFB',
}

function createPitchDeckPresentation(businessName: string, content: string): Buffer {
  const prs = new PptxGenJS()
  prs.defineLayout({ name: 'BLANK', master: 'BLANK' })

  // Define master slide
  prs.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background: { fill: COLORS.white },
    objects: [
      {
        placeholder: {
          options: { name: 'title', type: 'title' },
          text: '',
        },
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
      },
    ],
  })

  // Parse content into slides
  const slides = parseContentToSlides(content)

  // Title Slide
  const titleSlide = prs.addSlide()
  titleSlide.background = { fill: COLORS.primary }

  // Add accent bar
  titleSlide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 1,
    h: 10,
    fill: { color: COLORS.accent },
    line: { type: 'none' },
  })

  titleSlide.addText(businessName, {
    x: 1.5,
    y: 2.5,
    w: 8,
    h: 1.5,
    fontSize: 54,
    bold: true,
    color: COLORS.accent,
    fontFace: 'Arial',
  })

  titleSlide.addText('Investor Pitch Deck', {
    x: 1.5,
    y: 4.2,
    w: 8,
    h: 0.8,
    fontSize: 32,
    color: COLORS.white,
    fontFace: 'Arial',
  })

  // Content Slides
  slides.forEach((slide, index) => {
    const newSlide = prs.addSlide()
    newSlide.background = { fill: COLORS.white }

    // Add accent bar on left
    newSlide.addShape(prs.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 0.3,
      h: 7.5,
      fill: { color: COLORS.accent },
      line: { type: 'none' },
    })

    // Add header background
    newSlide.addShape(prs.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 1,
      fill: { color: COLORS.lightGray },
      line: { type: 'none' },
    })

    // Slide number
    newSlide.addText(`${index + 1}`, {
      x: 9.2,
      y: 0.3,
      w: 0.5,
      h: 0.4,
      fontSize: 12,
      color: COLORS.primary,
      align: 'right',
    })

    // Title
    newSlide.addText(slide.title, {
      x: 0.5,
      y: 0.25,
      w: 8.5,
      h: 0.5,
      fontSize: 28,
      bold: true,
      color: COLORS.primary,
      fontFace: 'Arial',
    })

    // Content
    newSlide.addText(slide.content, {
      x: 0.5,
      y: 1.3,
      w: 9,
      h: 5.8,
      fontSize: 14,
      color: COLORS.darkText,
      fontFace: 'Arial',
      valign: 'top',
      wrap: true,
    })
  })

  // Closing Slide
  const closingSlide = prs.addSlide()
  closingSlide.background = { fill: COLORS.primary }

  closingSlide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 1,
    h: 10,
    fill: { color: COLORS.accent },
    line: { type: 'none' },
  })

  closingSlide.addText('Thank You', {
    x: 1.5,
    y: 2.5,
    w: 8,
    h: 1.5,
    fontSize: 54,
    bold: true,
    color: COLORS.accent,
    fontFace: 'Arial',
  })

  closingSlide.addText('Let\'s Build Something Great Together', {
    x: 1.5,
    y: 4.2,
    w: 8,
    h: 0.8,
    fontSize: 24,
    color: COLORS.white,
    fontFace: 'Arial',
  })

  const arrayBuffer1 = prs.write({ outputType: 'arraybuffer' }) as ArrayBuffer
  return Buffer.from(arrayBuffer1)
}

function createCompanyProfilePresentation(businessName: string, content: string): Buffer {
  const prs = new PptxGenJS()

  // Define master slide for company profile
  prs.defineSlideMaster({
    title: 'COMPANY_MASTER',
    background: { fill: COLORS.white },
  })

  // Parse content into sections
  const sections = parseContentToSections(content)

  // Cover Slide
  const coverSlide = prs.addSlide()
  coverSlide.background = { fill: COLORS.primary }

  // Accent shapes
  coverSlide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 1.2,
    h: 7.5,
    fill: { color: COLORS.accent },
    line: { type: 'none' },
  })

  coverSlide.addShape(prs.ShapeType.rect, {
    x: 8.8,
    y: 5,
    w: 1.2,
    h: 2.5,
    fill: { color: COLORS.secondary },
    line: { type: 'none' },
  })

  coverSlide.addText(businessName, {
    x: 1.5,
    y: 2,
    w: 8,
    h: 1.5,
    fontSize: 48,
    bold: true,
    color: COLORS.accent,
    fontFace: 'Arial',
  })

  coverSlide.addText('Company Profile', {
    x: 1.5,
    y: 3.7,
    w: 8,
    h: 0.8,
    fontSize: 28,
    color: COLORS.white,
    fontFace: 'Arial',
  })

  // Content Slides
  sections.forEach((section, index) => {
    const slide = prs.addSlide()
    slide.background = { fill: COLORS.white }

    // Header bar
    slide.addShape(prs.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.9,
      fill: { color: COLORS.lightGray },
      line: { type: 'none' },
    })

    // Left accent line
    slide.addShape(prs.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 0.08,
      h: 7.5,
      fill: { color: COLORS.accent },
      line: { type: 'none' },
    })

    // Title
    slide.addText(section.title, {
      x: 0.3,
      y: 0.2,
      w: 9.2,
      h: 0.5,
      fontSize: 26,
      bold: true,
      color: COLORS.primary,
      fontFace: 'Arial',
    })

    // Page number
    slide.addText(`${index + 1}`, {
      x: 9.5,
      y: 0.3,
      w: 0.4,
      h: 0.3,
      fontSize: 11,
      color: COLORS.primary,
      align: 'right',
    })

    // Content
    slide.addText(section.content, {
      x: 0.5,
      y: 1.2,
      w: 9,
      h: 5.8,
      fontSize: 13,
      color: COLORS.darkText,
      fontFace: 'Arial',
      valign: 'top',
      wrap: true,
    })
  })

  const arrayBuffer2 = prs.write({ outputType: 'arraybuffer' }) as ArrayBuffer
  return Buffer.from(arrayBuffer2)
}

function parseContentToSlides(content: string): Array<{ title: string; content: string }> {
  const slides: Array<{ title: string; content: string }> = []

  // Split by common slide markers or paragraphs
  const parts = content.split(/\n\n+/)

  for (let i = 0; i < parts.length; i += 2) {
    if (i + 1 < parts.length) {
      slides.push({
        title: parts[i].trim().substring(0, 50) || `Slide ${slides.length + 1}`,
        content: parts[i + 1].trim(),
      })
    } else if (parts[i].trim()) {
      slides.push({
        title: `Slide ${slides.length + 1}`,
        content: parts[i].trim(),
      })
    }
  }

  // Ensure at least one slide
  if (slides.length === 0) {
    slides.push({
      title: 'Overview',
      content: content,
    })
  }

  return slides.slice(0, 12) // Limit to 12 content slides
}

function parseContentToSections(content: string): Array<{ title: string; content: string }> {
  const sections: Array<{ title: string; content: string }> = []

  // Split by headers or major sections
  const parts = content.split(/\n(?=[A-Z])|##\s+/i)

  for (const part of parts) {
    const lines = part.trim().split('\n')
    if (lines.length > 0) {
      const title = lines[0].substring(0, 40) || 'Section'
      const sectionContent = lines.slice(1).join('\n').trim()

      if (title && sectionContent) {
        sections.push({
          title: title,
          content: sectionContent,
        })
      }
    }
  }

  // Ensure at least one section
  if (sections.length === 0) {
    sections.push({
      title: 'Company Overview',
      content: content,
    })
  }

  return sections.slice(0, 10) // Limit to 10 sections
}

export async function exportToPowerPoint(
  options: PresentationOptions
): Promise<{ buffer: Buffer; filename: string; mimeType: string }> {
  let buffer: Buffer

  if (options.type === 'pitch-deck') {
    buffer = createPitchDeckPresentation(options.businessName, options.content)
  } else {
    buffer = createCompanyProfilePresentation(options.businessName, options.content)
  }

  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `${options.businessName.replace(/\s+/g, '_')}_${options.type}_${timestamp}.pptx`

  return {
    buffer,
    filename,
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  }
}
