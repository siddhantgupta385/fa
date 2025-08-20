# Portfolio Admin System

## Overview
This admin system provides full CRUD (Create, Read, Update, Delete) control over your portfolio website content. You can manage projects, skills, personal details, testimonials, and services through a secure web interface.

## Access
- **Admin Panel URL**: `admin.html`
- **Default Password**: `admin123`
- **Admin Button**: A small "Admin" button appears in the bottom-left corner of the main website

## Features

### 🔐 Secure Login
- Password-protected access
- Session management
- Auto-logout on browser close

### 📁 Project Management
- Add new projects with descriptions, technologies, and status
- Edit existing projects
- Delete projects
- Set project icons and URLs
- Mark projects as "Active" or "Completed"

### 🛠️ Technical Skills Management
- Organize skills by categories (Frontend, Backend, Cloud & Tools, AI & Data)
- Add/edit/delete individual skills
- Automatic categorization

### 👤 Personal Details
- Update name, email, phone number
- Change professional title
- Changes reflect across the entire website

### 💬 Testimonials Management
- Add client testimonials
- Set star ratings (1-5)
- Edit testimonial content
- Delete testimonials

### 🎯 Services Management
- Manage service offerings
- Update service descriptions
- Set service icons
- List technologies for each service

## How to Use

### 1. Access Admin Panel
- Open `admin.html` in your browser
- Enter password: `admin123`
- Click "Login"

### 2. Navigate Sections
- Use the navigation buttons at the top to switch between sections
- Each section has its own management interface

### 3. Add New Items
- Click the "Add [Item]" button in any section
- Fill out the form with required information
- Click "Save" to add the item

### 4. Edit Existing Items
- Click the "Edit" button on any item card
- Modify the information in the popup form
- Click "Save" to update

### 5. Delete Items
- Click the "Delete" button on any item card
- Confirm the deletion in the popup dialog

### 6. Preview Changes
- Click "Preview Site" to open the main website in a new tab
- All changes are immediately visible on the main site

## Data Storage
- All data is stored in the browser's localStorage
- Data persists between sessions
- No server or database required

## Security Notes
- Change the default password in `admin.js` (line 6)
- The admin panel is client-side only
- For production use, consider server-side authentication

## Customization

### Change Admin Password
1. Open `admin.js`
2. Find line 6: `this.adminPassword = 'admin123';`
3. Change 'admin123' to your desired password
4. Save the file

### Add New Content Types
The system is extensible. You can add new content types by:
1. Adding new sections to `admin.html`
2. Creating corresponding methods in `admin.js`
3. Updating `dynamic-content.js` to load the new content

## Troubleshooting

### Login Issues
- Ensure you're using the correct password
- Check browser console for errors
- Clear browser cache if needed

### Changes Not Showing
- Refresh the main website page
- Check if localStorage is enabled in your browser
- Verify the dynamic-content.js script is loading

### Data Loss
- Data is stored locally in the browser
- Clearing browser data will reset all content
- Consider backing up localStorage data for important content

## File Structure
```
├── index.html              # Main website
├── admin.html              # Admin panel interface
├── admin.js                # Admin functionality
├── dynamic-content.js      # Content synchronization
├── styles.css              # Main website styles
├── script.js               # Main website functionality
└── ADMIN_INSTRUCTIONS.md   # This file
```

## Support
For technical support or customization requests, contact the developer.