'use client';
import { useUser } from '@stackframe/stack';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import studentsData from '@/app/students/students.json';

export default function Home() {
  const user = useUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight">Welcome to Lesson Forge</h1>
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

  const studentCount = studentsData.length;
  const courseCount = 1; // Placeholder - update when courses are dynamic

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome back, {user.displayName}
          </h1>
          <p className="text-muted-foreground">Your teaching dashboard</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{studentCount}</CardTitle>
              <CardDescription>Total Students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/students">View Students</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{courseCount}</CardTitle>
              <CardDescription>Active Courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/courses">View Courses</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Themes</CardTitle>
            <CardDescription>Available teaching materials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">General education materials available</p>
          </CardContent>
        </Card>

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
  );
}
