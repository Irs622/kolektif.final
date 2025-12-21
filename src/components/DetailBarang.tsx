import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/useAuth";
import { ArrowLeft } from "lucide-react";

type Barang = {
  id: string;
  title: string;
  description: string | null;
  status: "available" | "taken";
  taken_by: string | null;
};

function parseDescription(desc: string) {
  const imageMatch = desc.match(/\[IMAGE\](.*?)\[\/IMAGE\]/);
  const image = imageMatch ? imageMatch[1] : null;
  const text = desc.replace(/\[IMAGE\].*?\[\/IMAGE\]/, "").trim();
  return { text, image };
}

export default function DetailBarang() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [barang, setBarang] = useState<Barang | null>(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (!id) return;
    loadBarang();
  }, [id]);

  async function loadBarang() {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      setBarang(null);
    } else {
      setBarang(data as Barang);
    }

    setLoading(false);
  }

  async function handleAmbilBarang() {
    if (!barang) return;

    if (!user) {
      alert("Silakan login untuk mengambil donasi.");
      navigate("/login");
      return;
    }

    setRequesting(true);

    const { error } = await supabase
      .from("posts")
      .update({
        status: "taken",
        taken_by: user.id,
      })
      .eq("id", barang.id)
      .eq("status", "available"); // 🔒 anti double ambil

    if (error) {
      alert("Barang sudah diambil orang lain.");
      setRequesting(false);
      return;
    }

    // 🔥 UPDATE STATE → UI LANGSUNG BERUBAH
    setBarang({
      ...barang,
      status: "taken",
      taken_by: user.id,
    });

    setRequesting(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Memuat data...</p>
      </div>
    );
  }

  if (!barang) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p>Barang tidak ditemukan.</p>
          <Link to="/daftar-barang">
            <Button>Kembali</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const sudahDiambil = barang.status === "taken";
  const diambilOlehUser = barang.taken_by === user?.id;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <Link to="/daftar-barang">
          <Button variant="ghost" className="px-0 gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Button>
        </Link>

        <div className="bg-white rounded-xl p-6 space-y-4">
          <h1 className="text-2xl font-semibold">{barang.title}</h1>

          {barang.description && (() => {
            const { text, image } = parseDescription(barang.description);
            return (
              <>
                {text && <p>{text}</p>}
                {image && <img src={image} className="rounded-lg" />}
              </>
            );
          })()}

          {sudahDiambil ? (
            diambilOlehUser ? (
              <Button disabled className="w-full bg-green-100 text-green-700">
                Anda berhasil mengambil donasi
              </Button>
            ) : (
              <Button disabled className="w-full">
                Donasi sudah diambil
              </Button>
            )
          ) : (
            <Button
              onClick={handleAmbilBarang}
              disabled={requesting}
              className="w-full bg-green-600"
            >
              {requesting ? "Memproses..." : "Ambil Donasi"}
            </Button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
