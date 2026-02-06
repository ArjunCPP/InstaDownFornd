# IMPORTANT: Production URL Configuration

## Required Action

Before deploying to production, you MUST update the following files with your actual production URL:

### 1. Environment Variables
File: `.env.local`

Replace:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

With your production URL:
```
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
```

### 2. Sitemap
File: `public/sitemap.xml`

Update line 4 with your production URL:
```xml
<loc>https://your-actual-domain.com</loc>
```

Update line 5 with current date:
```xml
<lastmod>2026-02-06</lastmod>
```

### 3. Robots.txt
File: `public/robots.txt`

Update lines 6 and 9 with your production URL:
```
Host: https://your-actual-domain.com
Sitemap: https://your-actual-domain.com/sitemap.xml
```

## Why This Matters

- **SEO**: Search engines use the canonical URL and sitemap to index your site properly
- **Social Sharing**: Open Graph images and meta tags need the correct domain
- **Analytics**: Proper URLs help track your site's performance

## After Updating

Once you've updated these files with your production URL:
1. Rebuild the application: `npm run build`
2. Deploy to your hosting service
3. Test the site to ensure all URLs are correct
4. Submit your sitemap to Google Search Console
