# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the application

```bash
npm run dev          # Start development server on PORT 3081
npm run build        # Build production bundle
npm start            # Start production server on PORT 3081
```

### Testing

```bash
npm test             # Run all tests with Vitest
npm run coverage     # Run tests with coverage report
```

### Code quality

```bash
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Versioning

```bash
npm run change-init     # Initialize changesets
npm run change-version  # Version packages with changesets
```

## Architecture Overview

This is a Next.js 15 App Router application for audience management, following domain-driven design principles with a modular architecture.

### Module Structure

The application is organized into feature-based modules in `src/modules/`:

- **`auth`** - Authentication using singleton pattern (AuthContextManager) with token management
- **`navbar`** - Top navigation
- **`monitoring`** - Sentry integration and observability

Each module follows this structure:

```
module/
├── domain/         # Zod schemas, types, business logic
├── services/       # API communication (for some modules)
├── hooks/          # React hooks
├── components/     # UI components
└── utils/          # Helper functions
```

### State Management

- **React Context** for global state (AuthContextManager singleton, AudienceWatcherContext)
- **SWR** for data fetching and caching (useSWRImmutable for immutable data)
- **Local component state** with hooks
- No Redux or Zustand; no Jotai atoms used

### API Communication Pattern

```
Component → Custom Hook → SWR/Direct Call → Adapter Layer → Ky HTTP Client → Backend API
                                            ↓
                                   Zod Validation + Error Handling
```

All API responses are validated with Zod schemas. Services use HAL-like response format:

```typescript
ApiEmbeddedResponse<TData> {
  _embedded: TData,
  _links: { next?: string, self: string }
}
```

### Path Aliases

TypeScript paths configured in tsconfig.json:

```typescript
@modules/*  → src/modules/*
@shared/*   → src/shared/*
@styles/*   → src/styles/*
```

### Authentication & Middleware

- Middleware (`middleware.ts`) validates auth tokens in cookies (HEALTHNEXUS_TOKEN_KEY, SSO_TOKEN_KEY)
- Redirects to SSO login if tokens invalid
- Protected routes exclude: `/api`, `/_next`, `/fonts`, `/login`, `/unauthorized`, `/monitoring`
- Auth state managed by AuthContextManager singleton

### App Router Structure

```
app/
├── (monitoring)/                    # Route group with Sentry/Mixpanel
│   ├── (non-authenticated)/
│   │   ├── login/
│   │   └── unauthorized/
│   └── (authenticated)/
│       ├── page.tsx                 # Home - MainGeneralAPP
```

### Key Technologies

- **Framework**: Next.js 15.5.6 (App Router)
- **HTTP Client**: Ky 1.7.2
- **Data Fetching**: SWR 2.3.0
- **Validation**: Zod 3.24.1
- **Forms**: React Hook Form 7.54.2
- **UI Grid**: AG-Grid 33.1.0 (Enterprise)
- **Charts**: Recharts 2.15.3
- **UI Components**: @purplelab/atoms-ui, @purplelab/organisms-ui, @purplelab/icons-ui
- **Testing**: Vitest 2.1.8 + @testing-library/react
- **Styling**: Tailwind CSS 4.1.6
- **Error Tracking**: Sentry @sentry/nextjs 10.22.0
- **Analytics**: Mixpanel (via @purplelab/organisms-ui)

## Key Architectural Patterns

### Port/Adapter Pattern

Types defined as "ports" in `domain/` folders:

```typescript
export type GetAudiencesVersionByIdPort = (params) => Promise<...>;
```

Implementations as "adapters" in `services/`:

```typescript
const getAudiencesVersionById: GetAudiencesVersionByIdPort = async (params) => {...}
```

### Schema Composition with Zod

Base schemas are merged to create complex types:

```typescript
const enhancedDtcSchema = basicInformationSchema
  .merge(coreObjectsSchema)
  .merge(selectGroupsSchema)
  .merge(destinationsSchema);
```

### Centralized Task Monitoring

AudienceWatcherContext provides background job monitoring:

```typescript
registerAudience(audienceId, status, taskId, context);
// Polls task status, invokes callbacks on updates
```

### Safe Request Pattern

Error-first tuple pattern (no exceptions thrown):

```typescript
const [response, error] = await safeRequest(apiFunction)(params);
if (error) {
  handleError(error);
  return;
}
```

## Testing

Tests use Vitest with jsdom environment. Setup file: `src/shared/test/setup.tsx`

Test utilities:

```typescript
import { renderWithAppContext } from '@shared/test/setup';

renderWithAppContext(<Component />); // Renders with test providers
```

Run tests for specific files:

```bash
vitest run path/to/test.test.ts
```

## Code Quality Rules

From `.eslintrc.js`:

- **Strict TypeScript**: `@typescript-eslint/no-explicit-any` is error
- **No console**: `console.log/warn/error` only (others disallowed)
- **Warning comments**: TODO/FIXME trigger warnings
- **Accessibility**: jsx-a11y rules enabled (most as warnings)
- **React hooks**: rules-of-hooks error, exhaustive-deps warn

## Environment Variables

Required environment variables (check `.env` file):

- `NEXT_PUBLIC_HEALTHNEXUS_API_KEY` - API authentication
- `NEXT_PUBLIC_AGGRID_LICENSE_KEY` - AG-Grid license
- `NEXT_PUBLIC_MIXPANEL_KEY` - Analytics tracking
- `NEXT_PUBLIC_SENTRY_AUTH_TOKEN` - Error tracking
- SSO configuration variables

## Important Conventions

1. **Type Safety First**: All API boundaries validated with Zod, TypeScript strict mode enabled
2. **Component Organization**: Features grouped by module, self-contained with domain/services/hooks/components
3. **Error Handling**: Use adapter pattern with `withNetworkErrorHandlingAdapter` for consistent error handling
4. **Authentication**: Auto-handled by beforeRequest hooks in Ky instances, tokens refreshed automatically
5. **Data Fetching**: Prefer SWR hooks for caching, use `useSWRImmutable` for static data
6. **Background Tasks**: Register with AudienceWatcherContext for centralized monitoring
7. **Folder Structure**: Features organized by business domain, not by technical role

Process execution flow: estimate → deliver → run (via `use-run-process.ts` hook)
