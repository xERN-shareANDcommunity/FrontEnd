import { toast } from "react-toastify";

import { createSlice } from "@reduxjs/toolkit";

import {
	updateGroup,
	leaveGroup,
	delegateGroup,
	changeGroupOption,
	searchGroup,
	deleteGroup,
	getGroupList,
	getGroupInfo,
	getGroupRequestMemberList,
	approveGroupJoin,
	rejectGroupJoin,
	deleteGroupMember,
	changeRequestGroupJoin,
	changeGroupPublicOption,
	updateGroupProfile,
	getGroupMemberList,
	changeAccessLevel,
	withdrawalGroup,
	joinGroupInviteLink,
} from "./group-service.js";

const initialState = {
	groupList: [],
	isEnd: false,
	lastRecordId: 0,
	searchGroupList: [],
	searchLastRecordId: 0,
	isSearchEnd: false,
	groupInfo: null,
	groupRequestMemberList: [],
	groupMemberList: [],
	isUserGroupRefetching: true,
};

const groupSlice = createSlice({
	name: "group",
	initialState,
	reducers: {
		setRefetchUserGroup: (state, { payload }) => {
			state.isUserGroupRefetching = payload;
		},
		resetGroupStateForGroupPage: (state) => {
			state.groupInfo = null;
			state.groupRequestMemberList = [];
			state.groupMemberList = [];
		},
	},
	extraReducers: (bulider) => {
		bulider
			.addCase(deleteGroup.fulfilled, () => {
				toast.success("그룹을 삭제하는데 성공하였습니다.");
			})
			.addCase(searchGroup.fulfilled, (state, { payload }) => {
				state.searchGroupList = [...state.searchGroupList, ...payload.groups];
				state.isSearchEnd = payload.isEnd;

				if (payload.groups.length > 0) {
					state.searchLastRecordId =
						payload.groups[payload.groups.length - 1].groupId;
				}
			})
			.addCase(getGroupList.fulfilled, (state, { payload }) => {
				state.groupList = [...state.groupList, ...payload.groups];
				state.isEnd = payload.isEnd;

				if (payload.groups.length > 0) {
					state.lastRecordId =
						payload.groups[payload.groups.length - 1].groupId;
				}
			})
			.addCase(leaveGroup.fulfilled, () => {
				toast.success("그룹을 탈퇴하였습니다.");
			})
			.addCase(updateGroup.fulfilled, () => {
				toast.success("그룹리더 변경에 성공하였습니다.");
			})
			.addCase(deleteGroupMember.fulfilled, (state, { meta: { arg: id } }) => {
				toast.success("그룹원 내보내기 완료");
				state.groupMemberList = state.groupMemberList.filter(
					(prev) => prev.member.userId !== id.userId,
				);
			})
			.addCase(
				approveGroupJoin.fulfilled,
				(
					state,
					{
						meta: {
							arg: { userId },
						},
					},
				) => {
					state.groupRequestMemberList = state.groupRequestMemberList.filter(
						(prev) => prev.member.userId !== userId,
					);

					toast.success("그룹 가입 신청 수락 완료");
				},
			)
			.addCase(
				rejectGroupJoin.fulfilled,
				(
					state,
					{
						meta: {
							arg: { userId },
						},
					},
				) => {
					state.groupRequestMemberList = state.groupRequestMemberList.filter(
						(prev) => prev.member.userId !== userId,
					);
					toast.success("그룹 가입 신청 거절 완료");
				},
			)
			.addCase(getGroupRequestMemberList.fulfilled, (state, { payload }) => {
				state.groupRequestMemberList = payload;
			})
			.addCase(getGroupInfo.fulfilled, (state, { payload }) => {
				state.groupInfo = payload;
			})
			.addCase(
				changeRequestGroupJoin.fulfilled,
				(state, { meta: { arg }, payload }) => {
					if (payload.message === "성공적으로 신청되었습니다.") {
						toast.success("그룹 신청 완료");
					} else {
						state.groupRequestMemberList = state.groupRequestMemberList.filter(
							(prev) => prev.member.userId === arg,
						);
						toast.success("그룹 신청 취소 완료");
					}
				},
			)
			.addCase(changeGroupPublicOption.fulfilled, ({ payload }) => {
				toast.error(payload.error);
			})
			.addCase(
				updateGroupProfile.fulfilled,
				(state, { payload: { name, description, image } }) => {
					state.groupInfo = { ...state.groupInfo, name, description, image };
					toast.success("그룹 정보가 수정되었습니다");
				},
			)
			.addCase(changeGroupOption.fulfilled, () => {})
			.addCase(delegateGroup.fulfilled, () => {
				toast.success("그룹장 위임이 완료되었습니다.");
			})
			.addCase(getGroupMemberList.fulfilled, (state, { payload }) => {
				state.groupMemberList = payload;
			})
			.addCase(
				changeAccessLevel.fulfilled,
				(
					state,
					{
						meta: {
							arg: { userId, accessLevel },
						},
					},
				) => {
					toast.success("그룹원 권한이 변경되었습니다.");
					state.groupMemberList[
						state.groupMemberList.findIndex((el) => el.member.userId === userId)
					].accessLevel = accessLevel;
				},
			)
			.addCase(withdrawalGroup.fulfilled, () => {
				toast.error("그룹 탈퇴에 성공하였습니다");
			})
			.addCase(joinGroupInviteLink.fulfilled, () => {
				toast.success("그룹 가입에 성공하였습니다");
			});
	},
});

export const {
	selectGroup,
	selectGroupInfo,
	setRefetchUserGroup,
	resetGroupStateForGroupPage,
} = groupSlice.actions;

export default groupSlice.reducer;
