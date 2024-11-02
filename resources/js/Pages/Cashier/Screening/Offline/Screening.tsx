'use client'

import React, { useState } from "react"
import { PageProps } from "@/types"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import { usePage, Head, Link } from "@inertiajs/react"
import CashierSidebar from "@/Layouts/Dashboard/CashierSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Button } from "@/Components/ui/button"

interface Screening {
  id: number
  full_name: string
  queue_number: number
  age: number
  gender: string
  contact_number: string
  planned_hiking_date: string
  previous_hikes_count: number
  payment_status: boolean
}

interface Props {
  screenings?: Screening[]
}

export default function Payment({ auth }: PageProps) {
  const { screenings = [] } = usePage().props as Props
  const [filter, setFilter] = useState("")

  const filteredScreenings = screenings.filter((screening) =>
    screening.full_name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <CashierSidebar header="Screening Payment">
      <Head title="Screening Offline" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>List of Offline Screening Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Filter by name"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter screenings by name"
                />
              </div>
              <Table>
                <TableCaption>List of Offline Screening Entries</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Umur</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Kontak</TableHead>
                    <TableHead>Planned Hiking Date</TableHead>
                    <TableHead>Previous Hikes</TableHead>
                    <TableHead>Pembayaran</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScreenings.map((screening,index) => (
                    <TableRow key={screening.id}>
                    <TableCell>{index + 1}</TableCell> {/* Row number starting from 1 */}
                      <TableCell>{screening.full_name}</TableCell>
                      <TableCell>
                        {screening.payment_status ? (
                          <span className="text-green-500 font-medium">Sudah Bayar</span>
                        ) : (
                          <Button
                            variant="link"
                            asChild
                            className="text-blue-500 p-0 h-auto font-normal"
                          >
                            <Link href={route('payment.cashier', screening.id)}>
                              Lakukan Pembayaran
                            </Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </CashierSidebar>
  )
}
