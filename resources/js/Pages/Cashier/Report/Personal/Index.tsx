import { Payments } from "@/types/payments"
import { PageProps } from "@/types"
import CashierSidebar from "@/Layouts/Dashboard/CashierSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Badge } from "@/Components/ui/badge"
import { Pagination, PaginationContent } from "@/Components/ui/pagination"
import PageContainer from "@/Layouts/PageContainer"
import { Head } from "@inertiajs/react"
import { DollarSign, CreditCard, Users, FileDown } from "lucide-react"
import { Button } from "@/Components/ui/button"
import auth from "@/types"

type Props = PageProps<{
  pagination_links: string
  payments: Payments
  paymentsCount: number
}>

export default function Index({ payments, pagination_links, paymentsCount, auth }: Props) {
    const totalAmountPaid = Array.isArray(payments)
    ? payments.reduce((sum, payment) => sum + Number(payment.amount_paid || 0), 0)
    : 0;
  const uniqueCashiers = new Set(payments.map(payment => payment.cashier?.name)).size

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log("Downloading PDF...")
    // You might want to call an API endpoint or use a library like jsPDF here
  }

  return (
    <CashierSidebar header="My Report">
      <PageContainer>
        <Head title="My Report" />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{auth.user.name} Report</h1>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paymentsCount}</div>
              <p className="text-xs text-muted-foreground">Total transactions processed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Amount Received</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmountPaid || 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total money collected</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cashiers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCashiers}</div>
              <p className="text-xs text-muted-foreground">Cashiers who processed payments</p>
            </CardContent>
          </Card>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>My Report Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {payments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cashier</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Amount Paid</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.cashier?.name}</TableCell>
                      <TableCell>{payment.screening_offlines?.full_name ?? 'No name available'}</TableCell>
                      <TableCell>
                        <Badge variant={payment.payment_status === 1 ? 'secondary' : 'destructive'}>
                          {payment.payment_status === 1 ? 'Paid' : 'Unpaid'}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.payment_method}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(payment.amount_paid)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-muted-foreground">No payments report available.</p>
            )}
          </CardContent>
        </Card>
        {pagination_links && (
          <Pagination className="mt-4">
            <PaginationContent>
              <div dangerouslySetInnerHTML={{ __html: pagination_links }} />
            </PaginationContent>
          </Pagination>
        )}
      </PageContainer>
    </CashierSidebar>
  )
}
