# Dev Portfolio v3

A modern, interactive developer portfolio website built with React, TypeScript, and Vite. Features a cyberpunk-inspired design with smooth animations, interactive components, and a seamless user experience.

## Features

- **Interactive Hero Section** - Eye-catching landing page with animated graphics
- **Dynamic Typewriter Effect** - Animated text for engaging headings
- **Project Portfolio** - Showcase projects with modal views and descriptions
- **Skills & Technologies** - Display tech stack with visual indicators
- **Blog Integration** - Share articles and insights
- **Contact Form** - Easy way for visitors to get in touch
- **Testimonials** - Social proof from clients or colleagues
- **Floating UI Elements** - Email and social media quick links
- **Smooth Animations** - Reveal effects and scroll-triggered animations
- **Responsive Design** - Works great on desktop, tablet, and mobile
- **Matrix Background** - Cyberpunk-themed animated background
- **Sound Effects** - Interactive audio feedback on scrolling

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **CSS-in-JS** - Styled components approach
- **Web Audio API** - Sound effects

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devportfolio.v3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── About.tsx              # About section
│   ├── Blog.tsx               # Blog posts showcase
│   ├── Contact.tsx            # Contact/email form
│   ├── FloatingEmail.tsx      # Floating email widget
│   ├── FloatingSocials.tsx    # Social media quick links
│   ├── Hero.tsx               # Landing hero section
│   ├── Navbar.tsx             # Navigation bar
│   ├── Projects.tsx           # Projects portfolio
│   ├── Skills.tsx             # Skills and tech stack
│   ├── Testimonials.tsx       # Client testimonials
│   ├── Toolkit.tsx            # Tools and utilities
│   ├── ui/                    # Reusable UI components
│   │   ├── BootSequence.tsx   # Loading animation
│   │   ├── CyberButton.tsx    # Styled button component
│   │   ├── HeroGraphic.tsx    # Hero visualization
│   │   ├── MatrixBackground.tsx # Background effect
│   │   ├── ProjectModal.tsx   # Project detail modal
│   │   ├── Reveal.tsx         # Scroll reveal animation
│   │   ├── SectionHeading.tsx # Section title component
│   │   ├── TechBackground.tsx # Tech stack background
│   │   └── Typewriter.tsx     # Typewriter effect
│   └── utils/
│       └── ScrollSound.tsx    # Audio feedback utility
├── assets/
│   └── image/                 # Image assets
├── App.tsx                    # Main app component
├── index.tsx                  # React entry point
└── types.ts                   # TypeScript type definitions
```

## Usage

1. **Customize Content** - Edit component files to add your own content
2. **Update Metadata** - Modify `metadata.json` with your information
3. **Add Projects** - Update the Projects component with your portfolio work
4. **Connect Socials** - Link your social media in FloatingSocials.tsx
5. **Style Customization** - Adjust CSS and animations to match your brand

## Configuration

Edit `metadata.json` to customize:
- Personal information
- Social media links
- Project details
- Skills and technologies
- Contact information

## Performance

- Optimized bundle size with Vite
- Code splitting for faster load times
- Lazy loading of components
- Efficient animation performance
- Progressive enhancement

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created as a modern dev portfolio template. Feel free to customize it to showcase your own work!

---

**Happy coding!** 🚀
