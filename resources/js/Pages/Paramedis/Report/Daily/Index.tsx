import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import ParamedisSidebar from "@/Layouts/Dashboard/ParamedisSidebar";
import SummaryTable from "@/Components/Report/SummaryTable";
import ReportTable from "@/Components/Report/ReportTable";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { CalendarIcon, Loader2 } from "lucide-react"; // Import ikon loader

interface Report {
  queue_number: string;
  user: {
    id: number;
    name: string;
  };
  paramedis: {
    name: string;
  } | null;
  health_check_result: string;
  created_at: string;
}

interface Summary {
  [key: string]: number;
}

interface Props {
  date: string;
  reports: Report[];
  summary: Summary;
  physical_health: number;
}

export default function Component({ date, reports, summary, physical_health }: Props) {
  const { data, setData, get, processing } = useForm({
    date: date || new Date().toISOString().split('T')[0],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("date", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    // Simulate a delay before submitting
    setTimeout(() => {
      get(route("daily.report"), {
        preserveState: true,
      });
      setIsLoading(false); // Reset loading state after request
    }, 1000); // Delay of 1000ms (1 second)
  };

  return (
    <ParamedisSidebar header="Previous Report">
      <Head title="Laporan Harian" />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Laporan Harian Paramedis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-4">
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={data.date}
                  onChange={handleDateChange}
                  className="pl-10"
                />
              </div>
              <Button
                type="submit"
                disabled={processing || isLoading} // Disable button when processing or loading
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> {/* Spinner */}
                    Loading...
                  </>
                ) : (
                  'Tampilkan Laporan'
                )}
              </Button>
            </form>
            <p className="text-center text-muted-foreground mt-4">Tanggal: {data.date}</p>
          </CardContent>
        </Card>

        <SummaryTable summary={summary} physical_health={physical_health} />
        <ReportTable reports={reports} />
      </div>
    </ParamedisSidebar>
  );
}
