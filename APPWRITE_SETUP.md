# Appwrite Setup Guide for DevOps Portfolio

This guide will help you set up Appwrite for your portfolio website to enable contact form submissions and future data management.

## Prerequisites

- An Appwrite Cloud account or Appwrite self-hosted instance
- Git repository cloned and development environment set up

## Step 1: Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted instance
2. Click "Create Project"
3. Name your project (e.g., "DevOps Portfolio")
4. Copy your **Project ID** - you'll need this later

## Step 2: Create Database

1. Navigate to **Databases** in the left sidebar
2. Click "Create Database"
3. Name it "portfolio" (or your preferred name)
4. Copy the **Database ID**

## Step 3: Create Collections

### Messages Collection (Contact Form Submissions)

1. Click "Create Collection"
2. Name: `messages`
3. Copy the **Collection ID**
4. Add the following attributes:

| Attribute | Type   | Size | Required | Array |
| --------- | ------ | ---- | -------- | ----- |
| name      | String | 255  | Yes      | No    |
| email     | String | 255  | Yes      | No    |
| subject   | String | 500  | Yes      | No    |
| message   | String | 5000 | Yes      | No    |
| timestamp | String | 50   | No       | No    |

5. **Set Permissions**:
   - Go to "Settings" tab → "Permissions"
   - Add permission: "Any" → Role: "guests" → CREATE
   - This allows anyone to submit the contact form

### Optional: Experiences Collection

If you want to manage experiences dynamically:

1. Create collection named `experiences`
2. Add attributes: company, role, duration, technologies (array), responsibilities (array), etc.
3. Set permissions: Read (Any), Create/Update/Delete (Admin only)

### Optional: Projects Collection

1. Create collection named `projects`
2. Add attributes: title, description, techStack (array), problem, solution (array), etc.
3. Set permissions: Read (Any), Create/Update/Delete (Admin only)

### Optional: Skills Collection

1. Create collection named `skills`
2. Add attributes: name, category, proficiency, yearsExperience, etc.
3. Set permissions: Read (Any), Create/Update/Delete (Admin only)

## Step 4: Update Environment Configuration

### Development Environment

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  appwrite: {
    endpoint: 'https://cloud.appwrite.io/v1', // or your self-hosted URL
    projectId: 'YOUR_PROJECT_ID_HERE',
    databaseId: 'YOUR_DATABASE_ID_HERE',
    collectionsId: {
      messages: 'YOUR_MESSAGES_COLLECTION_ID',
      experiences: 'YOUR_EXPERIENCES_COLLECTION_ID', // optional
      projects: 'YOUR_PROJECTS_COLLECTION_ID', // optional
      skills: 'YOUR_SKILLS_COLLECTION_ID', // optional
      certifications: 'YOUR_CERTIFICATIONS_COLLECTION_ID', // optional
    },
  },
};
```

### Production Environment

Edit `src/environments/environment.prod.ts` with the same structure using production IDs.

## Step 5: Test Contact Form

1. Start your development server:

   ```bash
   npm start
   ```

2. Open the Contact.app in your browser
3. Fill out and submit the contact form
4. Check Appwrite dashboard → Databases → portfolio → messages → Documents
5. You should see your test submission!

## Step 6: Email Notifications (Optional)

To receive email notifications when someone submits the contact form:

### Option A: Appwrite Functions

1. Create an Appwrite Function
2. Set it to trigger on `databases.*.collections.messages.documents.*.create`
3. Use a service like SendGrid, Mailgun, or SMTP to send emails
4. Deploy the function

### Option B: Webhooks

1. Go to Project Settings → Webhooks
2. Create a new webhook
3. Select event: `databases.*.collections.messages.documents.*.create`
4. Point to your email service endpoint

## Step 7: Set Up Admin Access (Optional)

To manage portfolio content via admin panel:

1. Go to **Auth** in Appwrite
2. Create a new user account for yourself
3. Use this account to log in and manage content
4. Update collection permissions to allow only authenticated users to create/update/delete

## Security Best Practices

1. **Never expose sensitive keys** in client-side code
2. **Use Appwrite's built-in RLS** (Row Level Security via permissions)
3. **Validate input** on both client and server side
4. **Rate limit** contact form submissions (configure in Appwrite Functions or use a service)
5. **Monitor** your Appwrite dashboard for spam submissions

## Troubleshooting

### "Failed to send message" Error

1. Check browser console for specific error
2. Verify all IDs in environment.ts match Appwrite
3. Ensure collection permissions allow CREATE for guests
4. Check network tab to see if request reaches Appwrite

### CORS Errors

1. Add your domain to Appwrite Project Settings → Platforms
2. For local development, add `http://localhost:4200`
3. For production, add your production URL

### Rate Limiting

If you're getting rate limited:

1. Check Appwrite Project Settings → Rate Limits
2. Adjust limits for your use case
3. Consider upgrading Appwrite plan for higher limits

## Next Steps

1. ✅ Contact form submissions working
2. 🔄 Set up email notifications
3. 🔄 Create admin panel for content management
4. 🔄 Implement dynamic data fetching for experiences/projects/skills
5. 🔄 Add analytics to track form submissions

## Useful Links

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Web SDK](https://appwrite.io/docs/sdks#web)
- [Appwrite Functions](https://appwrite.io/docs/functions)
- [Appwrite Permissions](https://appwrite.io/docs/permissions)

---

**Note**: This guide assumes you're using Appwrite Cloud. If self-hosting, replace the endpoint with your instance URL.
