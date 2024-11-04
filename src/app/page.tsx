import { getServerSession } from 'next-auth';
import { authConfig } from './auth.config';
import { LoginButton } from '@/components/login-button';
import { ActivitiesList } from '@/components/activities-list';

export default async function Home() {
  const session = await getServerSession(authConfig);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Strava Activities</h1>
      {!session ? (
        <LoginButton />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Logged in as {session.user?.name}</p>
            <LogoutButton />
          </div>
          <ActivitiesList />
        </div>
      )}
    </main>
  );
}
