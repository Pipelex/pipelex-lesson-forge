'use client';
import { useUser } from '@stackframe/stack';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const user = useUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">Welcome to Pipelex</h1>
            <p className="text-muted-foreground">Build and visualize AI workflows</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Sign in to access your workspace</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/handler/sign-in">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/handler/sign-up">Create Account</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome back, {user.displayName}
          </h1>
          <p className="text-muted-foreground">You are successfully signed in</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
              <CardDescription>Account details and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <span className="text-sm">{user.primaryEmail}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-muted-foreground">User ID</span>
                <span className="text-sm font-mono">{user.id}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button className="flex-1" variant="outline" asChild>
              <Link href="/ok">OK Page</Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/handler/account-settings">Account Settings</Link>
            </Button>
            <Button variant="destructive" className="flex-1" asChild>
              <Link href="/handler/sign-out">Sign Out</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
