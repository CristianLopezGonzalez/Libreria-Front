import { create } from "zustand";
import { getErrorMessage } from "../lib/api.utils";
import { createJSONStorage, persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL;


interface User {
    id: string;
    email: string;
    nick?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    getAuthHeaders: () => Record<string, string>;
}

type AuthStore = AuthState & AuthActions;



export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch(`${API_URL}/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!response.ok) {
                        throw new Error(await getErrorMessage(response));
                    }

                    const data: { user: User; token: string } = await response.json();
                    set({ user: data.user, token: data.token, isLoading: false });

                } catch (error: any) {
                    const message = error instanceof Error ? error.message : "An unknown error occurred";
                    set({ error: message });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }

            },


            logout: () => {
                set({ user: null, token: null, error: null });
            },

            clearError: () => {
                set({ error: null });
            },

            getAuthHeaders: (): Record<string, string> => {
                const { token } = get();
                return token ? { Authorization: `Bearer ${token}` } : {};
            },
        }),
        {
            name: "auth-storage",              // localStorage key
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({          // only persist these fields
                user: state.user,
                token: state.token,
            }),
        }
    )
);