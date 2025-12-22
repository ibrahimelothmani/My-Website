# Ibrahim El Othmani - DevOps OS Portfolio

An elite, production-grade portfolio platform showcasing Cloud & DevOps engineering expertise through an interactive desktop OS interface. Inspired by NetworkChuck Browser's hacker aesthetic, this platform demonstrates DevOps mindset, automation, and systems thinking.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Angular](https://img.shields.io/badge/Angular-21-red.svg)
![Supabase](https://img.shields.io/badge/Supabase-ready-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Live Demo

**Development Server**: `http://localhost:4200`

## 🎯 Features

### Desktop OS Interface

- **Dark Hacker Theme**: Terminal-inspired design with scanline effects and CRT aesthetics
- **Draggable Windows**: Fully interactive window management system
- **Desktop Icons**: Launch applications with familiar desktop metaphor
- **Taskbar**: Active app indicators, system tray, real-time clock
- **Window Controls**: Minimize, maximize, close, and drag functionality

### Seven Interactive Applications

#### 1. **About.app** 👤

- Neofetch-style system information display
- DevOps philosophy and core strengths
- Career journey timeline in Git log format

#### 2. **Experience.app** 💼

- Collapsible work history cards
- Technologies, responsibilities, and impact metrics
- Real data from CloudSynk and NexaCore Solutions

#### 3. **Projects.app** 🚀

- DevOps project showcases (EKS, Multi-Cloud IaC, Observability)
- Problem → Solution → Impact format
- Architecture-focused explanations

#### 4. **Skills.app** ⚡

- Categorized skill display (Cloud, IaC, Kubernetes, CI/CD, etc.)
- Proficiency bars with years of experience
- 7 technology domains with 20+ skills

#### 5. **Certifications.app** 🏆

- Scalable certification showcase (ready for future additions)
- Planned certifications: AWS SAA, CKA, Terraform Associate, Azure DevOps

#### 6. **Terminal.app** 💻

- Fully interactive CLI with command history
- DevOps-themed commands: `kubectl`, `terraform`, `docker`, `cat`, `ls`, etc.
- Auto-complete and arrow key navigation
- Easter eggs and realistic terminal behavior

#### 7. **Contact.app** 📧

- Direct contact links (Email, GitHub, LinkedIn)
- CV download
- Availability status with "open to opportunities" indicator
- Recruiter-friendly CTAs

## 🛠️ Tech Stack

### Frontend

- **Angular 21** - Standalone components, Signals for state management
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Angular CDK** - Drag-and-drop functionality
- **Custom CSS Variables** - Design system with dark hacker theme

### Backend (Supabase - Ready to Integrate)

- **PostgreSQL** - Relational database for experiences, projects, skills, certifications
- **Row Level Security (RLS)** - Public read, admin write policies
- **Supabase Storage** - Architecture diagrams and certificate badges
- **Edge Functions** - Contact form submissions
- **Supabase Auth** - Admin authentication for CRUD operations

### DevOps & Tooling

- **npm** - Package management
- **Angular CLI** - Build and development server
- **Git** - Version control
- **Environment configs** - Separate dev/prod configurations

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm 10+
- Angular CLI 21+
- Git

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd My-Website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment** (Optional - for Supabase integration)

   ```bash
   # Edit src/environments/environment.ts
   # Add your Supabase URL and Anon Key
   ```

4. **Start development server**

   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:4200
   ```

## 🎨 Design System

### Color Palette

```css
--bg-primary: #0a0a0f        /* Deep space black */
--accent-green: #00ff41       /* Matrix green */
--accent-blue: #00d9ff        /* Cyber blue */
--accent-purple: #b040ff      /* Special actions */
--text-mono: #00ff41          /* Terminal text */
```

### Typography

- **Monospace**: JetBrains Mono, Fira Code - for terminal and code
- **Sans-serif**: Inter, SF Pro - for headings and body

### Animations

- Terminal cursor blink
- Window open/close/minimize animations
- Desktop icon slide-up with stagger
- Scanline overlay effect
- Hover lift and glow effects

## 🗂️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── components/
│   │   │   ├── desktop/         # Main desktop container
│   │   │   ├── window/          # Draggable window component
│   │   │   └── taskbar/         # Bottom taskbar with system tray
│   │   └── services/
│   │       └── window-manager.service.ts  # Window state management
│   ├── features/
│   │   ├── about/               # About.app component
│   │   ├── experience/          # Experience.app component
│   │   ├── projects/            # Projects.app component
│   │   ├── skills/              # Skills.app component
│   │   ├── certifications/      # Certifications.app component
│   │   ├── terminal/            # Terminal.app component
│   │   └── contact/             # Contact.app component
│   └── app.ts                   # Root component
├── environments/
│   ├── environment.ts           # Development config
│   └── environment.prod.ts      # Production config
└── styles/
    ├── variables.css            # Design system tokens
    └── animations.css           # Keyframe animations
```

## ⚙️ Configuration

### Environment Variables

**Development** (`src/environments/environment.ts`):

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'YOUR_SUPABASE_URL_HERE',
    anonKey: 'YOUR_SUPABASE_ANON_KEY_HERE',
  },
};
```

**Production** (`src/environments/environment.prod.ts`):

```typescript
export const environment = {
  production: true,
  supabase: {
    url: 'YOUR_PRODUCTION_SUPABASE_URL',
    anonKey: 'YOUR_PRODUCTION_ANON_KEY',
  },
};
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Build for production
npm run build

# Lint code
ng lint
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Deployment Options

- **Netlify**: Drag-and-drop `dist/` folder or connect Git repository
- **Vercel**: Import project from Git
- **Firebase Hosting**: `firebase deploy`
- **AWS S3 + CloudFront**: Static hosting with CDN
- **GitHub Pages**: Push `dist/` to gh-pages branch

### CI/CD Pipeline (Future)

See `.github/workflows/ci-cd.yml` for automated deployment setup.

## 📚 Supabase Setup Guide

1. **Create Supabase Project**

   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your Project URL and Anon Key

2. **Run Database Schema**

   - Copy SQL from `supabase/schema.sql`
   - Run in Supabase SQL Editor

3. **Apply RLS Policies**

   - Copy SQL from `supabase/rls-policies.sql`
   - Run in Supabase SQL Editor

4. **Seed Initial Data**

   - Copy SQL from `supabase/seed-data.sql`
   - Run in Supabase SQL Editor

5. **Update Environment Config**

   - Add Supabase credentials to `environment.ts` and `environment.prod.ts`

6. **Test Connection**
   - Restart dev server
   - Check browser console for Supabase initialization

## 🎯 DevOps Best Practices Implemented

- ✅ **Infrastructure as Code**: Terraform-ready architecture
- ✅ **Environment Separation**: Dev/staging/prod configs
- ✅ **Component Modularity**: Standalone, reusable components
- ✅ **State Management**: Angular Signals for reactive state
- ✅ **Performance**: Lazy loading, optimized bundles
- ✅ **Scalability**: Modular architecture for easy feature additions
- ✅ **Security**: RLS policies, environment variable management
- ✅ **Observability**: Console logging, error handling

## 📈 Performance Metrics

- **Initial Bundle**: ~187 KB (uncompressed)
- **Lighthouse Score Target**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

## 📧 Contact

**Ibrahim El Othmani**

- Email: ibrahim.elothmani@example.com
- GitHub: [github.com/ibrahim-elothmani](https://github.com/ibrahim-elothmani)
- LinkedIn: [linkedin.com/in/ibrahim-elothmani](https://linkedin.com/in/ibrahim-elothmani)

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio!

## 🙏 Acknowledgments

- Design inspiration: [NetworkChuck Browser](https://browser.networkchuck.com/)
- Icons: Emoji (native Unicode)
- Fonts: JetBrains Mono, Inter, Fira Code

---

**Built with 💚 by a DevOps Engineer who loves automation, infrastructure, and clean code.**

_"Automate everything. Monitor relentlessly. Deploy fearlessly. Scale infinitely."_
