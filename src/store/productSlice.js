import { createSlice } from "@reduxjs/toolkit";




const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        category: ['smartphones'],
        currentCategory: [],
        search: '',
        productSearches: []
    },
    reducers: {
        categoryHandler: (state, action) => {

            state.category = action.payload
        },

        productsHandler: (state, action) => {
            state.products = action.payload;
        },
        currentCategoryHandler: (state, action) => {
            state.currentCategory = action.payload
        },
        searchHandler: (state, action) => {
            state.search = action.payload
        },
        searchProductsHandler: (state, action) => {
            let copyArray = [...state.productSearches]

            let findIndex = null;
            copyArray.findIndex((el, index) => {
                if (el.id === action.payload.id) {
                    findIndex = index;
                    return;
                }
            })
            if (findIndex === null) {
                // dodajem moj proizvod
                copyArray.push({
                    ...action.payload,
                    count: 1,
                    cartTotal: action.payload.price
                })
              
            } else {
                copyArray[findIndex].count++;
            }

            state.productSearches = copyArray;
        },
        deleteSearchProduct: (state, action) => {
        state.productSearches=[];
        }
}})

export const { categoryHandler, productsHandler, currentCategoryHandler,searchProductsHandler, searchHandler, deleteSearchProduct} = productSlice.actions;
export default productSlice.reducer;