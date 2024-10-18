import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button"; // Misalnya menggunakan komponen Button dari UI yang ada

const SendDataButton = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSendData = async () => {
        setLoading(true);
        setMessage("");

        try {
            console.log("Mengirim data...");
            const response = await axios.post(
                "https://next-data-amber.vercel.app/api/data",
                {
                    // Data yang ingin dikirim
                    id: 1,
                    name: "fox",
                },
                {
                    headers: {
                        Authorization: "Bearer Fox", // Token otentikasi
                        "Content-Type": "application/json", // Tentukan tipe konten sebagai JSON
                    },
                }
            );

            setMessage(response.data.message); // Mengatur pesan respons dari server
        } catch (error) {
            console.error("Error sending data:", error);
            if (axios.isAxiosError(error)) {
                setMessage(
                    `Gagal mengirim data: ${
                        error.response?.data?.message || error.message
                    }`
                );
            } else {
                setMessage("Gagal mengirim data");
            }
        } finally {
            setLoading(false); // Menghentikan indikator loading
        }
    };

    return (
        <div>
            <Button onClick={handleSendData} disabled={loading}>
                {loading ? "Mengirim..." : "Kirim Data"}
            </Button>
            {message && <p>{message}</p>} {/* Menampilkan pesan respons */}
        </div>
    );
};

export default SendDataButton;
