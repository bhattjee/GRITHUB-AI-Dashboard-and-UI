# GRITHUB AI Dashboard UI and Service

A modern AI-powered fitness dashboard application built with React, TypeScript, and shadcn/ui. Track your progress, customize workouts, and reach your fitness goals with AI-generated or manual workout plans.

## Features

- **AI-Generated Workout Plans**: Get personalized workout plans using AI integration
- **Manual Workout Selection**: Choose from pre-built workout plans
- **Custom Workout Builder**: Create your own personalized workout routines
- **Trainer Workouts**: Access workout plans created by professional trainers
- **28-Day Challenge**: Participate in structured fitness challenges
- **Profile Management**: Track your fitness journey and manage your profile
- **Modern UI**: Beautiful dark-themed interface with smooth animations

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **Recharts** - Chart library for data visualization
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

## Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd grithub-ai-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
│   ├── dashboard/       # Dashboard-specific components
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Environment Variables

Create a `.env` file in the root directory (see `.env.example` if available):

```env
# Add your environment variables here
```

## AI Integration

The application integrates with an AI service running on `localhost:5001` for generating workout plans. Ensure the AI service is running before using the AI-generated plan feature.

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy to Vercel/Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred hosting service

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security Notes

- Never commit `.env` files or sensitive data
- The application currently references `localhost:5001` for AI integration - update this for production
- Ensure proper authentication before deploying to production
