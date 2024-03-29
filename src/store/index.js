import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/auth-slice.js";
import commentReducer from "@/features/comment/comment-slice";
import groupReducer from "@/features/group/group-slice.js";
import postReducer from "@/features/post/post-slice";
import scheduleReducer from "@/features/schedule/schedule-slice.js";
import uiReducer from "@/features/ui/ui-slice.js";
import userReducer from "@/features/user/user-slice";

const rootReducer = combineReducers({
	auth: authReducer,
	schedule: scheduleReducer,
	group: groupReducer,
	ui: uiReducer,
	user: userReducer,
	post: postReducer,
	comment: commentReducer,
});

export const setupStore = (preloadedState) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};
