import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface SumUp {
	value: number
}
const initialState: SumUp = {
	value: 0,
}
// [{ orderMealText: "", id: 1, price: "", image: "" }]
// -> suma
export const sumUp = createSlice({
	// ważne name poniżej musi być  zgodne z nazwą slice powyżej czyli sumUp
	name: "sumUp",
	initialState,
	reducers: {
		toCart: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		},
		outOfCart: (state, action: PayloadAction<number>) => {
			state.value -= action.payload
		},
	},
})

export const { toCart, outOfCart } = sumUp.actions
export default sumUp.reducer
