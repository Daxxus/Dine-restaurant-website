import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export const order = createSlice({
	name: "order",
	initialState: [{ orderMealText: "", id: 1 }],
	reducers: {
		addOrder: (
			state,
			action: PayloadAction<{ id: string; title: string; quantity: number }>
		) => {
			state.push(action.payload)
		},
		remOrderById: (state, action) => {
			return (state = state.filter((el) => el.id !== action.payload.id))
		},
	},
})

export const { addOrder, remOrderById } = order.actions
export default order.reducer
