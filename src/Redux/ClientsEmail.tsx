import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export const emailSlice = createSlice({
	name: "email",
	initialState: { clientEmail: "" },
	reducers: {
		addEmail: (state, action: PayloadAction<string>) => {
			state.clientEmail = action.payload
		},
	},
})
export const { addEmail } = emailSlice.actions
export default emailSlice.reducer
