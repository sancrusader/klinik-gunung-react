'use client'

import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import ManagerLayout from "@/Layouts/ManagerLayout"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Input } from "@/Components/ui/input"
import { Toaster } from "sonner"
import { toast } from "sonner"
import { useForm,Head } from '@inertiajs/react'

type FormData = {
  staff_id: string
  shift: string
  schedule_date: string
  role: string
}

interface Staff {
  id: number
  name: string
  role: string
}

interface AddScheduleProps {
  staff: Staff[]
}

export default function AddScheduleComponent({ staff }: AddScheduleProps) {
  const { data, setData, post, reset } = useForm<FormData>({
    staff_id: '',
    shift: '',
    schedule_date: '',
    role: '',
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name: keyof FormData, value: string) => {
    setData(name, value)
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleStaffChange = (value: string) => {
    const selectedStaff = staff.find((staffMember) => staffMember.id.toString() === value);
    setData(prevData => ({
      ...prevData,
      staff_id: value,
      role: selectedStaff ? selectedStaff.role : ""
    }));
    setErrors((prev) => ({ ...prev, staff_id: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    post(route('manager.staff.store'), {
      onSuccess: () => {
        toast.success("Jadwal berhasil ditambahkan!")
        reset()
        setIsSubmitting(false)
      },
      onError: (errors) => {
        toast.error("Gagal menambahkan jadwal. Silakan coba lagi.")
        setErrors(errors as Partial<FormData>)
        setIsSubmitting(false)
      },
    })
  }

  return (
    <>
    <Head title="Shiff"/>
    <div className="py-12">
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Atur Jadwal Staf</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="staff_id">Staf</Label>
            <Select
              defaultValue={data.staff_id}
              onValueChange={handleStaffChange}
            >
              <SelectTrigger id="staff_id">
                <SelectValue placeholder="Pilih Staf" />
              </SelectTrigger>
              <SelectContent>
                {staff.map((staffMember) => (
                  <SelectItem key={staffMember.id} value={staffMember.id.toString()}>
                    {staffMember.name} ({staffMember.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.staff_id && (
              <p className="text-sm text-red-500 mt-1">{errors.staff_id}</p>
            )}
          </div>

          <div>
            <Label htmlFor="shift">Shift</Label>
            <Input
              id="shift"
              value={data.shift}
              onChange={(e) => handleChange("shift", e.target.value)}
            />
            {errors.shift && (
              <p className="text-sm text-red-500 mt-1">{errors.shift}</p>
            )}
          </div>

          <div>
            <Label htmlFor="schedule_date">Tanggal</Label>
            <Input
              id="schedule_date"
              type="date"
              value={data.schedule_date}
              onChange={(e) => handleChange("schedule_date", e.target.value)}
            />
            {errors.schedule_date && (
              <p className="text-sm text-red-500 mt-1">{errors.schedule_date}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Peran</Label>
            <Input
              id="role"
              value={data.role}
              onChange={(e) => handleChange("role", e.target.value)}
              readOnly
            />
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Jadwal"}
          </Button>
        </form>
      </div>
    </div>
    </>
  )
}
