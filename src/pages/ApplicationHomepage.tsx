import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import StandardFooter from '@/components/layout/StandardFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UserCircle, BookOpenText } from 'lucide-react';

interface Activity {
  id: string;
  timestamp: string;
  eventType: string;
  details: string;
  status: 'Completed' | 'Ongoing' | 'Failed';
}

const activities: Activity[] = [
  { id: 'evt001', timestamp: '2023-10-26 10:00 AM', eventType: 'Login', details: 'Successful login from new device', status: 'Completed' },
  { id: 'evt002', timestamp: '2023-10-25 03:30 PM', eventType: 'Password Change', details: 'Password updated successfully', status: 'Completed' },
  { id: 'evt003', timestamp: '2023-10-24 09:15 AM', eventType: 'Feature Access', details: 'Accessed premium feature X', status: 'Ongoing' },
  { id: 'evt004', timestamp: '2023-10-23 11:00 AM', eventType: 'Support Ticket', details: 'Ticket #1234 resolved', status: 'Completed' },
  { id: 'evt005', timestamp: '2023-10-22 08:20 PM', eventType: 'API Usage', details: 'Rate limit approaching for API key Y', status: 'Ongoing' },
];

const ApplicationHomepage: React.FC = () => {
  console.log('ApplicationHomepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />

      <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Welcome Back!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              This is your AuthPortal dashboard. Manage your account and explore features.
            </p>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with common tasks or explore new features.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => console.log('Navigate to Profile/Settings clicked. AppHeader already has these links.')}
                >
                  <UserCircle className="mr-2 h-5 w-5" /> View Profile / Settings
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => console.log('Explore documentation clicked')}
                >
                  <BookOpenText className="mr-2 h-5 w-5" /> Explore Documentation
                </Button>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  A log of recent important events in your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activities.length > 0 ? (
                  <Table>
                    <TableCaption>Showing the last {activities.length} activities.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px] sm:w-[250px]">Timestamp</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead className="hidden md:table-cell">Details</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.timestamp}</TableCell>
                          <TableCell>{activity.eventType}</TableCell>
                          <TableCell className="hidden md:table-cell">{activity.details}</TableCell>
                          <TableCell className="text-right">
                            <Badge 
                              variant={
                                activity.status === 'Completed' ? 'default' : 
                                activity.status === 'Ongoing' ? 'secondary' : 'destructive'
                              }
                            >
                              {activity.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No recent activity to display.
                  </p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <StandardFooter />
    </div>
  );
};

export default ApplicationHomepage;