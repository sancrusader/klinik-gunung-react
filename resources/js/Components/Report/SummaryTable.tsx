import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

interface SummaryTableProps {
  summary: { [key: string]: number };
  physical_health: number;
}

const SummaryTable = ({ summary, physical_health }: SummaryTableProps) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Ringkasan Pemeriksaan Kesehatan</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hasil Pemeriksaan</TableHead>
            <TableHead>Jumlah</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(summary).map(([result, count], index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {result.charAt(0).toUpperCase() + result.slice(1)}
              </TableCell>
              <TableCell>{count > 0 ? count : "Belum Ada"}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium">Penyakit Jantung</TableCell>
            <TableCell>{physical_health > 0 ? physical_health : "Belum ada"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default SummaryTable;
