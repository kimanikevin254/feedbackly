import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
    accessToken: string | null;
    
    setAccessToken: (token: string) => void;
    logout: () => void;

    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            accessToken: null,

            setAccessToken: (token) => set((state) => ({ accessToken: token })),
            logout: () => set((state) => ({ accessToken: null })),

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