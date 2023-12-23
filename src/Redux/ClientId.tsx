import { createSlice } from "@reduxjs/toolkit"
// import type { PayloadAction } from "@reduxjs/toolkit"

interface IdProps {
	id: number
}
const initialState: IdProps = {
	id: 0,
}

export const clientId = createSlice({
	name: "clientId",
	initialState,
	reducers: {
		addId: (state) => {
			state.id += 1
		},
	},
})

export const { addId } = clientId.actions
export default clientId.reducer
