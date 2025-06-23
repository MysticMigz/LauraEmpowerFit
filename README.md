# Laura Empower Fit

A premium fitness coaching website for Laura, featuring a distinctive purple/mauve color scheme with modern UI elements and engaging animations.

## Features

- Responsive design that works seamlessly across all devices
- Interactive image carousel with navigation controls
- Animated elements that appear on scroll
- Modern, mobile-friendly navigation
- Custom contact form with animated feedback
- WhatsApp integration for direct client communication
- Professional presentation of services:
  - 1-2-1 Personal Training
  - Online Coaching
  - Nutrition Coaching
  - Body Transformation
- Client testimonials with transformation results

## Site Structure

1. **Home** - Engaging introduction with dynamic image carousel
2. **About** - Personal story and professional background
3. **Services** - Comprehensive fitness offerings with visual icons
4. **Philosophy** - Laura's unique approach to fitness transformation
5. **Testimonials** - Real client transformation stories
6. **Contact** - Direct communication options and contact form

## How to Customize

### Change Images

1. Replace the images in the `images` folder with your own:
   - `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` for the carousel (recommended size: 1200x800px)
   - `laura.jpg` for the coach profile (recommended size: 600x800px)

### Update Content

1. Edit the `index.html` file to update text content and service descriptions
2. Modify the WhatsApp number in the contact section (line 198)
3. Update social media links in the footer (lines 219-221)

### Color Scheme

The site uses a distinctive purple/mauve color scheme. To change this:

1. Edit the CSS variables in the `styles.css` file:
   ```css
   :root {
       --primary-color: #e0afff;
       --secondary-color: #9932cc;
       --accent-color: #4b0082;
       /* Other variables */
   }
   ```

## Setup Instructions

1. Download all files to your local computer
2. Create an `images` folder and add your professional photos
3. Update the WhatsApp number in index.html
4. Open `index.html` in a web browser to preview the site

## Deployment

To deploy this website:

1. Upload all files to your web hosting service
2. Ensure the file structure remains intact
3. Test all links and forms after deployment

## Technologies Used

- HTML5
- CSS3 with custom animations
- JavaScript (vanilla) for interactive elements
- Font Awesome icons
- Google Fonts integration

## Performance Optimization

- Responsive images for fast loading
- Smooth scroll behavior
- Efficient JavaScript animations
- Minimized HTTP requests
- Mobile-first design approach 