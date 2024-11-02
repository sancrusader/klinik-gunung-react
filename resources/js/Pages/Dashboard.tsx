import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/Components/ui/card'
  import Sidebar from "@/Layouts/Dashboard/Sidebar"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
  import { Head } from "@inertiajs/react"
  import { Button } from "@/Components/ui/button"
  import { CalendarDays, FileText, Activity, Pill, Phone } from "lucide-react"
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
  import { PageProps } from '@/types'
type Screening = {
    created_at: string,
}

  type Props = {
    screening: Screening | null;
    visitCount: number;
    auth: string,
  };

  const weightData = [
    { date: '2023-01', weight: 70 },
    { date: '2023-02', weight: 71 },
    { date: '2023-03', weight: 70.5 },
    { date: '2023-04', weight: 69 },
    { date: '2023-05', weight: 68.5 },
    { date: '2023-06', weight: 68 },
  ]

  const bloodPressureData = [
    { date: '2023-01', systolic: 120, diastolic: 80 },
    { date: '2023-02', systolic: 118, diastolic: 78 },
    { date: '2023-03', systolic: 122, diastolic: 82 },
    { date: '2023-04', systolic: 121, diastolic: 79 },
    { date: '2023-05', systolic: 120, diastolic: 80 },
    { date: '2023-06', systolic: 119, diastolic: 78 },
  ]

  export default function Dashboard({ screening,visitCount,auth }:Props) {
    return (
      <Sidebar header={'Patient Dashboard'}>
        <Head title="Dashboard" />
        <div className='w-full overflow-x-auto pb-2'>
          <h1 className='text-2xl font-bold tracking-tight mb-4'>Selamat Datang Di Klinik Gunung, {auth.user.name}</h1>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="screening">Screening</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="charts">Health Charts</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Your Screening
                    </CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                        {screening ? (
                            <>
                            <div className="text-2xl font-bold">
                                {new Date(screening.created_at).toLocaleDateString('id-ID')}
                            </div>
                            <p className="text-xs text-muted-foreground">
                               Hour {new Date(screening.created_at).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                })}
                            </p>
                            </>
                        ) : (
                            <p className="text-center text-muted-foreground">You haven't had a screening.</p>
                        )}
                        </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Recent Visits
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{visitCount}</div>
                    <p className="text-xs text-muted-foreground">
                      In the last 3 months
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Prescriptions
                    </CardTitle>
                    <Pill className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">
                      Active prescriptions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Emergency Contact
                    </CardTitle>
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Jane Doe</div>
                    <p className="text-xs text-muted-foreground">
                      +62 123-456-7890
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Health Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Stay hydrated by drinking at least 8 glasses of water daily.</li>
                      <li>Aim for 30 minutes of moderate exercise 5 days a week.</li>
                      <li>Incorporate fruits and vegetables into every meal.</li>
                      <li>Practice good sleep hygiene for better rest.</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks you might need</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-2">
                    <Button className="w-full">Schedule Appointment</Button>
                    <Button className="w-full" variant="outline">Request Prescription Refill</Button>
                    <Button className="w-full" variant="outline">View Test Results</Button>
                    <Button className="w-full" variant="outline">Contact Doctor</Button>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Weight Tracking</CardTitle>
                  <CardDescription>Your weight over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled visits to Klinik Gunung</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">General Check-up</p>
                        <p className="text-sm text-muted-foreground">With Dr. Smith</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">June 15, 2023</p>
                        <p className="text-sm text-muted-foreground">10:00 AM</p>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Dental Cleaning</p>
                        <p className="text-sm text-muted-foreground">With Dr. Johnson</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">July 3, 2023</p>
                        <p className="text-sm text-muted-foreground">2:30 PM</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="records" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Medical Records</CardTitle>
                  <CardDescription>Your latest health information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Blood Test Results</p>
                        <p className="text-sm text-muted-foreground">May 20, 2023</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">View</Button>
                    </li>
                    <li className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">X-Ray Report</p>
                        <p className="text-sm text-muted-foreground">April 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">View</Button>
                    </li>
                    <li className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Annual Check-up Summary</p>
                        <p className="text-sm text-muted-foreground">March 1, 2023</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">View</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="screening" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Screening</CardTitle>
                  <CardDescription>Your latest health information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Health Test Results</p>
                        <p className="text-sm text-muted-foreground">May 20, 2023</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">View</Button>
                    </li>
                    <li className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Questioner</p>
                        <p className="text-sm text-muted-foreground">April 15, 2023</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">View</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="charts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Tracking</CardTitle>
                  <CardDescription>Your weight over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Blood Pressure Readings</CardTitle>
                  <CardDescription>Your blood pressure over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={bloodPressureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" />
                        <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Sidebar>
    )
  }
