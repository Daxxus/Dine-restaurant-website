import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export const mealImg = createSlice({
	name: "image",
	initialState: [{ orderMealImage: "", id: 1 }],
	reducers: {
		addImage: (state, action: PayloadAction<{ image: string }>) => {
			return state=[...state, {orderMealImage: action.payload, id: state.lenght}];
		},
		removeImageById: (state, action) => {
			return (state = state.filter((el) => el.id !== action.payload.id))
		},
	},
})

export const { addImage, removeImageById } = mealImg.actions
export default mealImg.reducer
