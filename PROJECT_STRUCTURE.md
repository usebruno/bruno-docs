# Bruno Docs - Nextra 4 App Router Structure

## Project Structure

```
bruno-docs/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── layout.tsx                # Root layout with ThemeProvider
│   │   ├── globals.css               # Global styles with Tailwind
│   │   └── [[...slug]]/              # Dynamic catch-all route for docs
│   │       ├── layout.tsx            # Nextra DocsLayout
│   │       └── page.tsx              # MDX page renderer
│   │
│   ├── components/                   # React components
│   │   ├── navbar.tsx                # Custom navbar
│   │   ├── head.tsx                  # Custom head meta tags
│   │   ├── BrunoButton.tsx           # Custom button component
│   │   ├── command-menu/             # Search command menu
│   │   ├── ui/                       # Shadcn UI components
│   │   └── ...
│   │
│   ├── lib/                          # Utilities and types
│   │   ├── cache/                    # Generated cache files
│   │   ├── types/                    # TypeScript types
│   │   └── utils.ts                  # Helper functions
│   │
│   ├── styles/                       # Additional styles
│   │   └── mobile-sidebar.css        # Mobile sidebar styles
│   │
│   └── pages-old/                    # Backup of old Pages Router structure
│
├── content/                          # MDX Documentation Content
│   ├── _meta.js                      # Root navigation config
│   ├── index.mdx                     # Homepage
│   ├── introduction/                 # Introduction section
│   ├── get-started/                  # Getting started guides
│   ├── testing/                      # Testing documentation
│   ├── auth/                         # Authentication docs
│   ├── variables/                    # Variables documentation
│   ├── secrets-management/           # Secrets management
│   ├── git-integration/              # Git integration guides
│   ├── bru-cli/                      # CLI documentation
│   ├── bru-lang/                     # Bru language docs
│   ├── send-requests/                # API request docs
│   │   ├── REST/
│   │   ├── graphql/
│   │   ├── grpc/
│   │   ├── soap/
│   │   └── websocket/
│   ├── license-administrators/       # License admin docs
│   ├── license-end-users/            # End user license docs
│   └── ...
│
├── utils/                            # Build utilities
│   └── cache/                        # Cache generation scripts
│       ├── buildFileCache.ts         # File search index generator
│       └── buildIndexCache.ts        # Navigation index generator
│
├── public/                           # Static assets
│   ├── bruno.svg                     # Logo
│   ├── bruno.png                     # Logo PNG
│   ├── screenshots/                  # Documentation images
│   └── ...
│
├── next.config.js                    # Next.js configuration
├── theme.config.tsx                  # Nextra theme configuration
├── mdx-components.tsx                # MDX components config
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind CSS config
├── package.json                      # Dependencies
└── pnpm-lock.yaml                    # Lock file

```

## Key Files Explained

### `src/app/layout.tsx`
Root layout for the entire application. Includes:
- Font configuration (Inter)
- ThemeProvider for dark/light mode
- Google Analytics
- Toaster notifications

### `src/app/[[...slug]]/layout.tsx`
```tsx
export { DocsLayout as default } from 'nextra-theme-docs';
```
Uses Nextra's built-in docs layout with theme from `theme.config.tsx`.

### `src/app/[[...slug]]/page.tsx`
```tsx
export { default, generateStaticParams, generateMetadata } from 'nextra/pages';
```
Handles all MDX page rendering, static generation, and metadata.

### `theme.config.tsx`
Nextra theme configuration including:
- Logo
- Navigation (custom Navbar component)
- Sidebar settings
- Footer
- Search configuration

### `content/`
All MDX documentation files organized by topic. Each directory contains:
- `_meta.js` - Navigation and ordering configuration
- `.mdx` files - Documentation pages

### `mdx-components.tsx`
Required for Next.js App Router to handle MDX components. Can be extended with custom components.

## Import Aliases

All imports use the `@` alias for clean paths:

```tsx
// ✅ Good
import { Navbar } from '@/components/navbar';
import { utils } from '@/lib/utils';

// ❌ Avoid
import { Navbar } from '../../../src/components/navbar';
```

## Content Organization

Each documentation section follows this structure:
```
section-name/
├── _meta.js          # Navigation config
├── overview.mdx      # Section overview
├── topic1.mdx        # Topic pages
├── topic2.mdx
└── subsection/       # Nested sections
    ├── _meta.js
    └── detail.mdx
```

## Adding New Pages

1. Create MDX file in appropriate `content/` directory
2. Add entry to nearest `_meta.js` file
3. Use `@/components/` for component imports
4. Run `pnpm run buildCache` to update search index

Example `_meta.js`:
```js
export default {
  'overview': 'Overview',
  'getting-started': 'Getting Started',
  'advanced': 'Advanced Topics'
}
```

## Development Workflow

```bash
# Start dev server
pnpm run dev

# Rebuild search cache (if content changes aren't reflected)
pnpm run buildCache

# Build for production
pnpm run build

# Start production server
pnpm run start
```

## Component Usage in MDX

```mdx
import { Callout } from 'nextra/components';
import BrunoButton from '@/components/BrunoButton';

# My Page

<Callout type="info">
  This is a callout!
</Callout>

<BrunoButton href="/download">
  Download Bruno
</BrunoButton>
```

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Documentation**: Nextra 4.6.0
- **UI**: React 19.2.0
- **Styling**: Tailwind CSS 3.4
- **Components**: Radix UI, Shadcn UI
- **Icons**: Lucide React
- **Code Editor**: Monaco Editor
- **Package Manager**: pnpm

---

For more details, see `MIGRATION_NOTES.md`

