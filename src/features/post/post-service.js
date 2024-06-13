import { createAsyncThunk } from "@reduxjs/toolkit";

import commonThunk from "../commonThunk";

export const createPost = createAsyncThunk(
	"post/createPost",
	async ({ groupId, formData }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "POST",
				url: `/api/group/${groupId}/post`,
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
				successCode: 201,
			},
			thunkAPI,
		);
		return data;
	},
);

export const getGroupAllPosts = createAsyncThunk(
	"post/getGroupAllPosts",
	async (groupId, thunkAPI) => {
		const { allGroupPostslastRecordId } = thunkAPI.getState().post;

		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/group/${groupId}/post?last_record_id=${allGroupPostslastRecordId}`,
				successCode: 200,
			},
			thunkAPI,
		);
		return data;
	},
);

export const getGroupPostInfo = createAsyncThunk(
	"post/getGroupPostInfo",
	async ({ groupId, postId }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/group/${groupId}/post/${postId}`,
				successCode: 200,
			},
			thunkAPI,
		);
		return data;
	},
);

export const getMyGroupPosts = createAsyncThunk(
	"post/getMyGroupPosts",
	async (recordId, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/user/post?last_record_id=${recordId}`,
				successCode: 200,
			},
			thunkAPI,
		);
		return data;
	},
);

export const likeGroupPost = createAsyncThunk(
	"post/likeGroupPost",
	async ({ postGroupId, postId }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "POST",
				url: `/api/group/${postGroupId}/post/${postId}/like`,
				successCode: 201,
			},
			thunkAPI,
		);
		return data;
	},
);

export const cancelLikeGroupPost = createAsyncThunk(
	"post/cancelLikeGroupPost",
	async ({ postGroupId, postId }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "DELETE",
				url: `/api/group/${postGroupId}/post/${postId}/like`,
				successCode: 204,
			},
			thunkAPI,
		);
		return data;
	},
);

export const deleteGroupPost = createAsyncThunk(
	"post/deleteGroupPost",
	async ({ postGroupId, postId }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "DELETE",
				url: `/api/group/${postGroupId}/post/${postId}`,
				successCode: 204,
			},
			thunkAPI,
		);
		return data;
	},
);
