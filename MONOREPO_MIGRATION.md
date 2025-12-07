# Monorepo Migration Checklist

## Pre-Migration
- [x] Review existing codebase
- [x] Backup current state (backup-before-monorepo branch)
- [x] Create migration branch (feat/monorepo-migration)
- [ ] Document current functionality

---

## Phase 0: Untangle existing apps (45–60 min)

**Goal:** Identify which code belongs to which app before moving anything. This prevents dragging dead features into production.

### 0.1 Inventory entry points & routers

**In Cursor, do these global searches:**
- `main.tsx` or `main.jsx`
- `createRoot(`
- `createBrowserRouter` / `BrowserRouter`
- `vite.config.ts`, `vite.config.js`
- `index.html` files under `/` or `/public`

**TODOs:**
- [ ] List each "root" you find:
  ```
  Roots found:
  - src/main.tsx → primary SPA
  - src/legacyMain.tsx → old build (if exists)
  - src/adminMain.tsx → maybe toolkit (if exists)
  ```

- [ ] Decide:
  - Which one is the real app you will ship as `apps/web` (AgroSoluce web)
  - Which ones are legacy/experimental and should be archived (not part of v1 launch)

**Rule:** If you find more than one `main.tsx` actually still wired to build, only one should survive into the new `apps/web`.

### 0.2 Map routes → conceptual apps

**In the current router(s), look for:**
- `/` (landing / marketing)
- `/directory`, `/cooperative`, `/marketplace`
- `/workspace/:coop_id`
- `/pilot/:pilot_id`
- `/assessment`
- `/farmers-first`
- `/admin/*`, `/dev/*`, `/playground/*`

**In Cursor, global search:**
- `"/workspace"`
- `"/pilot"`
- `"/assessment"`
- `"/farmers-first"`
- `"/dashboard"`
- `"/admin"`

**Build a table:**

| Routes | Conceptual App |
|--------|----------------|
| `/`, `/directory`, `/cooperative/:id`, `/about` | **MARKET** (public) |
| `/workspace/:coop_id`, `/pilot/:pilot_id`, `/assessment`, `/farmers-first` | **WORKSPACE** (coop cockpit) |
| `/admin/*`, `/dev/*`, `/playground/*`, `/old-*` | **TOOLKIT/LEGACY** |

**TODOs:**
- [ ] Tag each route tree as: Market, Workspace, or Toolkit/Legacy
- [ ] Decide if Toolkit is part of launch or parked

### 0.3 Identify duplicated / conflicting configs

**Search for:**
- `vite.config`
- `tailwind.config`
- `tsconfig.json`
- `.eslintrc`

**TODOs:**
- [ ] Mark one Vite config as primary for the shipping app
- [ ] Mark others as:
  - Deleted
  - Or to be moved into `apps/toolkit` or `apps/legacy` later

### 0.4 Mark legacy / junk now (don't drag it into the monorepo)

**Create a folder at root:**
- [ ] Create `legacy/` folder

**In Cursor:**
- [ ] Move obviously dead stuff into `legacy/`:
  - Old "v1" pages no longer referenced
  - Experiment components not imported anywhere
  - Half-broken prototypes

**Rule:** If you're not sure it's needed for v1 and it's not imported anywhere → move to `legacy/`. You can always resurrect it later.

### 0.5 Verify chosen app still runs

- [ ] Confirm the chosen app can still run via `npm run dev` (or `pnpm dev`)
- [ ] Confirm build still works: `npm run build`
- [ ] No broken imports from moving files to `legacy/`

---

## Phase 1: Structure (30 min, AFTER Phase 0)

**Goal:** Create monorepo structure and move cleaned code.

### Target Structure

```
agrosoluce/
  package.json          # root, with workspaces
  pnpm-lock.yaml        # or package-lock.json
  tsconfig.base.json    # shared TS config
  turbo.json            # optional, if you want Turborepo later
  apps/
    web/                # primary shipping app (current AgroSoluce)
    workspace/          # cooperative cockpit (if separate)
    toolkit/            # admin/tools (if separate)
  packages/
    ui/                 # shared UI components
    config/             # shared config (tailwind, eslint, vite)
    types/              # shared types (cooperative, farmer, assessment, etc.)
    supabase/           # shared Supabase client wrapper (optional)
    database/           # database migrations
  legacy/               # dead code (excluded from builds)
```

**TODOs:**
- [ ] Install Turborepo (optional): `pnpm add -D turbo` or `npm install turbo -D`
- [ ] Create `apps/` directory structure
- [ ] Create `packages/` directory structure
- [ ] Move **cleaned** `src/` to `apps/web/src/`
- [ ] Move `public/` to `apps/web/public/`
- [ ] Move `index.html` to `apps/web/index.html`
- [ ] Move `vite.config.ts` to `apps/web/vite.config.ts`
- [ ] Move `database/` to `packages/database/`
- [ ] Create `turbo.json` (optional, for later)
- [ ] Update root `package.json` with workspaces (see `AGROSOLUCE_MONOREPO_TODOS.md` for examples)

---

## Phase 2: Configuration (20 min)

**Goal:** Set up shared configs and fix import paths.

**TODOs:**
- [ ] Create root `tsconfig.base.json` (see `AGROSOLUCE_MONOREPO_TODOS.md`)
- [ ] Create `apps/web/package.json` (update name to `@agrosoluce/web`)
- [ ] Update `apps/web/tsconfig.json` to extend root config
- [ ] Create `packages/types/package.json`
- [ ] Create `packages/ui/package.json` (if sharing UI components)
- [ ] Create `packages/config/package.json` (if sharing configs)
- [ ] Create `packages/supabase/package.json` (optional, for later)
- [ ] Update import paths in `apps/web/`:
  - Fix relative imports that broke due to folder depth
  - Update path aliases if needed
- [ ] Configure TypeScript paths in `tsconfig.base.json`

---

## Phase 3: Testing (15 min)

**Goal:** Verify everything still works after the move.

**TODOs:**
- [ ] `pnpm install` (or `npm install`) at root
- [ ] `pnpm run dev:web` (or `npm run dev:web`) → confirm dev server starts
- [ ] Test all existing features:
  - [ ] Home page loads
  - [ ] Directory page loads
  - [ ] Workspace loads with `coop_id`
  - [ ] Assessment flow works
  - [ ] Farmers First works
- [ ] Verify database connection (Supabase)
- [ ] `pnpm run build:web` → confirm build passes
- [ ] Check Vercel deployment config (update root directory if needed)

---

## Phase 4: Shared Packages (optional, later)

**Goal:** Extract truly shared code (don't overdo it on day 1).

**TODOs:**
- [ ] Extract shared types to `packages/types/`:
  - `CanonicalCooperativeDirectory`
  - `AssessmentRecord`, `AssessmentResults`
  - `CoverageMetrics`
  - `ReadinessSnapshot`
- [ ] Update imports: `@/types/*` → `@agrosoluce/types/*`
- [ ] Share UI components only if used by multiple apps
- [ ] Share Supabase client wrapper only if needed

**Rule:** Only share what is obviously common. Don't try to share everything on day 1.

---

## Phase 5: Deployment

**Goal:** Update deployment configs for monorepo structure.

**TODOs:**
- [ ] Update Vercel/Netlify configuration:
  - Root directory: `apps/web`
  - Build command: `pnpm run build` (or `npm run build`)
  - Output directory: `dist` (typically unchanged)
  - Install command: `pnpm install` (or `npm install`)
- [ ] Set environment variables in platform UI:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_SUPABASE_SCHEMA`
- [ ] Test production build locally: `pnpm run build:web`
- [ ] Deploy and verify:
  - [ ] Production URL works
  - [ ] SPA routing works (no 404 on deep links like `/workspace/:coop_id`)
  - [ ] Supabase connections work
- [ ] Merge to main

---

## Final Verification – Monorepo + Launch Alignment

**Goal:** Ensure the monorepo structure doesn't break launch readiness.

### Codebase sanity
- [ ] There is exactly ONE shipping app for now: `apps/web`
- [ ] `apps/web/src/` contains:
  - Marketplace
  - Directory
  - Cooperative Workspace
  - Assessment
  - Farmers First
- [ ] There are NO extra `main.tsx` or React roots outside `apps/web`
- [ ] `legacy/` exists and is excluded from build

### Tooling sanity
- [ ] `pnpm install` (root) works with workspaces
- [ ] `pnpm run dev:web` runs the same app you intend to launch
- [ ] `pnpm run build:web` builds `apps/web` successfully

### Functional sanity (use your launch checklist)
- [ ] Run through `AGROSOLUCE_LAUNCH_VERIFICATION.md` on the **built app**:
  - [ ] All key routes work
  - [ ] Assessment persists
  - [ ] Farmers First works
  - [ ] No illegal compliance claims
  - [ ] Coverage metrics update correctly

### Deployment sanity
- [ ] Vercel/Netlify project points to `apps/web` as the app root
- [ ] Build command is aligned with monorepo (e.g., `pnpm run build:web`)
- [ ] Environment variables are set correctly (Supabase URL, anon key, schema)
- [ ] Production URL works with SPA routing (no 404 on deep links like `/workspace/:coop_id`)

---

## Rollback Plan

If anything breaks:

```bash
git checkout main
git branch -D feat/monorepo-migration
git checkout backup-before-monorepo
```

Or if you've already merged:

```bash
git revert <migration-commit-hash>
```

---

## Reference

- See `AGROSOLUCE_MONOREPO_TODOS.md` for detailed package.json examples and step-by-step instructions
- See `AGROSOLUCE_LAUNCH_VERIFICATION.md` for post-migration functional testing