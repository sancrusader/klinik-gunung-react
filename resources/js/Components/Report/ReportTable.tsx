import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

interface Report {
  queue_number: string;
  user: {
    id: number,
    name: string;

  };
  paramedis: {
    name: string;
  } | null;
  health_check_result: string;
  created_at: string;
}

interface ReportTableProps {
  reports: Report[];
}

const ReportTable = ({ reports }: ReportTableProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Detail Laporan</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nomor Antrian</TableHead>
            <TableHead>Nama Pasien</TableHead>
            <TableHead>Nama Paramedis</TableHead>
            <TableHead>Hasil Pemeriksaan</TableHead>
            <TableHead>Tanggal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.queue_number}</TableCell>
                <TableCell>{report.user.name}</TableCell>
                <TableCell>
                  {report.paramedis ? report.paramedis.name : "N/A"}
                </TableCell>
                <TableCell>{report.health_check_result}</TableCell>

                <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{report.user.id}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada laporan untuk tanggal ini.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default ReportTable;
