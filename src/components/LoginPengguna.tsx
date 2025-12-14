import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Catatan: Menggunakan 'Link' dari react-router-dom untuk navigasi "Daftar di sini"

const LoginPengguna = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Email dan password harus diisi.');
            return;
        }

        // --- Logika Autentikasi Dummy (Ganti dengan API Anda) ---
        try {
            const isLoginSuccessful = true; // Anggap berhasil
            
            if (isLoginSuccessful) {
                alert('Login Berhasil! Mengarahkan ke Beranda.');
                navigate('/'); 
            } else {
                setError('Email atau password salah. Coba lagi.');
            }
            
        } catch (err) {
            setError('Terjadi masalah saat mencoba login.');
        }
    };

    return (
        // Style untuk menempatkan form di tengah halaman
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.header}>Masuk ke Kolektif</h2>
                {error && <p style={styles.errorText}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                            placeholder="Masukkan email Anda"
                        />
                    </div>
                    
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                            placeholder="Masukkan password Anda"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        style={styles.submitButton}
                    >
                        Masuk
                    </button>
                </form>

                <p style={styles.registerLinkContainer}>
                    Belum punya akun? 
                    <Link to="/registrasi" style={styles.link}>
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

// Objek untuk menyimpan semua style
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa', // Latar belakang abu-abu muda
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Box shadow elegan
        width: '100%',
        maxWidth: '380px',
        textAlign: 'left',
    },
    header: {
        fontSize: '24px',
        marginBottom: '30px',
        color: '#333',
        textAlign: 'center',
        fontWeight: '600',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#555',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        boxSizing: 'border-box',
        fontSize: '16px',
        transition: 'border-color 0.3s',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff', // Warna biru primer yang terang
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    },
    registerLinkContainer: {
        marginTop: '25px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#6c757d',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        marginLeft: '5px',
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '15px',
    }
};

export default LoginPengguna;