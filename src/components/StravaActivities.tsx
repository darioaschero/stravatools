'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { StravaActivity } from '@/types/strava';

export default function StravaActivities() {
  const { data: session } = useSession();
  const [activities, setActivities] = useState<StravaActivity[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      if (session?.accessToken) {
        const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        setActivities(data);
      }
    }

    fetchActivities();
  }, [session?.accessToken]);

  return (
    <div>
      <h2>My Strava Activities</h2>
      <ul>
        {activities.map((activity: StravaActivity) => (
          <li key={activity.id}>
            {activity.name} - {activity.type} ({activity.distance}m)
          </li>
        ))}
      </ul>
    </div>
  );
} 