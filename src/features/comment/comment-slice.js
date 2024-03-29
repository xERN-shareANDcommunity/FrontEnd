import { createSlice } from "@reduxjs/toolkit";

import { getComments } from "./comment-service";

const initialState = {
	comments: [],
};

const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getComments.fulfilled, (state, { payload }) => {
			state.comments = payload;
		});
	},
});

export default commentSlice.reducer;
