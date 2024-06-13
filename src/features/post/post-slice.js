import { toast } from "react-toastify";

import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
	getGroupAllPosts,
	getGroupPostInfo,
	getMyGroupPosts,
	likeGroupPost,
	cancelLikeGroupPost,
	deleteGroupPost,
} from "./post-service";

const initialState = {
	postInfo: null,
	allGroupPosts: [],
	myGroupPosts: [],
	allGroupPostslastRecordId: 0,
	allGroupPostsIsEnd: false,
	myGroupPostslastRecordId: 0,
	myGroupPostsIsEnd: false,
	isLoading: true,
};

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		resetPostStateForGroupPage: (state) => {
			state.postInfo = null;
			state.allGroupPosts = [];
			state.allGroupPostslastRecordId = 0;
			state.allGroupPostsIsEnd = false;
		},
		resetPostInfo: (state) => {
			state.postInfo = null;
		},
	},
	extraReducers: (bulider) => {
		bulider
			.addCase(getGroupAllPosts.fulfilled, (state, { payload }) => {
				state.isLoading = false;

				state.allGroupPosts = [...state.allGroupPosts, ...payload.feed];
				state.allGroupPostsIsEnd = payload.isEnd;

				if (payload.feed.length > 0) {
					state.allGroupPostslastRecordId =
						payload.feed[payload.feed.length - 1].postId;
				}
			})
			.addCase(getGroupPostInfo.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.postInfo = payload;
			})
			.addCase(getMyGroupPosts.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.myGroupPosts = [...state.myGroupPosts, ...payload.feed];
				state.myGroupPostsIsEnd = payload.isEnd;

				if (payload.feed.length > 0) {
					state.myGroupPostslastRecordId =
						payload.feed[payload.feed.length - 1].postId;
				}
			})
			.addCase(likeGroupPost.fulfilled, (state) => {
				state.postInfo.post.likesCount += 1;
				state.postInfo.post.isLiked = true;
				state.isLoading = false;
			})
			.addCase(cancelLikeGroupPost.fulfilled, (state) => {
				state.postInfo.post.likesCount -= 1;
				state.postInfo.post.isLiked = false;
				state.isLoading = false;
			})
			.addCase(deleteGroupPost.fulfilled, (state, { meta: { arg: id } }) => {
				state.isLoading = false;
				toast.success("글을 삭제하는데 성공하였습니다.");
				state.allGroupPosts = state.allGroupPosts.filter(
					(prev) => prev.postId !== id.postId,
				);
				state.myGroupPosts = state.myGroupPosts.filter(
					(prev) => prev.postId !== id.postId,
				);
			})
			.addMatcher(
				isAnyOf(
					getGroupAllPosts.pending,
					getGroupPostInfo.pending,
					getMyGroupPosts.pending,
					likeGroupPost.pending,
					cancelLikeGroupPost.pending,
					deleteGroupPost.pending,
				),
				(state) => {
					state.isLoading = true;
				},
			)
			.addMatcher(
				isAnyOf(
					getGroupAllPosts.rejected,
					getGroupPostInfo.rejected,
					getMyGroupPosts.rejected,
					likeGroupPost.rejected,
					cancelLikeGroupPost.rejected,
					deleteGroupPost.rejected,
				),
				(state) => {
					state.isLoading = false;
				},
			);
	},
});

export const { resetPostStateForGroupPage, resetPostInfo } = postSlice.actions;

export default postSlice.reducer;
