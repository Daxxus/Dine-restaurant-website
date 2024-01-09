// import { createSlice } from "@reduxjs/toolkit"
// import type { PayloadAction } from "@reduxjs/toolkit"

// export const mealImg = createSlice({
// 	name: "mealImg",
// 	initialState: [{ orderMealImage: "", id: 1 }],
// 	reducers: {
// 		addImage: (state, action: PayloadAction<{ image: string; id: string }>) => {
// 			return (state = [
// 				...state,
// 				{ orderMealImage: action.payload, id: state.length },
// 			])
// 			// state.push(action.payload)
// 		},
// 		removeImageById: (state, action) => {
// 			return (state = state.filter((el) => el.id !== action.payload.id))
// 		},
// 	},
// })

// export const { addImage, removeImageById } = mealImg.actions
// export default mealImg.reducer
