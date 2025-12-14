import { Link } from "react-router-dom";
import { User, FileText, Search, Plus } from "lucide-react"; // Menambahkan icon baru
import { Button } from './ui/button'; // Anda menggunakannya di LandingPage, jadi saya asumsikan ada.

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        {/* Kiri: logo KOLEKTIF */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">K</span>
          </div>
          <span className="text-sm font-semibold tracking-wide text-slate-800">
            KOLEKTIF
          </span>
        </Link>

        {/* Tengah: Menu Utama */}
        <div className="flex items-center gap-6 text-sm text-slate-700">
          
          {/* Menu Jelajahi (Opsional, berdasarkan screenshot: Q Jelajahi) */}
          <Link to="/daftar-barang" className="flex items-center gap-1 hover:text-slate-900">
            <Search className="w-4 h-4" />
            <span>Jelajahi</span>
          </Link>

          {/* Menu Beri Donasi */}
          <Link to="/menyumbangkan" className="flex items-center gap-1 hover:text-slate-900">
            <Plus className="w-4 h-4" />
            <span>Beri Donasi</span>
          </Link>

          {/* Menu SOP */}
          <Link to="/sop" className="flex items-center gap-1 hover:text-slate-900">
            <FileText className="w-4 h-4" />
            <span>SOP</span>
          </Link>
          
          {/* Menu Profil (Jika user sudah login, Anda bisa menggunakan ini) */}
          {/* <Link to="/profil" className="flex items-center gap-1 hover:text-slate-900">
            <User className="w-4 h-4" />
            <span>Profil</span>
          </Link> */}
        </div>
        
        {/* Kanan: Tombol Autentikasi (Belum Punya Akun) */}
        <div className="flex items-center gap-4">
            {/* CATATAN: 
                Secara default, saya asumsikan pengguna belum login, 
                maka tombol yang muncul adalah "Belum Punya Akun?". 
                Jika Anda ingin tombol "Masuk" dan "Profil", 
                logika ini harus menggunakan state autentikasi.
            */}
            
            <Link to="/registrasi"> 
                {/* Ini adalah tombol yang Anda cari! */}
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
                    <User className="w-4 h-4 mr-1" />
                    Belum Punya Akun?
                </Button>
            </Link>
        </div>
      </div>
    </nav>
  );
}