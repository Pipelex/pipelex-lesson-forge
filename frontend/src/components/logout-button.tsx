'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <Button variant="ghost" className="w-full justify-start" asChild>
      <Link href="/handler/sign-out">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Link>
    </Button>
  );
}
