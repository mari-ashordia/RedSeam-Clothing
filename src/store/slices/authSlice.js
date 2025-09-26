export const createAuthSlice = (set, get) => ({
    token: "",
    user: {},
    
    setToken: (token) => set({token: token}),
    setUser: (user) => set({user: user}),
    clearUser: () => set({token: null, user: {}})
})