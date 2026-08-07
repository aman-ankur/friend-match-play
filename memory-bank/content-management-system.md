# Content Management System: Enhanced Question Classification

## Overview

The project implements a sophisticated **content classification and management system** that separates questions based on content intensity levels to ensure appropriate deployment across different environments and audiences.

## Architecture

### Content Classification Levels

Questions are classified using a `nsfwRating` scale from 1-11:
- **Levels 1-6**: General audience content, suitable for all environments
- **Levels 7-10**: Enhanced content for mature audiences  
- **Level 11**: Premium exclusive content requiring special access controls

### File Structure

#### Public Repository Files (GitHub-safe)
- `server/src/gameUtils.ts`: Contains only general audience questions (rating 1-6)
- `server/src/sensitiveQuestions.template.ts`: Template file with setup instructions

#### Private Content Files (Git-ignored)
- `server/src/sensitiveQuestions.ts`: Contains enhanced and premium content
  - `sensitiveAllModeQuestions[]`: Enhanced content (rating 7-10) - 189 questions  
  - `sensitiveThisOrThatQuestions[]`: Premium exclusive content (rating 11) - 56 questions

### Implementation Details

#### Content Loading Logic
```typescript
// Enhanced content is dynamically loaded based on user settings
if (nsfwLevel >= 7 && sensitiveAllModeQuestions.length > 0) {
  questionsPool = [...questionsPool, ...sensitiveAllModeQuestions];
}

// Premium content requires special authentication
const filteredQuestions = includeExclusive
  ? sensitiveQuestions // Premium content (rating 11)
  : questionsPool.filter(q => q.nsfwRating <= nsfwLevel);
```

#### Access Control
- **Enhanced Content**: Automatically included when intensity level 7+ is selected
- **Premium Content**: Requires PIN authentication ("1234") for exclusive mode access
- **Fallback Behavior**: If enhanced content file is missing, system gracefully continues with general content only

## Repository Management

### Git Configuration
The `.gitignore` includes:
```
server/src/sensitiveQuestions.ts
```

This ensures enhanced content remains private while maintaining full functionality.

### Content Distribution
- **Public GitHub**: Only contains general audience content (professional appearance)
- **Local Development**: Full content available when `sensitiveQuestions.ts` is present
- **Production Deployment**: Enhanced content deployed separately from main codebase

## Adding New Content

### For General Audience Questions (Rating 1-6)
Add directly to the appropriate array in `server/src/gameUtils.ts`:
```typescript
const guessWhoIAmQuestions: GameQuestion[] = [
  // Add new general content here
];
```

### For Enhanced Content (Rating 7-10)
Add to `server/src/sensitiveQuestions.ts` in the `sensitiveAllModeQuestions` array:
```typescript
export const sensitiveAllModeQuestions: GameQuestion[] = [
  {
    id: "new-enhanced-question",
    text: "Enhanced content question...",
    options: [...],
    score: 1,
    nsfwRating: 8, // 7-10 for enhanced content
    categories: ["appropriate", "categories"]
  }
  // ... existing questions
];
```

### For Premium Exclusive Content (Rating 11)
Add to `server/src/sensitiveQuestions.ts` in the `sensitiveThisOrThatQuestions` array:
```typescript
export const sensitiveThisOrThatQuestions: GameQuestion[] = [
  {
    id: "new-premium-question",
    text: "Premium exclusive content...",
    options: [...],
    score: 1,
    nsfwRating: 11, // Always 11 for premium content
    categories: ["exclusive", "categories"]
  }
  // ... existing questions
];
```

## Technical Benefits

1. **Professional Repository**: Public codebase maintains professional appearance
2. **Flexible Deployment**: Content can be customized per environment
3. **Scalable Architecture**: Easy to add new content classification levels
4. **Graceful Degradation**: System works regardless of content file availability
5. **Access Control**: Premium content protected by authentication layer

## Migration History

**Date**: December 2024
**Action**: Implemented content classification system
- Extracted 189 enhanced content questions from main codebase
- Moved 56 premium exclusive questions to separate management system  
- Updated loading logic to support dynamic content inclusion
- Configured repository for professional public presentation

## Server Logs Verification

When system loads correctly, you should see:
```
[gameUtils] Loaded 56 ultra-sensitive questions
[gameUtils] Loaded 189 sensitive questions (rating 7+)
```

If content file is missing:
```
[gameUtils] Sensitive questions file not found - adult content modes will be disabled
```

## Future Considerations

- Consider implementing database-backed content management for production
- Potential for user-generated content classification
- API endpoints for dynamic content management
- Enhanced authentication mechanisms for premium features 