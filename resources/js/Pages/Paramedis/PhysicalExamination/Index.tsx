import React from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";

interface Screening {
    id: number;
    blood_pressure: string;
    heart_rate: string;
    oxygen_saturation: string;
    respiratory_rate: string;
    body_temperature: string;
    physical_assessment: string;
    is_recommended_for_hiking: boolean;
    not_recommended_reason: string;
    medical_recommendations: string;
}

const HealthAssessment: React.FC<{ screening: Screening }> = ({
    screening,
}) => {
    const { data, setData, post, processing, errors } = useForm<Screening>({
        id: screening.id,
        blood_pressure: screening.blood_pressure || "",
        heart_rate: screening.heart_rate || "",
        oxygen_saturation: screening.oxygen_saturation || "",
        respiratory_rate: screening.respiratory_rate || "",
        body_temperature: screening.body_temperature || "",
        physical_assessment: screening.physical_assessment || "",
        is_recommended_for_hiking: screening.is_recommended_for_hiking || false,
        not_recommended_reason: screening.not_recommended_reason || "",
        medical_recommendations: screening.medical_recommendations || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("physical.store", { id: screening.id }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-xl mx-auto"
        >
            <div>
                <Label htmlFor="blood_pressure">Tekanan Darah</Label>
                <div className="relative">
                    <Input
                        id="blood_pressure"
                        type="text"
                        value={data.blood_pressure}
                        onChange={(e) =>
                            setData("blood_pressure", e.target.value)
                        }
                        className="pr-14"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        mmHg
                    </span>
                </div>
                {errors.blood_pressure && (
                    <div className="text-red-500">
                        {errors.blood_pressure}
                    </div>
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
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        BPM (beats per minute)
            </span>
            </div>
                {errors.heart_rate && (
                    <div className="text-red-500">{errors.heart_rate}</div>
                )}
            </div>

            <div>
          <Label htmlFor="oxygen_saturation">Saturasi Oksigen</Label>
          <div className="relative">
                <Input
                    id="oxygen_saturation"
                    type="number"
                    value={data.oxygen_saturation}
                    onChange={(e) =>
                        setData("oxygen_saturation", e.target.value)
                    }
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        %
            </span>
            </div>
                {errors.oxygen_saturation && (
                    <div className="text-red-500">
                        {errors.oxygen_saturation}
                    </div>
                )}
            </div>

            <div>
          <Label htmlFor="respiratory_rate">Frekuensi Napas</Label>
          <div className="relative">
                <Input
                    id="respiratory_rate"
                    type="number"
                    value={data.respiratory_rate}
                    onChange={(e) =>
                        setData("respiratory_rate", e.target.value)
                    }
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        breaths per minute
            </span>
            </div>
                {errors.respiratory_rate && (
                    <div className="text-red-500">
                        {errors.respiratory_rate}
                    </div>
                )}
            </div>

            <div>
          <Label htmlFor="body_temperature">Suhu Tubuh</Label>
          <div className="relative">
                <Input
                    id="body_temperature"
                    type="number"
                    step="0.01"
                    value={data.body_temperature}
                    onChange={(e) =>
                        setData("body_temperature", e.target.value)
                    }
                /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        °C
            </span>
            </div>
                {errors.body_temperature && (
                    <div className="text-red-500">
                        {errors.body_temperature}
                    </div>
                )}
            </div>

            <div>
                <Label htmlFor="physical_assessment">
                    Physical Assessment
                </Label>
                <Input
                    id="physical_assessment"
                    type="text"
                    value={data.physical_assessment}
                    onChange={(e) =>
                        setData("physical_assessment", e.target.value)
                    }
                />
                {errors.physical_assessment && (
                    <div className="text-red-500">
                        {errors.physical_assessment}
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="is_recommended_for_hiking"
                    checked={data.is_recommended_for_hiking}
                    onCheckedChange={(checked: boolean) =>
                        setData("is_recommended_for_hiking", checked)
                    }
                />
                <Label htmlFor="is_recommended_for_hiking">
                    Recommended for Hiking
                </Label>
            </div>
            {errors.is_recommended_for_hiking && (
                <div className="text-red-500">
                    {errors.is_recommended_for_hiking}
                </div>
            )}

            <div>
                <Label htmlFor="not_recommended_reason">
                    Not Recommended Reason
                </Label>
                <Textarea
                    id="not_recommended_reason"
                    value={data.not_recommended_reason}
                    onChange={(e) =>
                        setData("not_recommended_reason", e.target.value)
                    }
                />
                {errors.not_recommended_reason && (
                    <div className="text-red-500">
                        {errors.not_recommended_reason}
                    </div>
                )}
            </div>

            <div>
                <Label htmlFor="medical_recommendations">
                    Medical Recommendations
                </Label>
                <Textarea
                    id="medical_recommendations"
                    value={data.medical_recommendations}
                    onChange={(e) =>
                        setData("medical_recommendations", e.target.value)
                    }
                />
                {errors.medical_recommendations && (
                    <div className="text-red-500">
                        {errors.medical_recommendations}
                    </div>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                Submit Health Assessment
            </Button>
        </form>
    );
};

export default HealthAssessment;
