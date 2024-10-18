import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { ChevronLeft, ChevronRight, Search, Plus, CheckCircle } from "lucide-react";
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';

interface Screening {
  id: number;
  full_name: string;
  email: string;
  queue_number: number;
  status: 'completed' | 'pending' | 'cancelled';
}

interface ScreeningsPaginated {
  data: Screening[];
  current_page: number;
  last_page: number;
}

interface HistoryOfflineProps {
  auth: {
    user: User;
  };
  screenings: ScreeningsPaginated;
}

export default function HistoryOffline({ auth, screenings }: HistoryOfflineProps) {
  const hasScreenings = screenings && screenings.data && screenings.data.length > 0;

  return (
    <Authenticated user={auth.user}>
        <Head title='Screening Now'/>
      <div className="container mx-auto py-6">
        {hasScreenings && (
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Screening Completed</AlertTitle>
            <AlertDescription>
              Thank you for completing the screening, {auth.user.name}. Your results are now available.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">SCREENING</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search screenings..."
                  className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-x-2">
                <Button variant="outline">
                  Export CSV
                </Button>
                {!hasScreenings && (
                  <Button variant="default" asChild>
                    <Link href={route('screening.offline')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Screening
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            
            {hasScreenings ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {screenings.data.map((screening) => (
                      <TableRow key={screening.id}>
                        <TableCell>{screening.full_name}</TableCell>
                        <TableCell>{screening.email}</TableCell>
                        <TableCell>
                          <Badge variant={screening.status === 'completed' ? 'default' : screening.status === 'pending' ? 'secondary' : 'destructive'}>
                            {screening.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Showing page {screenings.current_page} of {screenings.last_page}
                  </span>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={screenings.current_page === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={screenings.current_page === screenings.last_page}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No screening data available.</p>
                <Button variant="default" asChild>
                  <Link href={route('screening.offline')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Screening
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Authenticated>
  );
}