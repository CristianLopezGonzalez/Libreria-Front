import {create} from 'zustand';

interface UserData{
    id: string;
    nick: string;
    email: string;
}

export const useAuthStore = create((set) => ({

    user: null,
    token: null,

    setUser: (userData: UserData) => set({ user: userData }),
    logout: () => set({ user: null, token: null })

}))