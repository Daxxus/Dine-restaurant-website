import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface SumUp {
	value: number
}
const initialState: SumUp = {
	value: 0,
}

export const sumUp = createSlice({
	name: "cart",
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
