'use client'

import React, { useState } from "react"
import { PageProps } from "@/types"
import CertificateLink from "@/Components/CertificateLink"
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

interface Screening {
  id: number
  full_name: string
  queue_number: number
  age: number
  gender: string
  contact_number: string
  planned_hiking_date: string
  previous_hikes_count: number
  health_check_result: string
  certificate_path?: string
  certificate_url?: string
}

interface Props {
  paidScreenings?: Screening[]
}

export default function Offline({ auth }: PageProps) {
  const { paidScreenings = [] } = usePage().props as Props
  const [filter, setFilter] = useState("")

  const filteredScreenings = paidScreenings.filter((screening) =>
    screening.full_name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <CashierSidebar header="Payment History">
      <Head title="Payment History" />

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
                    <TableHead className="w-[100px]">Nomor</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Planned Hiking Date</TableHead>
                    <TableHead>Previous Hikes</TableHead>
                    <TableHead>Certificate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScreenings.map((screening) => (
                    <TableRow key={screening.id}>
                      <TableCell>{screening.queue_number}</TableCell>
                      <TableCell>{screening.full_name}</TableCell>
                      <TableCell>{screening.age}</TableCell>
                      <TableCell>{screening.gender}</TableCell>
                      <TableCell>{screening.contact_number}</TableCell>
                      <TableCell>{screening.planned_hiking_date}</TableCell>
                      <TableCell>{screening.previous_hikes_count}</TableCell>
                      <TableCell>
                        <CertificateLink screening={screening} />
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
