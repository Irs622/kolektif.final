import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { Button } from './ui/button'; // Menggunakan komponen Button yang konsisten

export default function WelcomePengguna() {
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();

    // 1. Tampilkan loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl text-blue-600">Memuat data pengguna...</p>
            </div>
        );
    }

    // 2. Jika pengguna TIDAK ada (belum login), arahkan ke halaman login
    if (!user) {
        // Ini adalah guard-rail sederhana. Anda bisa menggantinya dengan komponen 'Redirect to Login'
        navigate('/login');
        return null; 
    }

    // Ambil nama pengguna dari metadata (yang kita simpan saat registrasi)
    const displayName = user.user_metadata?.full_name || user.email;

    const handleLogout = async () => {
        await signOut();
        // Redirect dilakukan secara otomatis oleh onAuthStateChange di AuthProvider
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
            
            <div className="max-w-4xl mx-auto px-6 bg-white shadow-xl rounded-3xl p-10 mt-10">
                
                {/* Header Welcome */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
                        Selamat Datang, {displayName}!
                    </h1>
                    <p className="text-xl text-slate-600">
                        Anda telah berhasil masuk ke Platform Kolektif Mahasiswa FST.
                    </p>
                </div>

                {/* Ringkasan Aksi Cepat */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    
                    {/* Kartu 1: Lihat Barang */}
                    <div className="p-6 bg-blue-50 rounded-xl hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-blue-700 mb-3">Jelajahi Sumber Daya</h3>
                        <p className="text-slate-600 mb-4 text-sm">Temukan materi akademik yang tersedia untuk dibagikan.</p>
                        <Link to="/daftar-barang">
                            <Button className="bg-blue-600 hover:bg-blue-700 w-full">Lihat Barang</Button>
                        </Link>
                    </div>

                    {/* Kartu 2: Sumbang Barang */}
                    <div className="p-6 bg-green-50 rounded-xl hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-green-700 mb-3">Beri Donasi</h3>
                        <p className="text-slate-600 mb-4 text-sm">Donasikan sumber daya akademik yang sudah tidak Anda gunakan.</p>
                        <Link to="/menyumbangkan">
                            <Button className="bg-green-600 hover:bg-green-700 w-full">Mulai Sumbang</Button>
                        </Link>
                    </div>

                    {/* Kartu 3: Profil */}
                    <div className="p-6 bg-purple-50 rounded-xl hover:shadow-md transition">
                        <h3 className="text-lg font-semibold text-purple-700 mb-3">Kelola Akun</h3>
                        <p className="text-slate-600 mb-4 text-sm">Lihat riwayat donasi dan kelola informasi reputasi Anda.</p>
                        <Link to="/profil">
                            <Button className="bg-purple-600 hover:bg-purple-700 w-full">Lihat Profil</Button>
                        </Link>
                    </div>

                </div>

                {/* Tombol Logout */}
                <div className="mt-12 text-center">
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                        Keluar dari Akun
                    </Button>
                </div>
                
            </div>
        </div>
    );
}