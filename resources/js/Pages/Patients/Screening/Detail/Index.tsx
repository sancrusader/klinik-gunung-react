import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Badge } from "@/Components/ui/badge"
import { Screening } from "@/types/screening"
import SideBar from "@/Layouts/Dashboard/Sidebar"
import { Head } from "@inertiajs/react"
import { User, Calendar, Phone, Clipboard, Activity, HelpCircle } from "lucide-react"
import PageContainer from "@/Layouts/PageContainer"

interface Questions {
  [key: string]: string
}

export default function ScreeningDetails({ screening, question }: { screening: Screening; question: Questions }) {
  const screeningDetails = [
    { label: "Nama Lengkap", value: screening.full_name, icon: <User className="h-4 w-4" /> },
    { label: "Umur", value: screening.age, icon: <User className="h-4 w-4" /> },
    { label: "Jenis Kelamin", value: screening.gender, icon: <User className="h-4 w-4" /> },
    { label: "Nomor Kontak", value: screening.contact_number, icon: <Phone className="h-4 w-4" /> },
    { label: "Tanggal Rencana Pendakian", value: screening.planned_hiking_date, icon: <Calendar className="h-4 w-4" /> },
    { label: "Jumlah Pendakian Sebelumnya (di atas 2.000 meter)", value: screening.previous_hikes_count, icon: <Activity className="h-4 w-4" /> },
  ]

  return (
    <SideBar header={`Detail Screening ${screening.full_name}`}>
      <Head title={`Detail Screening - ${screening.full_name}`} />
      <PageContainer>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Detail Screening: {screening.full_name}</CardTitle>
            <CardDescription>Informasi lengkap hasil screening pendakian</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal-info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal-info">Informasi Pribadi</TabsTrigger>
                <TabsTrigger value="questionnaire">Kuesioner</TabsTrigger>
              </TabsList>
              <TabsContent value="personal-info" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {screeningDetails.map((detail, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            {detail.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{detail.label}</p>
                            <p className="font-medium">{detail.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="questionnaire" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hasil Kuesioner</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.keys(question).map((key) => {
                        const value = screening[key as keyof Screening];

                        return (
                          <div key={key} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start space-x-2">
                              <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="font-bold">{question[key]}</p>
                                <p className="mt-1 text-muted-foreground">
                                  {Array.isArray(value)
                                    ? value.map((item, index) => (
                                        <Badge key={index} variant="secondary" className="mr-1 mb-1">
                                          {item}
                                        </Badge>
                                      ))
                                    : typeof value === "object" && value !== null && "name" in value
                                    ? (value as { name: string }).name
                                    : String(value ?? "")
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </PageContainer>
    </SideBar>
  )
}
