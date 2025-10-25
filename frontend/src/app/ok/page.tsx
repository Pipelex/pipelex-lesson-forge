import { stackServerApp } from '@/stack/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function OkPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect('/handler/sign-in');
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle>OK Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page is currently empty. Content will be added here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
