// import { createSlice } from "@reduxjs/toolkit"
// import type { PayloadAction } from "@reduxjs/toolkit"

// export const cart = createSlice({
// 	name: "cart",
// 	initialState: [{ mealText: "", id: 1, price: 0, image: "" }],
// 	reducers: {
// 		addOrder: (
// 			state,
// 			action: PayloadAction<{
// 				id: string
// 				mealText: string
// 				price: any
// 				image: string
// 			}>
// 		) => {
// 			return (state = [
// 				...state,
// 				{
// 					mealText: action.payload,
// 					id: state.length,
// 					// price: state.find(price),
// 					// price: () => {
// 					// 	const item = state.cart.find((item) => item.id === action.payload)
// 					// 	item.quantity++
// 					// },
// 					image: action.payload,
// 				},
// 			])
// 			// state.push(action.payload)
// 		},
// 		remOrderById: (state, action) => {
// 			state = state.filter((el) => el.id !== action.payload.id)
// 			//  state.price -= action.payload
// 		},
// 	},
// })

// export const { addOrder, remOrderById } = cart.actions
// export default cart.reducer
