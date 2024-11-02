import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import CashierSidebar from "@/Layouts/Dashboard/CashierSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/Components/ui/table";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const salesData = [
  { date: '2023-01', amount: 1000 },
  { date: '2023-02', amount: 1500 },
  { date: '2023-03', amount: 1200 },
  { date: '2023-04', amount: 1800 },
  { date: '2023-05', amount: 2000 },
  { date: '2023-06', amount: 2500 },
];

const recentTransactions = [
  { id: 1, patient: 'John Doe', service: 'Consultation', amount: 50 },
  { id: 2, patient: 'Jane Smith', service: 'X-Ray', amount: 100 },
  { id: 3, patient: 'Bob Johnson', service: 'Blood Test', amount: 75 },
  { id: 4, patient: 'Alice Brown', service: 'Vaccination', amount: 60 },
];

export default function Dashboard({ auth }: PageProps) {
    return (
        <CashierSidebar header={'Cashier Dashboard'}>
            <Head title="Dashboard" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold mb-6">Selamat Datang Di Klinik Gunung, {auth.user.name}</h1>

                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Pendapatan Hari Ini</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Rp 2,500,000</div>
                                <p className="text-xs text-muted-foreground">+20.1% dari kemarin</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Transaksi Hari Ini</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">25</div>
                                <p className="text-xs text-muted-foreground">+5 dari kemarin</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pasien Baru Bulan Ini</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">120</div>
                                <p className="text-xs text-muted-foreground">+10% dari bulan lalu</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sales Chart */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Grafik Penjualan</CardTitle>
                            <CardDescription>Pendapatan bulanan dalam 6 bulan terakhir</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Transactions */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Transaksi Terbaru</CardTitle>
                            <CardDescription>Daftar transaksi terbaru hari ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Pasien</TableHead>
                                        <TableHead>Layanan</TableHead>
                                        <TableHead>Jumlah</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{transaction.id}</TableCell>
                                            <TableCell>{transaction.patient}</TableCell>
                                            <TableCell>{transaction.service}</TableCell>
                                            <TableCell>Rp {transaction.amount.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Aksi Cepat</CardTitle>
                            <CardDescription>Akses cepat ke fungsi-fungsi umum</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-4">
                            <Button>Transaksi Baru</Button>
                            <Button variant="outline">Cari Pasien</Button>
                            <Button variant="outline">Laporan Harian</Button>
                            <Button variant="outline">Pengaturan</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CashierSidebar>
    );
}
