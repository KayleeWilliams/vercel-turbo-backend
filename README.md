# vercel-turbo-backend

Minimal A/B repro for Vercel runtime packaging with source-first workspace packages.

## Purpose

This repo compares two backend shapes that import the same source-first workspace packages:

- `apps/plain-instance-router`: plain Vercel app mirroring the current `consent-instance` packaging model
- `apps/next-instance-router`: Next.js backend app using Route Handlers and `transpilePackages`

Both apps import:

- `@repo/shared-config`
- `@repo/shared-db`

Both shared packages intentionally export raw TypeScript source:

- `exports["."] = "./src/index.ts"`

## Workspace Layout

- `apps/plain-instance-router`
- `apps/next-instance-router`
- `packages/shared-db`
- `packages/shared-config`

## Local Commands

```bash
pnpm install
pnpm typecheck
pnpm dev:plain
pnpm dev:next
```

Package-specific checks:

```bash
pnpm --filter @repo/shared-db typecheck
pnpm --filter @repo/shared-config typecheck
```

## Endpoints

### Plain app

- Route: `GET /api`
- Returns:

```json
{
  "service": "shared-config-service",
  "dbProvider": "mock-postgres",
  "packageSource": "@repo/shared-config/src/index.ts",
  "runtime": "plain-vercel-app"
}
```

### Next app

- Route: `GET /api/config`
- Returns:

```json
{
  "service": "shared-config-service",
  "dbProvider": "mock-postgres",
  "packageSource": "@repo/shared-config/src/index.ts",
  "runtime": "next-backend-app"
}
```

## Deploy Instructions

Create two separate Vercel projects from this same repo.

### Plain app

- Root directory: `apps/plain-instance-router`
- Expected live endpoint: `/api`

### Next app

- Root directory: `apps/next-instance-router`
- Expected live endpoint: `/api/config`

## What To Record

For `plain-instance-router`:

- deploy success or failure
- runtime invocation success or failure
- exact error text if it fails
- whether the error references `src/index.ts` under `node_modules`

For `next-instance-router`:

- deploy success or failure
- route invocation success or failure
- whether the route successfully returns data from the shared workspace packages

## Comparison Matrix

| App | Framework | Package contract | Deploy model | Live result | Notes |
| --- | --- | --- | --- | --- | --- |
| plain-instance-router | Plain Vercel function | Source-first `src/*.ts` exports | `includeFiles` ships workspace packages | Pending | Control app mirroring current `consent-instance` style |
| next-instance-router | Next.js Route Handlers | Source-first `src/*.ts` exports | Next build with `transpilePackages` | Pending | Experimental app |

## Expected Outcome

The hypothesis is:

- the plain app is likely to fail at deployed runtime with package resolution into raw TypeScript
- the Next app may succeed because the Next build pipeline transpiles the workspace packages

If both fail, the problem is the package contract rather than the app framework.
