'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function LoginButton() {
  return (
    <Button 
      onClick={() => signIn('strava')}
      className="bg-[#FC4C02] hover:bg-[#FC4C02]/90"
    >
      Login with Strava
    </Button>
  );
} 