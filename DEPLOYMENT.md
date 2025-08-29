# Deployment Guide

This guide covers deployment options for the Simpli Roofing & Exteriors website.

## Prerequisites

Before deploying, ensure you have:
1. All environment variables configured
2. Built and tested the application locally
3. Committed all changes to your Git repository

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the creators of Next.js and provides the best deployment experience.

#### Steps:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Your Repository**
   - Click "New Project"
   - Import your GitHub repository
   - Select the `simpli-exteriors` repository

3. **Configure Environment Variables**
   - In the Vercel dashboard, go to Settings > Environment Variables
   - Add the following variables:
   ```
   GHL_WEBHOOK_URL=your_webhook_url
   GHL_API_KEY=your_api_key (optional)
   RESEND_API_KEY=your_resend_key (optional)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id (optional)
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - You'll receive a production URL (e.g., `simpli-exteriors.vercel.app`)

5. **Custom Domain Setup**
   - Go to Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Option 2: Netlify

#### Steps:

1. **Build Your Application**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=.next
   ```

4. **Configure Environment Variables**
   - Go to Netlify dashboard
   - Site Settings > Environment Variables
   - Add your environment variables

### Option 3: AWS Amplify

#### Steps:

1. **Install AWS Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   ```

3. **Add Hosting**
   ```bash
   amplify add hosting
   ```

4. **Deploy**
   ```bash
   amplify publish
   ```

### Option 4: Self-Hosted (VPS/Cloud Server)

#### Requirements:
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt recommended)

#### Steps:

1. **Clone Repository on Server**
   ```bash
   git clone https://github.com/[your-username]/simpli-exteriors.git
   cd simpli-exteriors
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File**
   ```bash
   nano .env.local
   # Add your environment variables
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Install PM2**
   ```bash
   npm install -g pm2
   ```

6. **Start Application with PM2**
   ```bash
   pm2 start npm --name "simpli-exteriors" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name simpli-exteriors.com www.simpli-exteriors.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

8. **Setup SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d simpli-exteriors.com -d www.simpli-exteriors.com
   ```

## Post-Deployment Checklist

### Essential Checks

- [ ] All pages load correctly
- [ ] Navigation menu works on mobile and desktop
- [ ] Contact forms submit successfully
- [ ] GHL webhook integration is functional
- [ ] Images load properly
- [ ] SSL certificate is active
- [ ] Google Analytics is tracking

### Performance Checks

- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test page load times (< 3 seconds)
- [ ] Verify image optimization
- [ ] Check mobile responsiveness

### SEO Checks

- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags are present
- [ ] Check Open Graph tags for social sharing
- [ ] Test structured data with Google's Rich Results Test

## Continuous Deployment

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        env:
          GHL_WEBHOOK_URL: ${{ secrets.GHL_WEBHOOK_URL }}
          GHL_API_KEY: ${{ secrets.GHL_API_KEY }}
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Monitoring

### Recommended Tools

1. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - StatusCake

2. **Error Tracking**
   - Sentry
   - LogRocket
   - Bugsnag

3. **Analytics**
   - Google Analytics
   - Microsoft Clarity
   - Hotjar

### Setup Monitoring Alerts

Configure alerts for:
- Site downtime
- Form submission failures
- High error rates
- Performance degradation

## Rollback Procedure

If issues occur after deployment:

### Vercel
1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." menu > "Promote to Production"

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard [commit-hash]
git push --force origin main
```

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to Git
   - Use different keys for development and production
   - Rotate API keys regularly

2. **Headers**
   - Configure security headers in `next.config.js`
   - Use Content Security Policy (CSP)
   - Enable HSTS

3. **Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Use `npm audit` regularly

## Support

For deployment issues:
1. Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
2. Review error logs in your hosting platform
3. Verify all environment variables are set correctly
4. Test locally with production build: `npm run build && npm run start`

## Common Issues

### Build Failures
- Clear cache: `rm -rf .next node_modules && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set

### Form Submission Issues
- Verify GHL webhook URL is correct
- Check CORS settings if using custom domain
- Review API logs for error messages

### Performance Issues
- Enable caching headers
- Optimize images (use WebP format)
- Implement lazy loading for below-fold content
- Use CDN for static assets