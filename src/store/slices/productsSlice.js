import { axiosInstance } from "../../utils/helperFunctions/axiosInstance"

export const createProductsSlice = (set, get) => ({
    products: [],
    loading: false,
    selectedProduct: {},
    productMetaData: {},
    page: 1,
    sort: "",
    "filter[price_from]": null,
    "filter[price_to]": null,


    fetchProducts: async (filters = {}) => {
        const page = get().page;
        const sort = get().sort;
        const priceFrom = get()["filter[price_from]"];
        const priceTo = get()["filter[price_to]"];

        try {
            set({loading: true});
            const {data} = await axiosInstance.get("/products", {
                params: {   
                    page, 
                    sort, 
                    "filter[price_from]": priceFrom, 
                    "filter[price_to]": priceTo,
                    ...filters
                }
            });
            set({products: data.data, loading: false});
            set({productMetaData: {...data.meta}});
        }
        catch(err) {
            set({loading: false})
            console.log(err.message);
        }
    },
    fetchSelectedProduct: async (id) => {
        try {
            const {data} = await axiosInstance.get(`/products/${id}`);
            set({selectedProduct: data});
        }
        catch(err) {
            console.log(err.message);
        }
    },
    setPage: (page) => set({page}),
    setSort: (option) => set({sort: option}),
    setPriceFrom: (priceFrom) => set({"filter[price_from]": priceFrom}),
    setPriceTo: (priceTo) => set({"filter[price_to]": priceTo}),
})