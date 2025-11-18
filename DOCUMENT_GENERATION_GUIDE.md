# Document Generation & Download Feature Guide

## Overview

The SME Studio AI now includes a complete document generation and download system. Users can generate professional AI-powered documents and download them in multiple formats (Word .docx and Text .txt).

## Features Implemented

### 1. **Document Generation Pages**
Three main generation pages have been created:

#### Business Proposal Generator
- **Route**: `/generate/proposal`
- **File**: `app/generate/proposal/page.tsx`
- **Features**:
  - Form to collect business details
  - AI-powered proposal generation using OpenAI
  - Real-time preview of generated content
  - Download in Word (.docx) or Text (.txt) format

#### Pitch Deck Generator
- **Route**: `/generate/pitch-deck`
- **File**: `app/generate/pitch-deck/page.tsx`
- **Features**:
  - Comprehensive form for investor pitch information
  - Generates 12-slide pitch deck outline
  - Professional formatting
  - Multiple download formats

#### Company Profile Generator
- **Route**: `/generate/company-profile`
- **File**: `app/generate/company-profile/page.tsx`
- **Features**:
  - Dynamic form with array fields (services, achievements)
  - Professional company profile generation
  - Suitable for tenders and client pitches
  - Easy-to-use interface with add/remove buttons

### 2. **Export API Endpoints**
Three export endpoints handle document conversion:

- **POST** `/api/export/proposal` - Export business proposals
- **POST** `/api/export/pitch-deck` - Export pitch decks
- **POST** `/api/export/company-profile` - Export company profiles

### 3. **Document Export Utility**
**File**: `lib/documentExport.ts`

Provides functions for:
- Converting AI-generated content to formatted Word documents
- Generating text files
- Parsing markdown-style formatting
- Creating professional document headers
- Generating appropriate filenames with timestamps

## How It Works

### User Flow

1. **User navigates to generation page** (e.g., `/generate/proposal`)
2. **Fills out the form** with business information
3. **Clicks "Generate"** button
4. **AI generates content** using OpenAI GPT-4
5. **Preview displayed** in the browser
6. **User downloads** in preferred format (Word or Text)

### Technical Flow

```
User Form Input
    ↓
POST /api/ai/{type} (Generate content)
    ↓
OpenAI GPT-4 API
    ↓
AI-generated content returned
    ↓
Display preview to user
    ↓
User clicks Download
    ↓
POST /api/export/{type} (Export document)
    ↓
Convert to Word/Text format
    ↓
Send as file download
```

## File Structure

```
app/
├── generate/
│   ├── proposal/
│   │   └── page.tsx
│   ├── pitch-deck/
│   │   └── page.tsx
│   └── company-profile/
│       └── page.tsx
└── api/
    ├── ai/
    │   ├── proposal/
    │   │   └── route.ts (existing)
    │   ├── pitch-deck/
    │   │   └── route.ts (existing)
    │   └── company-profile/
    │       └── route.ts (existing)
    └── export/
        ├── proposal/
        │   └── route.ts
        ├── pitch-deck/
        │   └── route.ts
        └── company-profile/
            └── route.ts

lib/
├── openai.ts (existing)
└── documentExport.ts (new)
```

## Dependencies Added

```json
{
  "pdfkit": "^0.13.0",
  "docx": "^8.5.0"
}
```

- **docx**: Creates professional Word documents with formatting
- **pdfkit**: (prepared for future PDF support)

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Ensure your `.env.local` has:
```
OPENAI_API_KEY=your_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access Generation Pages
- Business Proposal: `http://localhost:3000/generate/proposal`
- Pitch Deck: `http://localhost:3000/generate/pitch-deck`
- Company Profile: `http://localhost:3000/generate/company-profile`

## Document Format Details

### Word Documents (.docx)
- Professional formatting with headings
- Bullet points and numbered lists
- Proper spacing and margins
- Company name and document type in header
- Generated date included
- Ready for printing or further editing

### Text Documents (.txt)
- Plain text format
- Markdown-style formatting preserved
- Universal compatibility
- Easy to copy-paste
- Suitable for email distribution

## Filename Convention

Documents are saved with the following naming pattern:
```
{business_name}_{document_type}_{date}.{format}
```

Example:
- `tech_solutions_proposal_2024-11-18.docx`
- `my_startup_pitch_deck_2024-11-18.txt`

## API Request/Response Examples

### Generate Proposal
**Request:**
```json
POST /api/ai/proposal
{
  "businessName": "Tech Solutions Ltd",
  "businessType": "Software Development",
  "sector": "ICT",
  "description": "We build custom software solutions...",
  "targetMarket": "SMEs in Southern Africa",
  "monthlyRevenue": 500000,
  "fundingNeeded": 2000000,
  "fundingPurpose": "Expand operations"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "proposal": "# Business Proposal\n\n## Executive Summary\n...",
    "generatedAt": "2024-11-18T10:30:00Z"
  }
}
```

### Export Document
**Request:**
```json
POST /api/export/proposal
{
  "content": "# Business Proposal\n\n## Executive Summary\n...",
  "businessName": "Tech Solutions Ltd",
  "format": "docx"
}
```

**Response:**
- Binary file stream with appropriate headers
- Content-Type: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Content-Disposition: `attachment; filename="..."`

## User Interface Features

### Generation Pages Include:
- ✅ Back button to navigate
- ✅ Clear form validation
- ✅ Loading states with spinner
- ✅ Error handling with toast notifications
- ✅ Success messages
- ✅ Real-time content preview
- ✅ Multiple download format options
- ✅ "Generate Another" option
- ✅ Return to dashboard button
- ✅ Dark mode support
- ✅ Responsive design (mobile, tablet, desktop)

### Form Features:
- ✅ Required field indicators
- ✅ Placeholder text for guidance
- ✅ Dynamic array fields (add/remove)
- ✅ Dropdown selectors for sectors
- ✅ Number inputs for financial data
- ✅ Textarea for longer descriptions
- ✅ Form validation before submission

## Future Enhancements

### Planned Features:
1. **PDF Export** - Add PDF download option
2. **More Document Types**:
   - Cashflow Projections
   - Pricing Recommendations
   - Executive Summary
   - Branding Kit
   - Business Coach Advice
   - Startup Roadmap

3. **Document Templates** - Sector-specific templates
4. **Document History** - Save and retrieve past documents
5. **Batch Export** - Download multiple documents at once
6. **Email Integration** - Send documents via email
7. **Collaboration** - Share documents with team members
8. **Analytics** - Track document generation usage

## Troubleshooting

### Issue: "Cannot find module 'docx'"
**Solution**: Run `npm install` to install dependencies

### Issue: Document download not working
**Solution**: 
- Check browser console for errors
- Verify API endpoint is accessible
- Ensure OpenAI API key is valid

### Issue: Generated content is empty
**Solution**:
- Verify all required fields are filled
- Check OpenAI API quota
- Review server logs for errors

### Issue: Word document formatting is incorrect
**Solution**:
- Try downloading as text first
- Check if content has special characters
- Verify docx library is properly installed

## Performance Considerations

- **AI Generation**: Takes 5-30 seconds depending on content length
- **Document Export**: Instant for text, <1 second for Word
- **File Size**: 
  - Text files: 5-50 KB
  - Word documents: 10-100 KB
- **Concurrent Requests**: Handled by Next.js API routes

## Security Notes

- All API requests validated on server
- OpenAI API key kept secure in environment variables
- No sensitive data stored in documents
- File downloads use secure headers
- CORS properly configured

## Support & Maintenance

For issues or feature requests:
1. Check this guide first
2. Review error messages in browser console
3. Check server logs
4. Contact development team

## Version History

- **v1.0** (Nov 2024): Initial release with 3 document types
  - Business Proposal Generator
  - Pitch Deck Generator
  - Company Profile Generator
  - Word and Text export formats
