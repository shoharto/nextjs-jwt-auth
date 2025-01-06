
# Next.js Authentication System

A modern authentication system built with Next.js 13+, featuring JWT authentication, protected routes, and a clean dashboard interface.

## Features

- 🔐 JWT Authentication
- 🛡️ Protected Routes
- 🎨 Dark/Light Mode Support
- 📱 Responsive Dashboard
- 🔄 RTK Query for API Calls
- 🎯 TypeScript Support
- 🎨 Tailwind CSS Styling

## Prerequisites

- Node.js 18+ 
- NestJS Backend running on port 3000
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-jwt-auth
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Project Structure

```
app/
├── (auth)/           # Authentication related pages
├── dashboard/        # Dashboard and protected routes
├── components/       # Reusable components
├── lib/             # Utilities, services, and types
└── ...
```

## Technologies Used

- Next.js 15.1.3
- React 19
- Redux Toolkit
- RTK Query
- Tailwind CSS
- TypeScript
- React Hook Form
- Zod

## License

MIT

## Author

Bayes Ahmed