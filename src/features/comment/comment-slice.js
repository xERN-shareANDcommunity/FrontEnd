import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";

import { getComments, deleteComment, putComment } from "./comment-service";

const initialState = {
	comments: [],
};

const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getComments.fulfilled, (state, { payload }) => {
				state.comments = payload.comment;
			})
			.addCase(deleteComment.fulfilled, (state, { meta: { arg } }) => {
				state.comments = state.comments.filter(
					(prev) => prev.commentId !== arg.commentId,
				);
				toast.success("댓글이 삭제되었습니다.");
			})
			.addCase(putComment.fulfilled, (state, { payload }) => {
				console.log(payload);
				toast.success("댓글이 수정되었습니다.");
			});
	},
});

export default commentSlice.reducer;
