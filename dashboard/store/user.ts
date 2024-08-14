import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserInterface {
    userId: string;
    name: string;
    email: string;
    createdAt: Date
}

interface UserState {
    accessToken: string | null;
    user: UserInterface | null,
    
    setAccessToken: (token: string) => void;
    setUser: (userData: UserInterface) => void;
    logout: () => void;

    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            accessToken: null,
            user: null,

            setAccessToken: (token) => set((state) => ({ accessToken: token })),
            setUser: (userData) => set((state) => ({ user: userData })),
            logout: () => set((state) => ({ accessToken: null, user: null })),

            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                  _hasHydrated: state
                });
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        }
    )
)