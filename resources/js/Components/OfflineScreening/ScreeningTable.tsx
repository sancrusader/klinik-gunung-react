import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Screening } from "@/types/screening";
import HealthCheckForm from "@/Components/HealthCheck/HealthCheckForm";

interface ScreeningTableProps {
  screenings: Screening[];
  isLoading: boolean;
  searchQuery: string;
}

type ScreeningProcessResponse = {
  data: Partial<Screening>;
};

const ScreeningTable = ({ screenings, isLoading, searchQuery }: ScreeningTableProps) => {
  const [screeningData, setScreeningData] = useState<Screening[]>(screenings);

  useEffect(() => {
    const channel = window.Echo.channel('screening-user')
      .listen('.screening-process', (response: ScreeningProcessResponse) => {
        const newScreening = response.data as Screening;

        setScreeningData((prevData) => {
          const exists = prevData.some((screening) => screening.id === newScreening.id);

          if (exists) {
            return prevData.map((screening) =>
              screening.id === newScreening.id ? { ...screening, ...newScreening } : screening
            );
          } else {
            return [...prevData, newScreening];
          }
        });
      });

    return () => {
      channel.stopListening('.screening-process'); // Ensure correct event name is used
    };
  }, []);

  const filteredScreenings = screeningData.filter((screening: Screening) =>
    screening.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">Nomor</TableHead>
          <TableHead>Nama Lengkap</TableHead>
          <TableHead>Umur</TableHead>
          <TableHead>Jenis Kelamin</TableHead>
          <TableHead>Kontak</TableHead>
          <TableHead>Planned Hiking Date</TableHead>
          <TableHead>Previous Hikes</TableHead>
          <TableHead>Questioner</TableHead>
          <TableHead>Pemeriksaan Fisik</TableHead>
          <TableHead>Status Kesehatan</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={10} className="text-center">Loading...</TableCell>
          </TableRow>
        ) : (
          filteredScreenings.map((screening, index) => (
            <TableRow key={screening.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{screening.full_name}</TableCell>
              <TableCell>{screening.age}</TableCell>
              <TableCell>{screening.gender}</TableCell>
              <TableCell>{screening.contact_number}</TableCell>
              <TableCell>{screening.planned_hiking_date}</TableCell>
              <TableCell>{screening.previous_hikes_count}</TableCell>
              <TableCell>
                <Link href={route("paramedis.questioner.detail", screening.id)}>
                  <Button variant="link">Sudah Mengisi</Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={route("physical.paramedis", screening.id)}>
                  <Button variant="link">Pemeriksaan Fisik</Button>
                </Link>
              </TableCell>
              <TableCell>
                {screening.health_check_result === "sehat" ? (
                  <p>{screening.health_check_result}</p>
                ) : (
                  <HealthCheckForm screening={screening} />
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ScreeningTable;
