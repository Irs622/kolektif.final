import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/useAuth";
import LandingPage from "./components/LandingPage";
import DaftarBarang from "./components/DaftarBarang";
import FormPengajuan from "./components/FormPengajuan";
import DetailBarang from "./components/DetailBarang";
import KonfirmasiTransaksi from "./components/KonfirmasiTransaksi";
import ReputasiBiner from "./components/ReputasiBiner";
import ProfilPengguna from "./components/ProfilPengguna";
import SOP from "./components/SOP";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Menyumbangkan from "./components/Menyumbangkan";
import RiwayatDonasi from "./components/RiwayatDonasi";
import LoginPengguna from "./components/LoginPengguna";
import RegistrasiPengguna from "./components/RegistrasiPengguna";
import WelcomePengguna from "./components/WelcomePengguna";



function AppContent() {
    // Menggunakan hook useAuth untuk mendapatkan status loading
    const { loading } = useAuth();
    
    // Tampilkan layar loading global saat status otentikasi belum jelas
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl text-blue-600">Memuat Aplikasi...</p>
            </div>
        );
    }

    // Setelah loading selesai, render Routes
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/daftar-barang" element={<DaftarBarang />} />
      <Route path="/detail-barang/:id" element={<DetailBarang />} />
      <Route path="/login" element={<LoginPengguna />} />
      <Route path="/registrasi" element={<RegistrasiPengguna />} />
      <Route path="/sop" element={<SOP />} />

      <Route path="/form-pengajuan" element={<ProtectedRoute><FormPengajuan /></ProtectedRoute>} />
      <Route path="/konfirmasi-transaksi" element={<ProtectedRoute><KonfirmasiTransaksi /></ProtectedRoute>} />
      <Route path="/reputasi-biner" element={<ProtectedRoute><ReputasiBiner /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><WelcomePengguna /></ProtectedRoute>} />
      <Route path="/profil" element={<ProtectedRoute><ProfilPengguna /></ProtectedRoute>} />
      <Route path="/menyumbangkan" element={<ProtectedRoute><Menyumbangkan /></ProtectedRoute>} />
      <Route path="/riwayat-donasi" element={<ProtectedRoute><RiwayatDonasi /></ProtectedRoute>} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider> 
      <AppContent /> {/* AppContent harus berada di dalam AuthProvider agar bisa menggunakan useAuth */}
    </AuthProvider>
  );
}

export default App;
