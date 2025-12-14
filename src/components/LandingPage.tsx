import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button } from './ui/button';
import { ArrowRight, Users, TrendingUp, Shield } from 'lucide-react';

export default function LandingPage() {
  // Panggil hooks yang dibutuhkan
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // --------------------------------------------------------
    // LOGIKA PENGALIHAN (REDIRECT)
    // --------------------------------------------------------
    if (!loading && user) {
        // Jika loading sudah selesai (false) dan user sudah terdeteksi (sudah login)
        // Lakukan pengalihan ke dashboard
        navigate('/dashboard'); 
        return null; // Penting: Jangan render konten apa pun saat sedang mengalihkan
    }
    
    // Jika masih loading, atau jika user tidak ada (belum login), lanjutkan render
    if (loading) {
        // Tampilkan loading state jika perlu, atau tunggu saja (return null)
        return <div className="text-center mt-10">Memuat status pengguna...</div>;
    }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm mb-6">
              Platform Komunitas Mahasiswa
            </div>
            <h1 className="text-slate-900 mb-6">
              Platform Kolektif Mahasiswa FST
            </h1>
            <p className="text-slate-600 text-xl mb-8">
              Berbagi dan donasi sumber daya akademik dengan mahasiswa lain. 
              Bangun komunitas yang saling mendukung.
            </p>
            <div className="flex gap-4">
              <Link to="/daftar-barang">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Lihat Barang
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Masuk
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-green-400 rounded-3xl h-96 flex items-center justify-center shadow-xl">
              <div className="text-center text-white">
                <Users className="w-24 h-24 mx-auto mb-4 opacity-80" />
                <p className="text-xl">Komunitas Berbagi</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-900">100+ Barang</p>
                  <p className="text-slate-600 text-sm">Telah Dibagikan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-4">Kenapa KOLEKTIF?</h2>
          <p className="text-slate-600 text-lg">
            Platform yang dirancang khusus untuk kebutuhan mahasiswa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-slate-900 mb-3">Berbasis Komunitas</h3>
            <p className="text-slate-600">
              Dikelola oleh dan untuk mahasiswa dengan sistem kepercayaan komunitas.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-slate-900 mb-3">Sistem Reputasi</h3>
            <p className="text-slate-600">
              Bangun reputasi dengan memenuhi komitmen dan berkontribusi aktif.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-slate-900 mb-3">Aman & Terpercaya</h3>
            <p className="text-slate-600">
              Dengan SOP dan etika digital yang jelas untuk keamanan semua pihak.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-white mb-4">Mulai Berbagi Sekarang</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Bergabung dengan komunitas mahasiswa yang saling mendukung dan berbagi sumber daya akademik.
          </p>
          <Link to="/daftar-barang">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Jelajahi Barang
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
