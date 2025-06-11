# EmailJS Setup Guide for Review Submissions

This guide will help you set up EmailJS to receive review submissions directly to your email for manual approval.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions to connect your `laura.empowerfit@gmail.com` account
5. Note down your **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Subject:
```
New Review Submission - {{reviewer_name}}
```

### Template Body:
```
New Review Submission for Laura Empower Fit

Reviewer Details:
- Name: {{reviewer_name}}
- Email: {{reviewer_email}}
- Achievement: {{achievement}}
- Rating: {{rating_stars}} ({{rating}}/5 stars)
- Submission Date: {{submission_date}}

Review Text:
"{{review_text}}"

---
To add this review to your website, copy the review text and manually add it to the reviews section.

This email was sent automatically from your website's review submission form.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Update Your Website Code

Open the `script.js` file and replace these placeholders:

1. Replace `'YOUR_PUBLIC_KEY'` with your actual public key
2. Replace `'YOUR_SERVICE_ID'` with your service ID
3. Replace `'YOUR_TEMPLATE_ID'` with your template ID

### Example:
```javascript
// Replace this line:
emailjs.init('YOUR_PUBLIC_KEY');
// With:
emailjs.init('your_actual_public_key_here');

// Replace this line:
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
// With:
await emailjs.send('service_abc123', 'template_xyz789', templateParams);
```

## Step 6: Test the System

1. Go to your website
2. Fill out the review form
3. Submit a test review
4. Check your email for the submission

## How It Works

1. **Visitor submits review** → Form data is collected
2. **EmailJS sends email** → Review details are emailed to you
3. **You review and approve** → Manually add approved reviews to the site
4. **Visitor gets confirmation** → They see a success message

## Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- Basic email templates
- Standard support

This should be sufficient for review submissions. If you need more, paid plans start at $15/month.

## Security Notes

- Your EmailJS keys are safe to use in frontend code
- No sensitive information is exposed
- Reviewer email addresses are included for follow-up if needed

## Troubleshooting

If reviews aren't being sent:
1. Check browser console for errors
2. Verify all IDs are correctly entered
3. Ensure EmailJS service is properly connected
4. Check spam folder for emails

## Need Help?

If you need assistance setting this up, contact your web developer or EmailJS support. 