import { createAsyncThunk } from "@reduxjs/toolkit";

import commonThunk from "../commonThunk";

export const getComments = createAsyncThunk(
	"comment/getComments",
	async ({ groupId, postId }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/group/${groupId}/post/${postId}/comment`,
				successCode: 200,
			},
			thunkAPI,
		);
		return data;
	},
);

export const postComment = createAsyncThunk(
	"comment/postComment",
	async ({ groupId, postId, content }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "POST",
				url: `/api/group/${groupId}/post/${postId}/comment`,
				data: { content },
				successCode: 201,
			},
			thunkAPI,
		);
		return data;
	},
);

export const deleteComment = createAsyncThunk(
	"comment/deleteComment",
	async ({ groupId, postId, commentId }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "DELETE",
				url: `/api/group/${groupId}/post/${postId}/comment/${commentId}`,
				successCode: 204,
			},
			thunkAPI,
		);
		return data;
	},
);

export const putComment = createAsyncThunk(
	"comment/putComment",
	async ({ groupId, postId, commentId, content }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "PUT",
				url: `/api/group/${groupId}/post/${postId}/comment/${commentId}`,
				data: { content },
				successCode: 200,
			},
			thunkAPI,
		);
		return data;
	},
);
