import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Screening } from "@/types/screening"

interface Questions {
  [key: string]: string
}

export default function ScreeningDetails({ screening, question }: { screening: Screening; question: Questions }) {
  const screeningDetails = [
    { label: "Nama Lengkap", value: screening.full_name },
    { label: "Umur", value: screening.age },
    { label: "Jenis Kelamin", value: screening.gender },
    { label: "Nomor Kontak", value: screening.contact_number },
    { label: "Tanggal Rencana Pendakian", value: screening.planned_hiking_date },
    { label: "Jumlah Pendakian Sebelumnya (di atas 2.000 meter)", value: screening.previous_hikes_count },
  ]

  return (
    <section className="flex h-screen items-center justify-center">
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Screening Details {screening.full_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {screeningDetails.map((detail, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{detail.label}</p>
              <p className="text-base">{detail.value}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">Kuesioner</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(question).map((key) => (
            <div key={key} className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{question[key]}</p>
              <p className="text-base">{screening[key as keyof Screening] as string}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </section>
  )
}
