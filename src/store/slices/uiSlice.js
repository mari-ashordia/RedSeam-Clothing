
export const createUiSlice = (set, get) => ({
    isCartOpen: false,
    isSortOpen: false,
    isFilterOpen: false,
    isCongratsOpen: false,

    toggleCart: () => set(state => ({isCartOpen: !state.isCartOpen})),
    closeCart: () => {
        document.body.classList.remove("overflow-hidden");
        set({isCartOpen: false});
    },
    openCart: () => {
        document.body.classList.add("overflow-hidden");
        set({isCartOpen: true});
    },
    toggleSort: () => set(state => ({isSortOpen: !state.isSortOpen})),
    closeSort: () => set({isSortOpen: false}),
    toggleFilter: () => set(state => ({isFilterOpen: !state.isFilterOpen})),
    closeFilter: () => set({isFilterOpen: false}),
    openCongrats: () => set({isCongratsOpen: true}),
    closeCongrats: () => set({isCongratsOpen: false})
})