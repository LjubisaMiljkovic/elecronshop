import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalPrice: 0,
        totalProducts: 0,
    },
    reducers: {
        saveProductHandler: (state, action) => {
            console.log(action);

            let copyArray = [...state.cart]

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
                state.totalProducts++;
                state.totalPrice += action.payload.price;
            } else {
                copyArray[findIndex].count++;
            }
            state.cart = copyArray;
        },
        setPriceHandler: (state, action) => {
            const { increment, index } = action.payload;
            let copyArray = [...state.cart];

            copyArray[index].cartTotal += copyArray[index].price * increment;

            //totalPrice
            state.totalPrice = subTotal(copyArray)


            // ovde hendlujem minus

            if (copyArray[index].count === 1 && increment === -1) {
                copyArray.splice(index, 1);
                state.totalProducts--;
            } else {
                copyArray[index].count += increment;
            }



            state.cart = copyArray;

        }
    }
})
// reduce metodom prolazimo kroz array(koji je sacinjen iz objekata) i sabiramo i izracunavamo state.totlPrice
function subTotal(arrayCart) {
    return arrayCart.reduce((acc, current) => {
        return acc + current.cartTotal;
    }, 0)
}

export const { saveProductHandler, setPriceHandler } = cartSlice.actions;
export default cartSlice.reducer;