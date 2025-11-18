# PowerPoint Export Implementation Guide

## Overview
Implemented professional PowerPoint (.pptx) export for Company Profile and Pitch Deck generators using **pptxgenjs** library with custom master slides and professional templates.

## What's New

### Features
✅ **Professional Master Slides** - Custom slide layouts with accent colors and branding
✅ **Pitch Deck Template** - 12+ slides with title, content, and closing slides
✅ **Company Profile Template** - 10+ section slides with professional formatting
✅ **Color Scheme** - Professional navy, amber/yellow accents, and emerald highlights
✅ **Automatic Slide Parsing** - Intelligently splits AI-generated content into slides
✅ **Page Numbers** - Automatic slide numbering on all content slides
✅ **Header Bars** - Professional header sections on each slide
✅ **Accent Graphics** - Visual accent bars and shapes for professional appearance

### Files Created/Modified

**New Files:**
- `/lib/pptxExport.ts` - PowerPoint export utility with template definitions

**Modified Files:**
- `/package.json` - Added pptxgenjs dependency
- `/app/api/export/pitch-deck/route.ts` - Updated to use PowerPoint export
- `/app/api/export/company-profile/route.ts` - Updated to use PowerPoint export
- `/app/generate/pitch-deck/page.tsx` - Updated UI labels to .pptx
- `/app/generate/company-profile/page.tsx` - Updated UI labels to .pptx

## Installation

Run the following command to install the new dependency:

```bash
npm install
```

This will install `pptxgenjs@^3.12.0` which is required for PowerPoint generation.

## How It Works

### Pitch Deck Generation
1. User fills form with business details
2. Clicks "Generate Pitch Deck"
3. AI generates content via `/api/ai/pitch-deck`
4. Content displayed in preview
5. User clicks "Download as Professional Slides (.pptx)"
6. `/api/export/pitch-deck` creates PowerPoint with:
   - Title slide with business name and accent bar
   - 12 content slides with parsed AI content
   - Closing "Thank You" slide
   - Professional formatting and colors

### Company Profile Generation
1. User fills form with company information
2. Clicks "Generate Company Profile"
3. AI generates content via `/api/ai/company-profile`
4. Content displayed in preview
5. User clicks "Download as Professional Slides (.pptx)"
6. `/api/export/company-profile` creates PowerPoint with:
   - Cover slide with business name
   - 10 section slides with parsed content
   - Professional header bars and page numbers
   - Accent graphics and color scheme

## Design Template Details

### Color Scheme
- **Primary**: Dark Gray/Navy (#1F2937)
- **Accent**: Amber/Yellow (#F59E0B)
- **Secondary**: Emerald (#10B981)
- **White**: #FFFFFF
- **Light Gray**: #F3F4F6

### Slide Layouts

#### Pitch Deck
- **Title Slide**: Large business name with accent bar
- **Content Slides**: Title + body text with accent line and page numbers
- **Closing Slide**: "Thank You" message

#### Company Profile
- **Cover Slide**: Business name with accent shapes
- **Section Slides**: Title + content with header bar and page numbers

## API Endpoints

### Pitch Deck Export
```
POST /api/export/pitch-deck
Content-Type: application/json

{
  "content": "AI-generated pitch deck content",
  "businessName": "Company Name"
}

Response: .pptx file (PowerPoint presentation)
```

### Company Profile Export
```
POST /api/export/company-profile
Content-Type: application/json

{
  "content": "AI-generated company profile content",
  "businessName": "Company Name"
}

Response: .pptx file (PowerPoint presentation)
```

## Customization

### Changing Colors
Edit the `COLORS` object in `/lib/pptxExport.ts`:

```typescript
const COLORS = {
  primary: '1F2937',      // Change primary color
  accent: 'F59E0B',       // Change accent color
  secondary: '10B981',    // Change secondary color
  // ... other colors
}
```

### Adjusting Slide Content
The `parseContentToSlides()` and `parseContentToSections()` functions in `/lib/pptxExport.ts` handle content parsing. Modify these to change how content is split into slides.

### Adding More Slides
Modify the slide limit in parsing functions:
```typescript
return slides.slice(0, 12) // Change 12 to desired number
```

## Testing

1. Navigate to `/generate/pitch-deck`
2. Fill in the form and click "Generate Pitch Deck"
3. Click "Download as Professional Slides (.pptx)"
4. Open the downloaded file in PowerPoint/LibreOffice
5. Verify formatting, colors, and content layout

Repeat for Company Profile at `/generate/company-profile`

## Troubleshooting

### Module Not Found Error
If you see "Cannot find module 'pptxgenjs'", run:
```bash
npm install
```

### Download Not Working
- Check browser console for errors
- Verify `/api/export/{type}` endpoint is returning correct MIME type
- Ensure content is properly formatted

### Slides Look Wrong
- Check color hex codes in COLORS object
- Verify slide dimensions (x, y, w, h values)
- Check font names are available (Arial is standard)

## Future Enhancements

- [ ] Add PDF export option
- [ ] Custom theme selection
- [ ] Image insertion in slides
- [ ] Slide transitions and animations
- [ ] More document types (Proposal, Roadmap, etc.)
- [ ] Template library for different industries
- [ ] Slide customization UI

## Dependencies

- **pptxgenjs**: ^3.12.0 - PowerPoint generation library
- **docx**: ^8.5.0 - Word document generation (still available for other exports)
- **pdfkit**: ^0.13.0 - PDF generation (for future use)

## Support

For issues or questions about PowerPoint export:
1. Check the troubleshooting section above
2. Review `/lib/pptxExport.ts` for implementation details
3. Check browser console for error messages
4. Verify all dependencies are installed with `npm install`
