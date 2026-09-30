# WEBIND GROUP — Digital Operating System & Ecosystem Platform

> **WEBIND GROUP** is a parent technology conglomerate architecting sovereign brands, scalable platforms, and next-generation venture ecosystems.
>
> Built with an **App-First Architecture**: on mobile devices, it operates like a fluid, high-performance native application; on desktop, it intelligently transforms into a cinematic, spacious command experience.

---

## ✦ System Architecture & Highlights

- **Aesthetic Direction**: Pure Black (`#000000`), High-Contrast White, Deep Dark Zinc surfaces, precision typography (`Inter`), and zero generic gradients or cluttered noise.
- **First Launch Experience**: Pure black splash screen with custom `WEBIND` symbol light sweep, followed by a 4-screen interactive onboarding journey (gesture drag/swipe on mobile, keyboard/arrow on desktop).
- **Returning User Optimization**: Bypasses onboarding and enters with rapid splash straight to the app. Replay onboarding available anytime from `Settings / More`.
- **Ecosystem Operating System**:
  - **Mobile Shell**: Native-like bottom navigation (`HOME`, `BRANDS`, `ABOUT`, `MORE`), safe-area insets (`env(safe-area-inset)`), sticky headers, tactile press feedback.
  - **Desktop Transformation**: Floating minimal header dock, spacious bento grids, cinematic typography, and global command palette (`⌘K` or `/`).
  - **Dynamic Brands Hub**: Live category filtering, status segmentation (`ACTIVE`, `COMING_SOON`, `ARCHIVED`), and shared element transitions.
  - **Brand Detail Mini-Apps**: Individual dedicated portals (`/brands/:slug`) with logo, story, interactive products/modules matrix, services, lightbox gallery, live links, and coming soon presentations.
- **Production Admin CMS (`/admin`)**:
  - Linear/Raycast SaaS aesthetic.
  - Superadmin authentication with JWT, bcrypt encryption, and session expiration guards.
  - Executive telemetry dashboard with brand aggregations and live activity audit logs.
  - **7-Step Brand Creation & Edit Wizard**:
    1. *Identity* (Name, auto-slug, tagline, category, accent color)
    2. *Brand Information* (Short description, full overview, story, launch date)
    3. *Media* (Logo upload, hero media, gallery artifacts)
    4. *Links & Products* (Live URLs, social channels, modular products & services)
    5. *SEO* (Meta title, meta description, OG social images)
    6. *Preview* (Live interactive card and detail preview)
    7. *Publish & Order* (Status, featured toggle, display priority)
  - **Brand Reordering**: Instant up/down priority controls and bulk write persistence; the public ecosystem respects order automatically.
  - **Homepage CMS**: Complete control over Hero headline, subtitle, CTA text, company metrics, and announcement bar without developer code changes.
  - **Media Library**: Upload, search, preview lightbox, and one-click URL copying.
  - **System Audit Trail**: Real-time logging of logins, updates, deletions, order shifts, and media uploads.
  - **Global Settings & SEO**: Manage group metadata, default themes, contact channels, and dynamic `robots.txt` / `sitemap.xml`.
- **PWA Ready**: Web manifest, standalone mobile display, app icons, and offline caching service worker.

---

## ✦ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, Tailwind CSS, Framer Motion, Lucide React, Axios |
| **Backend** | Node.js, Express 4, Mongoose 8 / Embedded Engine, JWT, Multer, Helmet, Cors |
| **Database** | MongoDB Atlas / Local MongoDB, with zero-friction Embedded Data Engine fallback |
| **Media Storage** | Local static uploads (`/uploads`) + Cloudinary API ready |
| **PWA & Mobile** | Web App Manifest, Service Worker, Standalone Display, Viewport-fit cover |

---

## ✦ Quick Start & Installation

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 2. Clone and Setup
```bash
# Clone the repository
git clone <repo-url>
cd "founderwork 2.0"

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
cd ..
```

### 3. Environment Configuration
Copy the provided `.env.example` file in the project root or `server/`:
```bash
cp .env.example server/.env
```

Default variables:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=
JWT_SECRET=webind_ultra_secure_jwt_secret_token_key_2026_production
JWT_EXPIRES_IN=7d
ADMIN_DEFAULT_EMAIL=admin@webindgroup.com
ADMIN_DEFAULT_PASSWORD=WebindAdmin2026!
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=development
```

> **Zero-Friction Fallback**: If `MONGODB_URI` is omitted or local MongoDB daemon is not running, the system automatically activates the embedded JSON database engine (`server/data/ecosystem-db.json`), persisting all CRUD, brands, settings, and auth instantly without requiring external databases!

---

## ✦ Running in Development

Run both the API server and the Vite client:

```bash
# Terminal 1: Backend Server (Port 5000)
cd server
npm run dev

# Terminal 2: Frontend Client (Port 5173 / 5174)
cd client
npm run dev
```

Alternatively, from the project root:
```bash
npm run dev
```

Visit:
- **Public Ecosystem**: [http://localhost:5174](http://localhost:5174)
- **Admin CMS Portal**: [http://localhost:5174/admin](http://localhost:5174/admin)
- **API Core Engine**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## ✦ Default Admin Credentials

When the server boots for the first time, it automatically initializes the superadmin account and seed ecosystem data:

| Field | Value |
| :--- | :--- |
| **Email** | `admin@webindgroup.com` |
| **Password** | `WebindAdmin2026!` |
| **Login Portal** | `/admin/login` |

*(Tip: On the `/admin/login` screen, click **"Auto-fill Superadmin Credentials"** for instant 1-click authentication!)*

---

## ✦ Initial Seed Records

Initial seed brands loaded on first initialization:
1. **WEBLETS** (`weblets`): Modern Web Architectures & Component Systems (Category: *Digital & Web Platforms*, Status: *ACTIVE*)
2. **STACK ADDA** (`stack-adda`): Sovereign Developer Community & Engineering Hub (Category: *Developer Ecosystem*, Status: *ACTIVE*)
3. **NEURAL NEXUS** (`neural-nexus`): Autonomous Agentic Intelligence (Category: *Artificial Intelligence*, Status: *COMING SOON*)
4. **CLOUD FORGE** (`cloud-forge`): Sovereign Cloud Orchestration (Category: *SaaS & Cloud Infrastructure*, Status: *COMING SOON*)

> **Critical Rule**: All brand data, descriptions, products, and metrics are completely dynamic. You can freely edit, reorder, archive, or delete these seed records via the Admin CMS and add unlimited new brands!

---

## ✦ REST API Documentation

### Public Endpoints
- `GET /api/brands` — List active/coming soon published brands (supports `?category=`, `?status=`, `?search=`, `?featured=true`)
- `GET /api/brands/:slug` — Retrieve single brand by slug
- `GET /api/settings` — Public site settings, hero configuration, and metrics
- `GET /sitemap.xml` — Dynamically generated XML sitemap with all active brands
- `GET /robots.txt` — Dynamic search engine indexing rules
- `GET /api/health` — Core system health status

### Admin Authentication
- `POST /api/auth/login` — Authenticate admin, returns JWT token & profile
- `GET /api/auth/me` — Verify and return current admin session
- `POST /api/auth/logout` — Revoke and audit logout event

### Admin CMS Endpoints (Protected by JWT)
- `GET /api/admin/dashboard` — Aggregated counts, latest brands, and recent activity
- `GET /api/admin/brands` — Complete brand directory (including archived and drafts)
- `POST /api/admin/brands` — Create brand
- `GET /api/admin/brands/:id` — Single brand details
- `PUT /api/admin/brands/:id` — Update brand
- `DELETE /api/admin/brands/:id` — Remove brand
- `PATCH /api/admin/brands/:id/status` — Quick status toggle (`ACTIVE`, `COMING_SOON`, `ARCHIVED`)
- `PATCH /api/admin/brands/:id/featured` — Toggle hero featured status
- `PATCH /api/admin/brands/order` — Bulk update brand display order
- `GET /api/admin/homepage` / `GET /api/admin/settings` — Read global CMS settings
- `PUT /api/admin/settings` — Update homepage content, hero copy, and metrics
- `GET /api/admin/media` — List uploaded assets
- `POST /api/admin/media` — Upload asset (supports local disk and Cloudinary)
- `DELETE /api/admin/media/:id` — Delete asset
- `GET /api/admin/activity` — Audit trail records with pagination

---

## ✦ Production Deployment

### Frontend (Vercel / Netlify / Cloudflare Pages)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variables: `VITE_API_URL=https://your-backend-api.onrender.com`

### Backend (Render / Railway / Fly.io)
1. Build command: `npm install`
2. Start command: `node server.js`
3. Set environment variables:
   - `PORT=5000`
   - `CLIENT_URL=https://your-domain.com`
   - `MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/webind_prod?retryWrites=true&w=majority`
   - `JWT_SECRET=<secure-random-key>`
   - `CLOUDINARY_CLOUD_NAME=<optional>`
   - `CLOUDINARY_API_KEY=<optional>`
   - `CLOUDINARY_API_SECRET=<optional>`

---

## ✦ Verification & Quality Checklist

- [x] Native app feel on mobile with bottom navigation and safe-area insets
- [x] Desktop transformation with spacious layout and floating header dock
- [x] Splash screen with scale reveal, subtle light sweep, and Webind symbol
- [x] First launch onboarding flow with gesture drag and keyboard support
- [x] Onboarding completion stored locally with instant skip for returning users
- [x] Replay onboarding from Settings / More
- [x] Dynamic brand discovery with instant debounced search and category filters
- [x] Brand detail page with products, services, story, and gallery lightbox
- [x] Special COMING_SOON presentation ("Something new is being built")
- [x] ARCHIVED brands hidden from public view
- [x] Full Brand CMS with structured 7-step wizard modal
- [x] Drag & drop / up-down brand ordering with immediate public sync
- [x] Homepage CMS for editing hero headline, subtitle, CTA, and metrics
- [x] Media library with upload, preview, and URL copying
- [x] Security audit trail logging all administrative actions
- [x] PWA manifest and service worker caching
- [x] Dark mode default with light mode support
- [x] Production-ready fallback architecture with embedded database

---

© 2026 WEBIND GROUP. All rights reserved.
