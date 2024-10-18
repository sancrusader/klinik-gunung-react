# Klinik Gunung

```
php artisan serve
```
```
php artisan queue:work
```


## Fitur Utama

1. **Penambahan Pembelian Produk pada Kasir**
   Memungkinkan kasir untuk menambahkan item pembelian produk dengan mudah dalam sistem.

2. **Cek Kesehatan oleh Dokter untuk Pasien dengan Penyakit**
   Jika pasien terdiagnosis dengan penyakit tertentu, pemeriksaan kesehatan akan dilakukan oleh dokter untuk memastikan perawatan yang tepat.

3. **Kasir Menambahkan Pembayaran untuk Pembelian Produk**
   Memfasilitasi kasir dalam menambahkan dan mengelola pembayaran untuk produk yang dibeli pasien.

4. **Toggling Password pada Form Login/Register**
   Menyediakan opsi untuk menampilkan atau menyembunyikan password di form login dan registrasi, meningkatkan kemudahan penggunaan.

---

# Print Sertifikat

## Status Printer

### Linux atau macOS

#### Terminal

```bash
lpstat -p
```

### Windows

#### Command Prompt

```bash
wmic printer get name,status
```

#### PowerShell

```
Get-Printer | Select-Object Name, PrinterStatus
```

# Implementasi Cetak di Controller

```
exec("lpr -P EPSON_L850_Series_2 $filePath");
```
