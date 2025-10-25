'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LogoutButton } from '@/components/logout-button';

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: '/courses', label: 'Courses' },
    { href: '/students', label: 'Students' },
  ];

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full bg-card border-r transition-all duration-300',
        isOpen ? 'w-64' : 'w-16',
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b flex items-center justify-between">
          {isOpen && (
            <Image
              src="/logo.png"
              alt="Pipelex Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(!isOpen && 'mx-auto')}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start bg-background',
                    pathname === item.href && 'border-primary',
                    !isOpen && 'justify-center px-2',
                  )}
                >
                  {isOpen ? item.label : item.label[0]}
                </Button>
              </Link>
            ))}
          </div>
        </nav>

        {isOpen && (
          <div className="p-4 border-t">
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
}
