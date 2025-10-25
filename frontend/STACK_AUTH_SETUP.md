# Stack Auth Setup Guide

## Overview

This frontend application uses Stack Auth for authentication. The setup has been completed and the following files have been configured:

## Files Created/Modified

### Stack Auth Configuration

- `src/stack/client.tsx` - Client-side Stack Auth configuration
- `src/stack/server.tsx` - Server-side Stack Auth configuration

### Authentication Pages

- `src/app/handler/[...stack]/page.tsx` - Handles all Stack Auth pages (sign-in, sign-up, account settings, etc.)
- `src/app/loading.tsx` - Loading state for React Suspense

### Application Pages

- `src/app/page.tsx` - Home page with client-side authentication check
- `src/app/dashboard/page.tsx` - Protected dashboard page with server-side authentication
- `src/app/layout.tsx` - Root layout
- `src/app/providers.tsx` - Providers wrapper with Stack Auth

### Styles

- `src/styles/globals.css` - Global styles with Tailwind CSS

## Environment Variables Required

You need to add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=<your-publishable-client-key>
STACK_SECRET_SERVER_KEY=<your-secret-server-key>
```

### How to Get API Keys

1. Go to [Stack Auth Dashboard](https://app.stack-auth.com/)
2. Create a new project or select an existing one
3. Navigate to the API Keys section
4. Copy the three keys mentioned above
5. Add them to your `.env.local` file

## Available Routes

### Public Routes

- `/` - Home page (shows sign-in/sign-up buttons if not authenticated)
- `/handler/sign-in` - Sign in page
- `/handler/sign-up` - Sign up page

### Protected Routes

- `/dashboard` - Protected dashboard (redirects to sign-in if not authenticated)

### Account Management

- `/handler/account-settings` - User account settings
- `/handler/sign-out` - Sign out

## Usage Examples

### Client-Side Authentication (React Component)

```tsx
'use client';
import { useUser } from '@stackframe/stack';

export default function MyComponent() {
  const user = useUser();

  if (user) {
    return <div>Hello, {user.displayName}!</div>;
  } else {
    return <div>Please sign in</div>;
  }
}
```

### Server-Side Authentication (Server Component)

```tsx
import { stackServerApp } from '@/stack/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect('/handler/sign-in');
  }

  return <div>Hello, {user.displayName}!</div>;
}
```

### API Route Authentication

```tsx
import { stackServerApp } from '@/stack/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await stackServerApp.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ message: `Hello, ${user.displayName}!` });
}
```

## Running the Application

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Add your Stack Auth API keys to `.env.local`

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing Authentication

1. Navigate to the home page
2. Click "Sign Up" to create a new account
3. Fill in your details and create an account
4. You'll be redirected back to the home page, now showing your user information
5. Try accessing the dashboard at `/dashboard`
6. Test the account settings page
7. Sign out and verify you're redirected appropriately

## Additional Resources

- [Stack Auth Documentation](https://docs.stack-auth.com/)
- [Stack Auth Next.js Guide](https://docs.stack-auth.com/getting-started/setup)
- [Stack Auth API Reference](https://docs.stack-auth.com/api-reference)

## Notes

- The application uses React 18.3.1 (Stack Auth recommends React 19+, but it works with 18.3.1)
- Dark mode is supported through next-themes
- All authentication UI is provided by Stack Auth's built-in components
