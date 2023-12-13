import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import billValue from "./SumUp"
import orderReducer from "./Cart"

const reducer = combineReducers({
	cart: billValue,
	order: orderReducer,
})
export const Store = configureStore({ reducer })
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
