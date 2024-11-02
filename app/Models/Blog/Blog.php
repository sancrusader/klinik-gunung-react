<?php

namespace App\Models\Blog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    // Tentukan kolom yang dapat diisi massal
    protected $fillable = [
        'title',
        'content',
        'image_path',
    ];

    // Jika Anda ingin menangani upload gambar di sini, Anda bisa membuat method untuk menguploadnya
    public function uploadImage($image)
    {
        // Menyimpan file gambar ke dalam folder 'public/storage/blogs'
        $path = $image->store('blogs', 'public');

        // Mengembalikan path untuk disimpan di database
        return $path;
    }
}
