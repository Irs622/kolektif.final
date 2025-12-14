// src/contexts/useAuth.ts
import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js'; 

// --- Definisi Tipe Data ---
interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

// Definisikan Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook untuk kemudahan penggunaan AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};