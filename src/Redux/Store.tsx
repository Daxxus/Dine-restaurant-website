import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import billReducer from "./SumUp"
import orderReducer from "./Cart"
import imageReducer from "./MealImage"

const reducer = combineReducers({
	cart: billReducer,
	order: orderReducer,
	image: imageReducer,
})
export const Store = configureStore({ reducer })
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
