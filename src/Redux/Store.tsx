import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import billReducer from "./SumUp"
// import orderReducer from "./Cart"
// import imageReducer from "./MealImage"
import idReducer from "./ClientId"
import emailReducer from "./ClientsEmail"

const reducer = combineReducers({
	
	sumUp: billReducer,
	// cart: orderReducer,
	// mealImg: imageReducer,
	clientId: idReducer,
	emailSlice: emailReducer,
})
export const Store = configureStore({ reducer })
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
