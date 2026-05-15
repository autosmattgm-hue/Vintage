# GitHub + Vercel Deployment Checklist

## Clean Upload File

Use this ZIP:

`paris-fashion-vintage-github.zip`

Do not upload:

- `node_modules`
- `.next`
- `.tmp`
- `image.png`
- `index.jsx`
- `tsconfig.tsbuildinfo`

The production shop image is already included at:

`public/images/paris-fashion-vintage-shop.png`

## GitHub Browser Upload

1. Go to GitHub and create a new repository.
2. Name it `paris-fashion-vintage`.
3. Keep it public or private.
4. Do not add a README if GitHub asks, because this project already has one.
5. Extract `paris-fashion-vintage-github.zip`.
6. Open the extracted folder.
7. Drag all files and folders from inside the extracted folder into the GitHub upload screen.
8. Commit message: `Initial Paris Fashion Vintage website`.
9. Click `Commit changes`.

## Vercel Deployment

1. Go to Vercel.
2. Click `Add New` then `Project`.
3. Import the GitHub repository.
4. Framework Preset: `Next.js`.
5. Build Command: `npm run build`.
6. Install Command: `npm install`.
7. Output Directory: leave empty/default.
8. Click `Deploy`.

## Optional Environment Variables

The website can deploy for presentation without these, but use them for production:

```bash
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
JWT_SECRET=replace-with-a-strong-secret
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

## After Deployment

Open these links:

- `/`
- `/presentation`
- `/shop`
- `/product/vintage-saint-laurent-bag`
- `/contact`

Show the client `/presentation` first.
