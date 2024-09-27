import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

interface Screening {
    id: number;
    full_name: string;
    email: string; // Jika data ini tersedia, jika tidak, bisa dihilangkan
    profile_picture: string; // Jika ada gambar profil, gunakan ini
    created_at: string; // Waktu screening dibuat
}

interface PageProps {
    latestScreenings: Screening[];
}

export function LatestScreenings(props: PageProps) {
    const { latestScreenings } = props;
    return (
        <div className="space-y-8">
            {latestScreenings.map((screening) => (
                <div key={screening.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        {/* Gunakan profile_picture jika tersedia, fallback ke inisial */}
                        {screening.profile_picture ? (
                            <AvatarImage
                                src={screening.profile_picture}
                                alt={screening.full_name}
                            />
                        ) : (
                            <AvatarFallback>
                                {screening.full_name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {screening.full_name}
                        </p>
                        {/* Jika email tersedia */}
                        {screening.email && (
                            <p className="text-sm text-muted-foreground">
                                {screening.email}
                            </p>
                        )}
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                        {/* Format created_at sebagai waktu yang lebih mudah dibaca */}
                        {new Date(screening.created_at).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
}
