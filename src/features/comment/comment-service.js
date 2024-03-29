import { createAsyncThunk } from "@reduxjs/toolkit";

import commonThunk from "../commonThunk";

export const getComments = createAsyncThunk(
	"post/getComments",
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
