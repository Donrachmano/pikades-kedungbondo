# Election Dashboard - Pemilihan Kepala Desa Kedungbondo

Website modern untuk perhitungan real-time Pemilihan Kepala Desa Kedungbondo, Kecamatan Balen, Kabupaten Bojonegoro.

## Fitur Utama

- ✅ **Real-time Data Updates** - Otomatis update setiap 10 detik
- 🚀 **Roket Racing Visualization** - Animasi roket terbang sesuai perolehan suara
- 📊 **Progress Bar Animasi** - Visualisasi perbandingan suara yang menarik
- 🇮🇩 **Tema Indonesia** - Desain patriotik dengan warna merah-putih-biru
- 📱 **Responsive Design** - Support desktop dan mobile
- 🎨 **Modern UI/UX** - Interface clean dan profesional

## Struktur File

```
election-dashboard/
├── index.html          # File HTML utama
├── styles.css          # Stylesheet dengan design system
├── main.js            # JavaScript aplikasi utama
├── assets/
│   ├── candidate-1.jpg # Foto calon 1 (Ahmad Susanto)
│   └── candidate-2.jpg # Foto calon 2 (Budi Prasetyo)
└── README.md          # Dokumentasi
```

## Cara Menjalankan

1. **Download semua file** ke dalam satu folder
2. **Buka `index.html`** di web browser
3. **Website langsung berjalan** dengan data simulasi

## Data Pemilihan

- **Ahmad Susanto**: 2.969 suara (65%)
- **Budi Prasetyo**: 1.370 suara (30%)  
- **Suara Tidak Sah**: 229 suara (5%)
- **Total Pemilih**: 4.568 orang

## Integrasi Google Sheets (Opsional)

Untuk menggunakan data real dari Google Spreadsheet:

1. **Buat Google Spreadsheet** dengan format:
   ```
   | Nama Calon    | Jumlah Suara |
   |---------------|--------------|
   | Ahmad Susanto | 2969         |
   | Budi Prasetyo | 1370         |
   ```

2. **Setup Google Sheets API**:
   - Buka [Google Cloud Console](https://console.cloud.google.com/)
   - Aktifkan Google Sheets API
   - Buat API Key
   - Share spreadsheet ke public atau service account

3. **Modifikasi `main.js`**:
   ```javascript
   // Ganti bagian ini dengan konfigurasi Google Sheets
   const sheetsAPI = new GoogleSheetsAPI(
     'YOUR_API_KEY',
     'YOUR_SPREADSHEET_ID', 
     'Sheet1!A1:B10'
   );
   ```

## Customization

### Mengubah Data Kandidat
Edit bagian ini di `main.js`:
```javascript
candidates: [
  { 
    id: 1, 
    name: "Nama Calon 1", 
    votes: 2969,
    image: "assets/candidate-1.jpg"
  },
  // ... tambah calon lainnya
]
```

### Mengubah Warna Tema
Edit CSS variables di `styles.css`:
```css
:root {
  --election-red: 0 85% 55%;
  --election-blue: 210 100% 45%;
  /* ... warna lainnya */
}
```

### Mengubah Interval Update
Edit di `main.js`:
```javascript
setInterval(() => {
  // Update data
}, 10000); // 10 detik (10000ms)
```

## Animasi dan Efek

- **Roket Racing**: Roket terbang sesuai persentase suara
- **Progress Bar**: Animasi shimmer dan transisi smooth
- **Loading Screen**: Animasi loading dengan dots pulse
- **Hover Effects**: Card hover dengan transform dan shadow
- **Count Up**: Animasi counter naik bertahap

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Performance

- Lightweight: ~50KB total size
- No external dependencies
- Optimized CSS animations
- Efficient DOM updates

## Troubleshooting

### Gambar kandidat tidak muncul
- Pastikan file `assets/candidate-1.jpg` dan `candidate-2.jpg` ada
- Ganti dengan foto kandidat asli atau gunakan placeholder

### Data tidak update otomatis
- Periksa koneksi internet
- Cek console browser untuk error
- Pastikan Google Sheets API setup benar (jika digunakan)

### Animasi tidak smooth
- Pastikan browser support CSS transitions
- Reduce motion jika ada preferensi accessibility

## Credits

- **Font**: Inter dari Google Fonts
- **Icons**: Unicode Emoji
- **Design**: Indonesia patriotic theme
- **Animations**: Pure CSS dengan cubic-bezier timing

## License

Free to use untuk keperluan pemilihan desa dan pendidikan.

---

**Dibuat untuk transparansi dan modernisasi pemilihan kepala desa di Indonesia** 🇮🇩