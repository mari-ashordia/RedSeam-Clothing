import { axiosInstance } from "../../utils/helperFunctions/axiosInstance"

export const createCartSlice = (set, get) => ({
    cart: [],

    addToCart: async (productId, productDetails) => {
        const token = get().token;
        try {
            await axiosInstance.post(`/cart/products/${productId}`, productDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            get().fetchCart();
        }
        catch(err) {
            console.log(err.message);
        }
    },
    fetchCart: async () => {
        const token = get().token;
        try {
            const {data} = await axiosInstance.get('/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            set({cart: data})
        }
        catch(err) {
            console.log(err.message);
        }
    },
    removeFromCart: async (productId) => {
        const token = get().token;
        try {
            await axiosInstance.delete(`/cart/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            get().fetchCart();
        }
        catch(err) {
            console.log(err.message);
        }
    },
    updateProductQuantity: async (productId, quantity) => {
        const token = get().token;
        try {
            await axiosInstance.patch(`/cart/products/${productId}`, quantity, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        get().fetchCart();
        }
        catch(err) {
            console.log(err.message);
        }
    },
    clearCart: async () => {
        const token = get().token;
        const cartIds = get().cart.map(item => item.id);
        set({cart: []});
        try {
            for(const id of cartIds) {
                await axiosInstance.delete(`/cart/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            }
        }
        catch(err) {
            console.log(err.message);
        }
    }
})