# Document Download Feature - Quick Start

## What's New

Your SME Studio AI now has **downloadable document generation**! Users can:
- Generate professional AI-powered documents
- Preview content before downloading
- Download in Word (.docx) or Text (.txt) format
- Generate multiple documents easily

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App
```bash
npm run dev
```

### 3. Access Generation Pages

From the client dashboard, click on any of these generators:

#### **Business Proposal Generator**
- Navigate to: `/generate/proposal`
- Fill in business details
- AI generates a comprehensive proposal
- Download as Word or Text

#### **Pitch Deck Generator**
- Navigate to: `/generate/pitch-deck`
- Provide investor pitch information
- Get 12-slide pitch deck outline
- Download in your preferred format

#### **Company Profile Generator**
- Navigate to: `/generate/company-profile`
- Enter company information
- Add services and achievements
- Download professional profile

## User Experience Flow

```
1. Click document generator from dashboard
   ↓
2. Fill out the form (all fields marked with * are required)
   ↓
3. Click "Generate [Document]" button
   ↓
4. Wait for AI to generate content (5-30 seconds)
   ↓
5. Preview generated content
   ↓
6. Choose download format:
   - Word (.docx) - Formatted, editable
   - Text (.txt) - Plain text, universal
   ↓
7. Document downloads to your computer
   ↓
8. Generate another or return to dashboard
```

## Features

### Generation Pages
- ✅ Clean, intuitive form interface
- ✅ Real-time validation
- ✅ Loading indicators
- ✅ Error handling with helpful messages
- ✅ Content preview before download
- ✅ Multiple download formats

### Export Formats
- **Word (.docx)**: Professional formatting, editable, ready for printing
- **Text (.txt)**: Plain text, universal compatibility, easy to share

### Smart Filenames
Documents are automatically named with:
- Business name
- Document type
- Generation date

Example: `tech_solutions_proposal_2024-11-18.docx`

## API Endpoints

### Generate Content
- `POST /api/ai/proposal`
- `POST /api/ai/pitch-deck`
- `POST /api/ai/company-profile`

### Export Documents
- `POST /api/export/proposal`
- `POST /api/export/pitch-deck`
- `POST /api/export/company-profile`

## File Structure

```
New Files Created:
├── lib/documentExport.ts
├── app/generate/proposal/page.tsx
├── app/generate/pitch-deck/page.tsx
├── app/generate/company-profile/page.tsx
├── app/api/export/proposal/route.ts
├── app/api/export/pitch-deck/route.ts
├── app/api/export/company-profile/route.ts
└── DOCUMENT_GENERATION_GUIDE.md
```

## Testing the Feature

### Test Business Proposal
1. Go to `/generate/proposal`
2. Fill in:
   - Business Name: "My Test Business"
   - Business Type: "Retail"
   - Sector: "Retail"
   - Description: "We sell quality products"
   - Target Market: "Local customers"
3. Click "Generate Proposal"
4. Wait for generation
5. Click "Download as Word (.docx)"
6. Verify file downloads

### Test Pitch Deck
1. Go to `/generate/pitch-deck`
2. Fill in all required fields
3. Click "Generate Pitch Deck"
4. Download in preferred format

### Test Company Profile
1. Go to `/generate/company-profile`
2. Fill in company details
3. Add at least one service and achievement
4. Click "Generate Company Profile"
5. Download document

## Troubleshooting

### Downloads not working?
- Check browser console (F12)
- Verify API endpoints are accessible
- Ensure OpenAI API key is configured

### Generation taking too long?
- Normal: 5-30 seconds
- Check OpenAI API status
- Verify internet connection

### Document formatting issues?
- Try downloading as Text first
- Check for special characters
- Verify docx library installed: `npm list docx`

## Next Steps

### Coming Soon
- PDF export format
- More document types (Cashflow, Pricing, etc.)
- Document history/storage
- Batch downloads
- Email integration
- Sector-specific templates

### Configuration
All settings are in:
- `lib/documentExport.ts` - Export formatting
- `app/generate/[type]/page.tsx` - Form configuration
- `app/api/export/[type]/route.ts` - API handlers

## Support

For issues:
1. Check browser console for errors
2. Review server logs
3. Verify `.env.local` has `OPENAI_API_KEY`
4. Restart dev server: `npm run dev`

## Key Files to Know

| File | Purpose |
|------|---------|
| `lib/documentExport.ts` | Document formatting & export logic |
| `app/generate/*/page.tsx` | Generation form pages |
| `app/api/export/*/route.ts` | Download endpoints |
| `app/api/ai/*/route.ts` | AI generation endpoints (existing) |

## Performance

- **Generation Time**: 5-30 seconds (depends on content)
- **Export Time**: <1 second
- **File Sizes**: 
  - Text: 5-50 KB
  - Word: 10-100 KB

## Security

- ✅ Server-side validation
- ✅ Secure API key handling
- ✅ No sensitive data in documents
- ✅ Proper HTTP headers

---

**Ready to use!** Start generating and downloading professional documents with AI.
