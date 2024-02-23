import { createSlice } from "@reduxjs/toolkit";

import { SCHEDULE_MODAL_TYPE, UI_TYPE } from "@/constants/uiConstants";

const initialState = {
	openedModal: null,
	feedDetailModalId: null,
	scheduleModalMode: SCHEDULE_MODAL_TYPE.CREATE,
	scheduleModalId: null,
	isLoading: true,
	warningModalUserInfo: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		openScheduleCreateModal: (state, action) => {
			const { type } = action.payload;
			if (
				type !== UI_TYPE.PERSONAL_SCHEDULE &&
				type !== UI_TYPE.SHARE_SCHEDULE
			) {
				throw Error("잘못된 modal type입니다");
			}

			state.openedModal = type;
			state.scheduleModalMode = SCHEDULE_MODAL_TYPE.CREATE;
		},
		openScheduleEditModal: (state, action) => {
			const { type, id } = action.payload;
			if (
				type !== UI_TYPE.PERSONAL_SCHEDULE &&
				type !== UI_TYPE.SHARE_SCHEDULE
			) {
				throw Error("잘못된 modal type입니다");
			}

			if (id === null) {
				throw Error("일정 id를 입력해주세요");
			}

			state.openedModal = type;
			state.scheduleModalMode = SCHEDULE_MODAL_TYPE.EDIT;
			state.scheduleModalId = id;
		},
		openScheduleViewModal: (state, action) => {
			const { type, id } = action.payload;
			if (
				type !== UI_TYPE.PERSONAL_SCHEDULE &&
				type !== UI_TYPE.SHARE_SCHEDULE
			) {
				throw Error("잘못된 modal type입니다");
			}

			if (id === null) {
				throw Error("일정 id를 입력해주세요");
			}

			state.openedModal = type;
			state.scheduleModalMode = SCHEDULE_MODAL_TYPE.VIEW;
			state.scheduleModalId = id;
		},
		openScheduleProposalModal: (state) => {
			state.openedModal = UI_TYPE.SHARE_SCHEDULE;
			state.scheduleModalMode = SCHEDULE_MODAL_TYPE.PROPOSAL;
		},
		openCreateGroupModal: (state) => {
			state.openedModal = UI_TYPE.CREATE_GROUP;
		},
		openDeleteGroupModal: (state) => {
			state.openedModal = UI_TYPE.DELETE_GROUP;
		},
		openDelegateGroupModal: (state) => {
			state.openedModal = UI_TYPE.DELEGATE_GROUP;
		},
		openLeaveGroupModal: (state) => {
			state.openedModal = UI_TYPE.LEAVE_GROUP;
		},
		openWithdrawModal: (state) => {
			state.openedModal = UI_TYPE.WITHDRAW;
		},
		openRequestCancelModal: (state) => {
			state.openedModal = UI_TYPE.REQUEST_CANCEL;
		},
		openExitGroupModal: (state) => {
			state.openedModal = UI_TYPE.EXIT_GROUP;
		},
		openJoinGroupModal: (state) => {
			state.openedModal = UI_TYPE.JOIN_GROUP;
		},
		openMemberModal: (state) => {
			state.openedModal = UI_TYPE.MEMBER_MODAL;
		},
		openMemberRequestModal: (state) => {
			state.openedModal = UI_TYPE.MEMBER_REQUEST_MODAL;
		},
		openDeleteMemberWarningModal: (state, { payload }) => {
			state.warningModalUserInfo = payload;
			state.openedModal = UI_TYPE.DELETE_MEMBER_WARNING_MODAL;
		},
		openFeedDetailModal: (state, { payload }) => {
			state.feedDetailModalId = payload;
			state.openedModal = UI_TYPE.FEED_DETAIL_MODAL;
		},
		closeModal: () => {
			return initialState;
		},
		setIsLoading: (state, { payload }) => {
			if (typeof payload !== "boolean") {
				throw new Error("isLoading의 state는 boolean 값만 가능합니다.");
			}

			state.isLoading = payload;
		},
	},
});

export const {
	openScheduleCreateModal,
	openScheduleEditModal,
	openScheduleViewModal,
	openScheduleProposalModal,
	openCreateGroupModal,
	closeModal,
	setIsLoading,
	openDeleteGroupModal,
	openDelegateGroupModal,
	openLeaveGroupModal,
	openWithdrawModal,
	openRequestCancelModal,
	openExitGroupModal,
	openJoinGroupModal,
	openMemberModal,
	openMemberRequestModal,
	openDeleteMemberWarningModal,
	openFeedDetailModal,
} = uiSlice.actions;

export default uiSlice.reducer;
