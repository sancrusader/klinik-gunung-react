"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import QrScanner from "qr-scanner";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ScanFormData {
    qr_code_data: string;
}

const QRScanner: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm<ScanFormData>({
        qr_code_data: "",
    });
    const { toast } = useToast();
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current
                    .clear()
                    .catch((error) => console.error(error));
            }
        };
    }, []);

    const startScanning = () => {
        if (!scanning) {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );

            scannerRef.current = html5QrcodeScanner;
            html5QrcodeScanner.render(onScanSuccess, onScanError);
            setScanning(true);
        }
    };

    const stopScanning = () => {
        if (scannerRef.current) {
            scannerRef.current
                .clear()
                .then(() => {
                    setScanning(false);
                })
                .catch((error) =>
                    console.error("Failed to stop scanning: ", error)
                );
        }
    };

    const onScanSuccess = (decodedText: string) => {
        setData("qr_code_data", decodedText);
        submitForm();
        stopScanning();
        toast({
            title: "QR Code Scanned",
            description: "Successfully scanned QR code data.",
        });
    };

    const onScanError = (errorMessage: string) => {
        console.warn(`QR error = ${errorMessage}`);
        toast({
            title: "Scan Error",
            description: "Failed to scan QR code. Please try again.",
            variant: "destructive",
        });
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const result = await QrScanner.scanImage(file, {
                returnDetailedScanResult: true,
            });

            setData("qr_code_data", result.data);
            submitForm();

            toast({
                title: "QR Code Scanned",
                description: "Successfully scanned QR code from image.",
            });
        } catch (error) {
            console.error("QR Scan failed:", error);
            toast({
                title: "Scan Error",
                description:
                    "Failed to scan QR code from image. Please try again.",
                variant: "destructive",
            });
        }
    };

    const submitForm = () => {
        post("/dashboard/admin/scan/process", {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <section className="flex h-screen items-center justify-center">
            <Head title="Scan" />
            <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Scan QR Code</CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        id="reader"
                        className="border-2 border-gray-300 mb-4 rounded-lg overflow-hidden"
                    />

                    <div className="flex justify-between mb-4 space-x-4">
                        <Button
                            onClick={startScanning}
                            disabled={scanning || processing}
                            className="flex-1"
                        >
                            {scanning ? "Scanning..." : "Start Camera Scan"}
                        </Button>
                        <Button
                            onClick={stopScanning}
                            disabled={!scanning || processing}
                            variant="destructive"
                            className="flex-1"
                        >
                            Stop Camera Scan
                        </Button>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="upload-image" className="block mb-2">
                            Or upload a QR code image
                        </Label>
                        <Input
                            type="file"
                            id="upload-image"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={processing}
                        />
                    </div>

                    {errors.qr_code_data && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.qr_code_data}
                        </p>
                    )}

                    {processing && (
                        <p className="text-blue-500 text-sm mt-2">
                            Processing QR code data...
                        </p>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default QRScanner;
