import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export const mealImg = createSlice({
	name: "image",
	initialState: [{ orderMealImage: "", id: 1 }],
	reducers: {
		addImage: (state, action: PayloadAction<{ id: string; image: string }>) => {
			state.push(action.payload)
		},
		removeImageById: (state, action) => {
			return (state = state.filter((el) => el.id !== action.payload.id))
		},
	},
})

export const { addImage, removeImageById } = mealImg.actions
export default mealImg.reducer
