# TravelWell Delight — Developer README

> Full-stack travel booking platform built with Next.js 14, TypeScript, MongoDB, Razorpay and Resend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jose) + HTTP-only cookies |
| Payments | Razorpay |
| Email | Resend |
| Skeleton | react-loading-skeleton |
| Icons | Lucide React |
| Hosting | Vercel |

---

## Prerequisites

Make sure these are installed on your machine before starting:

- **Node.js** v18 or higher → https://nodejs.org
- **npm** v9 or higher (comes with Node)
- **Git** → https://git-scm.com

Check your versions:
```bash
node -v
npm -v
git --version
```

---

## 1. Clone the project

```bash
git clone https://github.com/yourusername/travelwell.git
cd travelwell
```

---

## 2. Install dependencies

```bash
npm install
```

This installs everything in `package.json` including:
- next, react, react-dom
- mongoose, razorpay, resend, jose
- tailwindcss, lucide-react
- react-loading-skeleton
- next-themes, next-cloudinary

---

## 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```bash
# On Windows
copy .env.example .env.local

# On Mac / Linux
cp .env.example .env.local
```

Then open `.env.local` and fill in your values:

```bash
# ── App ────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=TravelWell Delight

# ── MongoDB Atlas ───────────────────────────────────────
# Get from: mongodb.com/atlas → Connect → Drivers
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/travelwell?retryWrites=true&w=majority

# ── JWT Auth ────────────────────────────────────────────
JWT_SECRET=your-super-secret-key-change-this-in-production

# ── Razorpay ────────────────────────────────────────────
# Get from: dashboard.razorpay.com → Settings → API Keys
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

# ── Resend (email) ──────────────────────────────────────
# Get from: resend.com → API Keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
ENQUIRY_RECIPIENT_EMAIL=travelwelldelight@gmail.com

# ── WhatsApp ────────────────────────────────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999

# ── Cloudinary (optional — for image uploads) ──────────
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=000000000000000
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 4. Run the development server

```bash
npm run dev
```

Open your browser and go to:
```
http://localhost:3000
```

The server auto-reloads when you save any file.

---

## 5. All available commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server (run after build)
npm run start

# Check for TypeScript and lint errors
npm run lint

# Run both build + start together
npm run build && npm run start
```

---

## 6. Project folder structure

```
travelwell/
├── public/                     # Static files (logo, images, fonts)
│   ├── logo.png
│   └── photos/                 # Polaroid photos for about page
│
├── src/
│   ├── app/                    # Next.js App Router pages + API routes
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles + CSS variables
│   │   ├── loading.tsx         # Homepage skeleton
│   │   ├── packages/           # Package listing + detail pages
│   │   ├── destinations/       # Destinations page
│   │   ├── enquiry/            # Enquiry form page
│   │   ├── about/              # About page
│   │   ├── profile/            # User profile page
│   │   ├── booking/            # Booking + payment page
│   │   └── api/                # Backend API routes
│   │       ├── auth/           # signup, login, logout, me
│   │       ├── booking/        # create, verify
│   │       ├── enquiry/        # POST enquiry
│   │       └── user/           # profile GET + PATCH
│   │
│   ├── components/             # All React components
│   │   ├── layout/             # Navbar, Footer
│   │   ├── home/               # HeroSection, FeaturedPackages, etc.
│   │   ├── packages/           # PackageDetailClient
│   │   ├── booking/            # BookingClient
│   │   ├── enquiry/            # EnquiryForm
│   │   ├── profile/            # ProfileClient
│   │   ├── auth/               # AuthModal
│   │   └── ui/                 # Skeleton, CustomCursor, ThemeToggle
│   │
│   ├── context/                # AuthContext, ThemeProvider
│   ├── data/                   # packages.ts, destinations.ts (hardcoded)
│   ├── hooks/                  # useScrollReveal
│   ├── lib/                    # mongodb.ts, auth.ts, resend.ts, utils.ts
│   ├── models/                 # User, Booking, Enquiry (Mongoose schemas)
│   └── types/                  # TypeScript type definitions
│
├── .env.local                  # Your secrets (never commit this)

├── .gitignore
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 7. First time MongoDB setup

1. Go to **mongodb.com/atlas** and create a free account
2. Create a new project → Build a Database → M0 Free tier
3. Create a database user: Database Access → Add User
4. Whitelist your IP: Network Access → Add IP → Allow from anywhere (0.0.0.0/0)
5. Get connection string: Connect → Drivers → copy the URI
6. Paste into `MONGODB_URI` in `.env.local` — replace `<password>` with your actual password

---

## 8. First time Resend setup

1. Go to **resend.com** and sign up
2. API Keys → Create API Key → copy it
3. Paste into `RESEND_API_KEY` in `.env.local`
4. For testing use `RESEND_FROM_EMAIL=onboarding@resend.dev`
5. For production verify your domain in Resend → Domains



## 9 Common errors and fixes

```bash
# MongoDB connection refused
→ Check MONGODB_URI in .env.local
→ Remove < > brackets around password
→ Check IP whitelist in Atlas (allow 0.0.0.0/0)

# Module not found errors
→ npm install

# Port 3000 already in use
→ npm run dev -- -p 3001
→ Then open localhost:3001

# Environment variables not loading
→ Restart dev server after editing .env.local
→ Variables must start with NEXT_PUBLIC_ to be available in browser

# TypeScript errors on build
→ npm run lint
→ Fix reported errors before deploying

# Skeleton CSS not loading
→ Make sure react-loading-skeleton is installed: npm install react-loading-skeleton
```

---

## 10 Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Add all your `.env.local` variables in:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

---

## 11. Git workflow (recommended)

```bash
# Check what changed
git status

# Stage all changes
git add .

# Commit with a message
git commit -m "feat: add skeleton loading to packages page"

# Push to GitHub
git push origin main
```

Good commit message prefixes:
- `feat:` new feature
- `fix:` bug fix
- `style:` UI changes
- `refactor:` code cleanup
- `docs:` documentation

---

## Contact

**TravelWell Delight**
Email: travelwelldelight@gmail.com
WhatsApp: +91 XXXXXXXXXX
