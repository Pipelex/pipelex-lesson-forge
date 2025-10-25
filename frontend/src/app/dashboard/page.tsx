import { stackServerApp } from '@/stack/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect('/handler/sign-in');
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Your account details and authentication status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm font-medium text-muted-foreground">Display Name</span>
                <span className="text-sm">{user.displayName}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <span className="text-sm">{user.primaryEmail}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm font-medium text-muted-foreground">User ID</span>
                <span className="text-sm font-mono">{user.id}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
                <span className="text-sm text-green-600">Authenticated</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protected Content</CardTitle>
              <CardDescription>This page uses server-side authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This page is protected and can only be accessed by authenticated users. It uses
                server-side authentication with Stack Auth.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button asChild>
              <Link href="/handler/account-settings">Account Settings</Link>
            </Button>
            <Button variant="destructive" asChild>
              <Link href="/handler/sign-out">Sign Out</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
