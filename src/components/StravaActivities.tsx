'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function StravaActivities() {
  const { data: session } = useSession();
  const [activities, setActivities] = useState([]);

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
      {/* Render activities */}
    </div>
  );
} 