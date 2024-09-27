import React from "react";

interface Screening {
    certificate_path?: string;
    certificate_url?: string;
}

export default function CertificateLink({
    screening,
}: {
    screening: Screening;
}) {
    return (
        <>
            {screening.certificate_path ? (
                <a
                    href={screening.certificate_url ?? "#"}
                    rel="noopener noreferrer"
                    className="text-blue-600"
                >
                    Lihat Sertifikat
                </a>
            ) : (
                <span className="text-gray-500">Tidak Ada Sertifikat</span>
            )}
        </>
    );
}
