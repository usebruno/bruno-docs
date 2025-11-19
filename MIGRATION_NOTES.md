# Nextra 4 + Next.js 15 Migration Complete ✅

## Summary

Successfully migrated Bruno Docs from Nextra 3 (Pages Router) to **Nextra 4.6.0** with **Next.js 15.5.6** and **React 19** using the **App Router**.

## What Was Changed

### 1. Package Updates
- **Next.js**: `14.1.0` → `15.5.6`
- **React & React-DOM**: `^18` → `^19.2.0`
- **Nextra**: `^3.x` → `^4.6.0`
- **nextra-theme-docs**: `^3.x` → `^4.6.0`
- **@types/react**: `^18` → `^19`
- **@types/react-dom**: `^18` → `^19`
- **eslint-config-next**: `14.1.0` → `^15.0.0`

### 2. Directory Structure Changes
```
OLD (Pages Router):
src/pages/          → All MDX content
src/app/           → Old layout (unused)

NEW (App Router):
src/app/           → Next.js App Router structure
  ├── layout.tsx   → Root layout
  ├── globals.css  → Global styles
  └── [[...slug]]/ → Dynamic catch-all route
      ├── layout.tsx  → Nextra theme layout
      └── page.tsx    → MDX page renderer
content/           → All MDX content (migrated from pages)
src/pages-old/     → Backup of old pages directory
```

### 3. Configuration Updates

#### next.config.js
- Removed `theme` and `themeConfig` from nextra options (handled differently in v4)
- Added `contentDirBasePath: '/content'` to specify MDX content location
- Kept all redirects and webpack config

#### theme.config.tsx
- Removed unused `useRouter` import from `next/router`
- Configuration structure remains compatible with Nextra 4

#### tsconfig.json
- No changes needed (already compatible)

### 4. Component and Import Fixes
- Created `mdx-components.tsx` at root (required for App Router MDX)
- Fixed all relative component imports in MDX files:
  - `../../components/` → `@/components/`
  - `../../../components/` → `@/components/`
- Fixed syntax error in `data-driven-testing.mdx` (mismatched quotes)

### 5. Cache Scripts Updated
- Updated `utils/cache/buildFileCache.ts` to use `content/` instead of `src/pages/`
- Updated `utils/cache/buildIndexCache.ts` to use `content/` instead of `src/pages/`

## How to Use

### Development
```bash
pnpm run dev
# Server runs at http://localhost:3000
```

### Build for Production
```bash
pnpm run build
pnpm run start
```

### Build Cache (runs automatically before build)
```bash
pnpm run buildCache
```

## Key Differences: Nextra 3 vs Nextra 4

### Pages Router (Nextra 3)
- Content in `src/pages/`
- Uses `_app.tsx` for global layout
- Theme config in `next.config.js`
- Uses `next/router` for navigation

### App Router (Nextra 4)
- Content in `content/` directory
- Uses `src/app/layout.tsx` for global layout
- Theme config in separate `theme.config.tsx`
- Uses `next/navigation` for navigation
- Requires `[[...slug]]` dynamic route
- Requires `mdx-components.tsx` file

## Notes

- The old `src/pages` directory has been backed up to `src/pages-old/`
- All MDX files were successfully migrated to the `content/` directory
- Custom components (Navbar, Head, etc.) work without modification
- All redirects remain functional

## Benefits of the Migration

1. ✅ **Modern Stack**: Using the latest stable versions of Next.js 15 and React 19
2. ✅ **App Router**: Better performance with React Server Components
3. ✅ **Nextra 4**: Latest features and improvements
4. ✅ **Future-Proof**: Built on the latest Next.js architecture

## Warnings to Note

- Some `_meta.js` files have parse warnings in cache scripts (they still work)
- Git timestamp warnings for content files (normal, files are new in content/ directory)
- Multiple lockfile warning (can be silenced by setting `outputFileTracingRoot` in next.config.js)

## Cleanup (Optional)

After verifying everything works, you can optionally:
```bash
# Remove old pages backup
rm -rf src/pages-old

# Remove old app directory files
# (already done during migration)
```

---

**Migration completed on:** $(date)
**Server Status:** ✅ Running successfully at http://localhost:3000

