'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  type: string;
  start_date: string;
  average_speed: number;
  max_speed: number;
  total_elevation_gain: number;
  kudos_count: number;
}

export function ActivitiesList() {
  const { data: session } = useSession();
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        if (session?.error) {
          setError('Failed to refresh access token. Please sign in again.');
          return;
        }

        const response = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=30', {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setActivities(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to fetch activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (session?.accessToken) {
      fetchActivities();
    }
  }, [session?.accessToken, session?.error]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 
      ? `${hours}h ${minutes}m`
      : `${minutes}m`;
  };

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!session) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => (
        <Card key={activity.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {activity.name}
            </CardTitle>
            <CardDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>{activity.type}</span>
                  <span>{new Date(activity.start_date).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Distance: {(activity.distance / 1000).toFixed(2)}km</div>
                  <div>Time: {formatDuration(activity.moving_time)}</div>
                  {activity.total_elevation_gain > 0 && (
                    <div>Elevation: {activity.total_elevation_gain}m</div>
                  )}
                  <div>
                    Speed: {((activity.average_speed * 3.6)).toFixed(1)}km/h
                  </div>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
} 