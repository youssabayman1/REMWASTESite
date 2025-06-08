## FigmaLink

https://www.figma.com/design/xeo9xA17sZIPF9M9gvXjTe/Untitled?node-id=0-1&p=f&t=9OkKBsue8wYM6bF0-0

# SkipHire

SkipHire is a modern, user-friendly platform for managing skip rentals and waste management services. Built with React and powered by the latest web technologies, it provides a seamless experience for customers to rent skips of various sizes for their waste disposal needs.

## Features

- **Smart Skip Selection**: Browse and compare skips based on size, price, and waste type compatibility
- **Location-based Availability**: View available skips in your area with postcode lookup
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Skip Restrictions**: Clear visual indicators for skip usage limitations and restrictions
- **Progress Tracking**: Step-by-step booking process with visual progress indication

## Technology Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS for modern, responsive design
- **Routing**: React Router for seamless navigation
- **State Management**: React Hooks and Context
- **API Integration**: Axios for backend communication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/youssabayman1/REMWASTESite.git
cd skiphire
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create the following files in the root directory:

`.env.development`:

```env
VITE_API_URL=https://app.wewantwaste.co.uk/api
VITE_APP_ENV=development
```

`.env.production`:

```env
VITE_API_URL=https://app.wewantwaste.co.uk/api
VITE_APP_ENV=production
```

`.env.local` (optional - for local overrides):

```env
VITE_API_URL=your_local_api_url
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier

### Environment Variables

The application uses different environment files for different environments:

- `.env.development` - Development environment settings
- `.env.production` - Production environment settings
- `.env.local` - Local overrides (git-ignored)

Available variables:

| Variable     | Description             | Required |
| ------------ | ----------------------- | -------- |
| VITE_API_URL | API endpoint URL        | Yes      |
| VITE_APP_ENV | Application environment | Yes      |

### Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   └── ...
├── pages/             # Page components
├── services/          # API and service integrations
│   ├── httpClient.js  # Base HTTP client
│   └── skipService.js # Skip-related API calls
└── styles/            # Global styles and Tailwind config
```

## Deployment

1. Ensure environment variables are set correctly in `.env.production`

2. Build the application:

```bash
npm run build
```

3. Preview the build:

```bash
npm run preview
```

4. Deploy the `dist` directory to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with Youssab Ayman
