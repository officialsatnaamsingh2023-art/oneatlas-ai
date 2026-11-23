# OneAtlas AI

**Discover. Compare. Understand AI Models.**

OneAtlas AI is a responsive AI-model discovery workspace built with Next.js, TypeScript, Tailwind CSS, Prisma and PostgreSQL. It brings model catalog browsing, provider discovery, pricing/context comparisons and personal shortlists into one interface.

## Included modules

- **Dashboard:** database-backed totals for models, providers, categories and featured models.
- **Explore Models:** server-backed search, category/provider filters, featured/open-weight filters and sorting.
- **Model Details:** individual model information, context window, speed and listed token pricing.
- **Compare Models:** side-by-side model comparison.
- **AI Providers:** provider directory generated from database records.
- **Rankings:** transparent catalog ordering using featured status, listed input price and context size. It is not a third-party benchmark.
- **Favorites:** save and remove models using the heart control; favorites are stored in the current browser.
- **Settings:** default sort, compact cards, currency display, reduced-motion preference, settings export/reset and database health link.
- **API:** model list/detail endpoints with query filters, bounded pagination and a database health endpoint.
- **Responsive UI:** mobile navigation drawer and responsive layouts.

## Tech stack

| Technology | Purpose |
|---|---|
| Next.js App Router | Web application and API routes |
| React + TypeScript | UI and type safety |
| Tailwind CSS | Responsive styling |
| Prisma ORM | Database access |
| PostgreSQL | Model catalog storage |
| Lucide React | Icons |

## Requirements

- Node.js 20.9+ (Node.js 22 LTS recommended)
- npm
- PostgreSQL database (Neon, Supabase or local PostgreSQL)

## Run locally (Windows PowerShell)

1. Extract the project ZIP and open its folder in VS Code.
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create your environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

4. Open `.env` and replace the example `DATABASE_URL` with your PostgreSQL connection string. Keep the real `.env` file private and do not commit it.

5. Generate Prisma Client:

   ```powershell
   npm run db:generate
   ```

6. Apply committed migrations:

   ```powershell
   npm run db:migrate
   ```

   For local schema development, use `npm run db:dev` instead.

7. Insert the starter catalog:

   ```powershell
   npm run db:seed
   ```

8. Start the application:

   ```powershell
   npm run dev
   ```

9. Open `http://localhost:3000`.

## Useful commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start local development |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check TypeScript |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Apply migrations in deployment |
| `npm run db:dev` | Create/apply a development migration |
| `npm run db:seed` | Insert/update starter model records |
| `npm run db:studio` | Open Prisma Studio |

## API endpoints

### `GET /api/models`

Supported query parameters:

- `search`: search model name, provider, description or category
- `provider`: exact provider name
- `category`: exact category name
- `speed`: exact speed label
- `featured=true|false`
- `openSource=true|false`
- `sort=name|newest|price|outputPrice|context`
- `page`: page number (minimum 1)
- `limit`: page size (1–100)

Example:

```text
/api/models?search=reasoning&sort=price&page=1&limit=10
```

### `GET /api/models/:id`

Returns one model record.

### `GET /api/health`

Checks application-to-PostgreSQL connectivity. A `503` response means the database is unavailable.

## Database and deployment notes

- Set `DATABASE_URL` in your hosting provider's environment-variable settings (for example, Vercel → Project → Settings → Environment Variables).
- Run `npm run db:migrate` as part of deployment after configuring the production database.
- Run `npm run db:seed` once if the database needs the starter catalog.
- Redeploy after changing environment variables.
- Never upload or commit `.env`, database credentials, API keys or private certificates.

## Data accuracy and scope

The included seed records are starter/demo catalog entries. Provider prices, model names, context limits and availability change over time; verify current specifications with the provider before relying on them. INR display uses a fixed illustrative conversion of ₹83 per USD and is not a live exchange-rate feed. Favorites and preferences are stored in local browser storage and are not account-synced.

Rankings are explicitly a simple catalog sort—not measured benchmark results. The project does not currently include user accounts, cloud-synced preferences, live provider pricing ingestion, model inference/chat execution, billing or an admin authentication system.

## Project structure

```text
oneatlas-ai/
├── app/
│   ├── api/
│   │   ├── health/route.ts
│   │   └── models/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── components/
│   │   ├── AppProviders.tsx
│   │   ├── ModelCard.tsx
│   │   ├── ModelFilters.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── favorites/page.tsx
│   ├── models/
│   ├── compare/page.tsx
│   ├── providers/page.tsx
│   ├── rankings/page.tsx
│   ├── settings/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── prisma.ts
│   └── types.ts
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── .env.example
└── package.json
```

## Author

**Satnaam Singh**  
GitHub: [officialsatnaamsingh2023-art](https://github.com/officialsatnaamsingh2023-art)
