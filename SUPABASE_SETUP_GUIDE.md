# Complete Supabase Setup Guide

## Step 1: Create Supabase Project

1. **Go to Supabase**: Visit [supabase.com](https://supabase.com)
2. **Sign Up/Login**: Create account or login
3. **New Project**: Click "New Project"
4. **Project Details**:
   - Organization: Select or create
   - Project Name: `portfolio-admin` (or your choice)
   - Database Password: Create strong password
   - Region: Select closest to your users
5. **Wait**: Project setup takes 2-3 minutes

## Step 2: Get Your Credentials

1. **Go to Settings**: Click Settings → API
2. **Copy These Values**:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 3: Create Database Schema

1. **Go to SQL Editor**: In Supabase dashboard
2. **Run Schema**: Copy and paste the entire content from `supabase-schema.sql`
3. **Execute**: Click "Run" to create all tables and initial data

## Step 4: Configure Your Project

1. **Open**: `supabase-config.js`
2. **Replace Credentials**:
   ```javascript
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```
3. **Save**: The file

## Step 5: Test Your Setup

1. **Open**: `index.html` in browser
2. **Check**: Content loads from database
3. **Open**: `admin.html`
4. **Login**: Password is `admin123`
5. **Test**: Add/edit/delete items

## Step 6: Deploy Your Site

### Option A: Netlify (Recommended)
1. **Drag & Drop**: Your project folder to [netlify.com](https://netlify.com)
2. **Auto Deploy**: Site goes live immediately
3. **Custom Domain**: Optional - add your domain

### Option B: Vercel
1. **Import**: Project from GitHub or upload
2. **Deploy**: Automatic deployment
3. **Custom Domain**: Add your domain

### Option C: GitHub Pages
1. **Push**: Code to GitHub repository
2. **Enable**: GitHub Pages in repository settings
3. **Access**: Via `username.github.io/repository-name`

## Step 7: Security (Production)

### Change Admin Password
1. **Open**: `admin.js`
2. **Find**: Line 6 `this.adminPassword = 'admin123';`
3. **Change**: To your secure password
4. **Redeploy**: Your site

### Enable RLS (Optional)
For extra security, you can enable proper authentication:
1. **Supabase Auth**: Set up user authentication
2. **Update Policies**: Restrict admin operations to authenticated users
3. **Update Code**: Add login/logout functionality

## Troubleshooting

### Common Issues

**1. "Failed to load" errors**
- Check your Supabase URL and key in `supabase-config.js`
- Ensure Supabase project is active
- Check browser console for detailed errors

**2. Admin login not working**
- Verify password in `admin.js`
- Clear browser cache
- Check browser console for errors

**3. Changes not appearing**
- Refresh the main website page
- Check if data was saved in Supabase dashboard
- Verify RLS policies allow public read access

**4. Database connection errors**
- Confirm Supabase project is running
- Check internet connection
- Verify credentials are correct

### Checking Data in Supabase
1. **Go to**: Table Editor in Supabase dashboard
2. **View Tables**: projects, skills, testimonials, services, personal_details
3. **Verify Data**: Check if your changes are saved

## Features Overview

### What Works Now
✅ **Global Changes**: All visitors see admin updates immediately  
✅ **Real-time**: Changes appear instantly  
✅ **Persistent**: Data stored in PostgreSQL database  
✅ **Scalable**: Handles multiple users and large datasets  
✅ **Secure**: Row Level Security enabled  
✅ **Free Tier**: 500MB database, 2GB bandwidth  

### Admin Capabilities
- ✅ Add/Edit/Delete Projects
- ✅ Manage Technical Skills by Category
- ✅ Update Personal Details (Name, Email, Phone, Title)
- ✅ Manage Client Testimonials
- ✅ Control Service Offerings
- ✅ Real-time Preview

## Support

### Getting Help
- **Supabase Docs**: [docs.supabase.com](https://docs.supabase.com)
- **Community**: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)

### Backup Your Data
- **Export**: Use Supabase dashboard to export data
- **SQL Dump**: Download database backup from Settings

## Next Steps

### Optional Enhancements
1. **User Authentication**: Add proper login system
2. **Image Upload**: Add image storage for projects
3. **Analytics**: Track website visitors
4. **SEO**: Add meta tags management
5. **Blog**: Add blog post management

Your portfolio admin system is now ready for production use! 🚀