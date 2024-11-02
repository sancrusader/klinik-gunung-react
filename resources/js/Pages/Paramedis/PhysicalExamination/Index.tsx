import React, { FormEvent } from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { toast, Toaster } from "sonner";
import ParamedisSidebar from "@/Layouts/Dashboard/ParamedisSidebar";
import PageContainer from "@/Layouts/PageContainer";
interface Screening {
  id: number;
  blood_pressure: string;
  heart_rate: string;
  oxygen_saturation: string;
  respiratory_rate: string;
  body_temperature: string;
  is_recommended_for_hiking: string | null;
  medical_recommendations: string;
}

const HealthAssessment: React.FC<{ screening: Screening }> = ({ screening }) => {
  const { data, setData, post, processing, errors } = useForm<Screening>({
    id: screening.id,
    blood_pressure: screening.blood_pressure || "",
    heart_rate: screening.heart_rate || "",
    oxygen_saturation: screening.oxygen_saturation || "",
    respiratory_rate: screening.respiratory_rate || "",
    body_temperature: screening.body_temperature || "",
    is_recommended_for_hiking: screening.is_recommended_for_hiking || "",
    medical_recommendations: screening.medical_recommendations || "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route("physical.store", { id: screening.id }), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Penilaian kesehatan berhasil disimpan");
      },
      onError: () => {
        toast.error("Gagal menyimpan penilaian kesehatan. Silakan coba lagi.");
      },
    });
  };

  const [recommendationValue, notRecommendedReason] = (data.is_recommended_for_hiking || "").split("|");

  return (
    <ParamedisSidebar header={'Physical Examination'}>
        <PageContainer scrollable={true}>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <div>
          <Label htmlFor="blood_pressure">Tekanan Darah</Label>
          <div className="relative">
            <Input
              id="blood_pressure"
              value={data.blood_pressure}
              onChange={(e) => setData("blood_pressure", e.target.value)}
              placeholder="120/80"
              className="pr-14"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              mmHg
            </span>
          </div>
          {errors.blood_pressure && (
            <p className="text-red-500 text-sm mt-1">{errors.blood_pressure}</p>
          )}
        </div>

        <div>
          <Label htmlFor="heart_rate">Detak Jantung</Label>
          <div className="relative">
            <Input
              id="heart_rate"
              type="number"
              value={data.heart_rate}
              onChange={(e) => setData("heart_rate", e.target.value)}
              className="pr-14"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              BPM
            </span>
          </div>
          {errors.heart_rate && (
            <p className="text-red-500 text-sm mt-1">{errors.heart_rate}</p>
          )}
        </div>

        <div>
          <Label htmlFor="oxygen_saturation">Saturasi Oksigen</Label>
          <div className="relative">
            <Input
              id="oxygen_saturation"
              type="number"
              value={data.oxygen_saturation}
              onChange={(e) => setData("oxygen_saturation", e.target.value)}
              className="pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              %
            </span>
          </div>
          {errors.oxygen_saturation && (
            <p className="text-red-500 text-sm mt-1">{errors.oxygen_saturation}</p>
          )}
        </div>

        <div>
          <Label htmlFor="respiratory_rate">Frekuensi Napas</Label>
          <div className="relative">
            <Input
              id="respiratory_rate"
              type="number"
              value={data.respiratory_rate}
              onChange={(e) => setData("respiratory_rate", e.target.value)}
              className="pr-14"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              per menit
            </span>
          </div>
          {errors.respiratory_rate && (
            <p className="text-red-500 text-sm mt-1">{errors.respiratory_rate}</p>
          )}
        </div>

        <div>
          <Label htmlFor="body_temperature">Suhu Tubuh</Label>
          <div className="relative">
            <Input
              id="body_temperature"
              type="number"
              step="0.1"
              value={data.body_temperature}
              onChange={(e) => setData("body_temperature", e.target.value)}
              className="pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              °C
            </span>
          </div>
          {errors.body_temperature && (
            <p className="text-red-500 text-sm mt-1">{errors.body_temperature}</p>
          )}
        </div>

        <div>
          <Label htmlFor="is_recommended_for_hiking">Rekomendasi untuk Pendakian</Label>
          <Select
            value={recommendationValue}
            onValueChange={(value) => setData("is_recommended_for_hiking", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih rekomendasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sangat baik untuk pendakian">Sangat baik untuk pendakian</SelectItem>
              <SelectItem value="Cukup baik, perlu perhatian khusus">Cukup baik, perlu perhatian khusus</SelectItem>
              <SelectItem value="Tidak direkomendasikan">Tidak direkomendasikan untuk melakukan pendakian</SelectItem>
            </SelectContent>
          </Select>
          {errors.is_recommended_for_hiking && (
            <p className="text-red-500 text-sm mt-1">{errors.is_recommended_for_hiking}</p>
          )}
        </div>

        {recommendationValue === "Tidak direkomendasikan" && (
          <div>
            <Label htmlFor="not_recommended_reason">Alasan Tidak Direkomendasikan</Label>
            <Textarea
              id="not_recommended_reason"
              value={notRecommendedReason || ""}
              onChange={(e) =>
                setData("is_recommended_for_hiking", `Tidak direkomendasikan|${e.target.value}`)
              }
            />
          </div>
        )}

        <div>
          <Label htmlFor="medical_recommendations">Rekomendasi Medis</Label>
          <Textarea
            id="medical_recommendations"
            value={data.medical_recommendations}
            onChange={(e) => setData("medical_recommendations", e.target.value)}
          />
          {errors.medical_recommendations && (
            <p className="text-red-500 text-sm mt-1">{errors.medical_recommendations}</p>
          )}
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Perhatian</AlertTitle>
          <AlertDescription>
            Pastikan semua data yang dimasukkan sudah benar sebelum mengirimkan formulir.
          </AlertDescription>
        </Alert>

        <Button type="submit" disabled={processing}>
          {processing ? "Mengirim..." : "Kirim Penilaian Kesehatan"}
        </Button>
      </form>
      </PageContainer>
      </ParamedisSidebar>
  );
};

export default HealthAssessment;
