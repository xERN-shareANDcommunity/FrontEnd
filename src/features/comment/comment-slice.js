import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";

import {
	getComments,
	deleteComment,
	putComment,
	postComment,
} from "./comment-service";

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
			.addCase(postComment.fulfilled, (state, { payload }) => {
				state.comments.push(payload);
			})
			.addCase(deleteComment.fulfilled, (state, { meta: { arg } }) => {
				state.comments = state.comments.filter(
					(prev) => prev.commentId !== arg.commentId,
				);
				toast.success("댓글이 삭제되었습니다.");
			})
			.addCase(putComment.fulfilled, (state, { payload }) => {
				state.comments[
					state.comments.findIndex((el) => el.commentId === payload.commentId)
				].content = payload.content;
				toast.success("댓글이 수정되었습니다.");
			});
	},
});

export default commentSlice.reducer;
