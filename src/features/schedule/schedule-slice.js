import { toast } from "react-toastify";

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import _ from "lodash";

import {
	SCHEDULE_PAGE_TYPE,
	VIEW_TYPE,
} from "@/constants/calendarConstants.js";
import { inqueryUserGroup } from "@/features/user/user-service.js";
import { getCurrentWeek } from "@/utils/calendarUtils.js";
import { convertScheduleDataToFormValue } from "@/utils/convertSchedule.js";

import {
	createSchedule,
	getSchedulesSummary,
	getSchedulesForTheWeek,
	getTodaySchedules,
	updateSchedule,
	deleteSchedule,
	getOverlappedSchedules,
	getGroupScheduleProposal,
	getScheduleProposals,
} from "./schedule-service.js";

const initialOverlappedScheduleInfo = { title: "", schedules: [] };

// lodash만으로 state 내 배열(Proxy(array))과 그냥 객체 내 배열 간의 비교가 안돼서 따로 작성함
const checkTowFormsAreDifferent = (prevState, curr) => {
	let isDifferent = false;
	const keys = Object.keys(prevState);
	for (let i = 0; i < keys.length; i += 1) {
		const key = keys[i];
		// byweekday가 아닐 때
		if (key !== "byweekday") {
			if (prevState[key] !== curr[key]) {
				isDifferent = true;
				break;
			}
		} else {
			// byweekday일 때
			const prevByweekday = [...prevState[key]];
			const currByweekday = [...curr[key]];
			// byweekday는 순서가 무작위이므로 정렬 후 비교
			prevByweekday.sort();
			currByweekday.sort();
			if (!_.isEqual(prevByweekday, currByweekday)) {
				isDifferent = true;
				break;
			}
		}
	}
	return isDifferent;
};

const initialState = {
	calendarSchedules: [],
	currentGroupScheduleId: null,
	scheduleProposals: [],
	recommendedScheduleProposals: [],
	todaySchedules: [],
	schedulesForTheWeek: [],
	overlappedScheduleInfo: initialOverlappedScheduleInfo,
	currentYear: new Date().getFullYear(),
	currentMonth: new Date().getMonth() + 1,
	currentWeek: getCurrentWeek(),
	isLoading: false,
	currentCalendarView: VIEW_TYPE.DAY_GRID_MONTH,
	currentPageType: SCHEDULE_PAGE_TYPE.PERSONAL,
};

const scheduleSlice = createSlice({
	name: "schedule",
	initialState,
	reducers: {
		setCurrentYear: (state, { payload }) => {
			state.currentYear = Number(payload);
		},
		setCurrentMonth: (state, { payload }) => {
			state.currentMonth = Number(payload);
		},
		setCurrentWeek: (state, { payload }) => {
			state.currentWeek = payload;
		},
		setCurrentCalenderView: (state, { payload }) => {
			if (
				payload !== VIEW_TYPE.DAY_GRID_MONTH &&
				payload !== VIEW_TYPE.DAY_GRID_WEEK
			) {
				throw new Error("잘못된 view type입니다.");
			}

			state.currentCalendarView = payload;
		},
		resetOverlappedSchedules: (state) => {
			state.overlappedScheduleInfo = initialOverlappedScheduleInfo;
		},
		changeSchedulePage: (state, { payload }) => {
			if (
				payload !== SCHEDULE_PAGE_TYPE.PERSONAL &&
				payload !== SCHEDULE_PAGE_TYPE.SHARED
			) {
				throw new Error("잘못된 페이지 타입입니다.");
			}
			state.currentPageType = payload;
		},
		changeCurrentGroupId: (state, { payload }) => {
			state.currentGroupScheduleId = payload;
		},
		changeRecommendedProposal: (state, { payload: { formValues, index } }) => {
			// 이를 dispatch하는 onSubmit handler에서 중복 검사함
			state.recommendedScheduleProposals.splice(index, 1, formValues);
		},
		resetSchedule: () => {
			return initialState;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(createSchedule.pending, () => {
				toast.loading("업로드 중");
			})
			.addCase(
				createSchedule.fulfilled,
				(
					state,
					{ payload: { scheduleSummary, todaySchedules, schedulesForTheWeek } },
				) => {
					toast.dismiss();
					toast.success("일정이 추가되었습니다");
					state.calendarSchedules.push(scheduleSummary);

					if (todaySchedules.length > 0) {
						state.todaySchedules = state.todaySchedules.concat(todaySchedules);
						state.todaySchedules.sort(
							(prev, curr) =>
								new Date(prev.startDateTime) - new Date(curr.startDateTime),
						);
					}

					if (schedulesForTheWeek.length > 0) {
						state.schedulesForTheWeek =
							state.schedulesForTheWeek.concat(schedulesForTheWeek);
						state.schedulesForTheWeek.sort(
							(prev, curr) =>
								new Date(prev.startDateTime) - new Date(curr.startDateTime),
						);
					}
				},
			)
			.addCase(createSchedule.rejected, () => {
				toast.dismiss();
				toast.error("일정 추가에 실패했습니다.");
			})
			.addCase(getTodaySchedules.fulfilled, (state, { payload }) => {
				const { schedules } = payload;
				state.todaySchedules = schedules;
			})
			.addCase(getTodaySchedules.rejected, () => {
				toast.error("오늘 일정을 불러오는 데 실패했습니다.");
			})
			.addCase(getSchedulesForTheWeek.fulfilled, (state, { payload }) => {
				const { schedules } = payload;
				state.schedulesForTheWeek = schedules;
			})
			.addCase(getSchedulesForTheWeek.rejected, () => {
				toast.error("예정된 일정을 불러오는 데 실패했습니다.");
			})
			.addCase(getSchedulesSummary.fulfilled, (state, { payload }) => {
				state.calendarSchedules = payload.schedules;
			})
			.addCase(getSchedulesSummary.rejected, () => {
				toast.error("달력 일정을 불러오는 데 실패했습니다.");
			})
			.addCase(updateSchedule.pending, () => {
				toast.loading("수정 중");
			})
			.addCase(
				updateSchedule.fulfilled,
				(
					state,
					{
						payload: { scheduleSummary, todaySchedules, schedulesForTheWeek },
						meta: {
							arg: { id },
						},
					},
				) => {
					toast.dismiss();
					toast.success("일정이 수정되었습니다");
					state.calendarSchedules = state.calendarSchedules.filter(
						(schedule) => schedule.id !== id,
					);
					state.todaySchedules = state.todaySchedules.filter(
						(schedule) => schedule.id !== id,
					);
					state.schedulesForTheWeek = state.schedulesForTheWeek.filter(
						(schedule) => schedule.id !== id,
					);
					state.calendarSchedules.push(scheduleSummary);

					if (todaySchedules.length > 0) {
						state.todaySchedules = state.todaySchedules.concat(todaySchedules);
						state.todaySchedules.sort(
							(prev, curr) =>
								new Date(prev.startDateTime) - new Date(curr.startDateTime),
						);
					}

					if (schedulesForTheWeek.length > 0) {
						state.schedulesForTheWeek =
							state.schedulesForTheWeek.concat(schedulesForTheWeek);
						state.schedulesForTheWeek.sort(
							(prev, curr) =>
								new Date(prev.startDateTime) - new Date(curr.startDateTime),
						);
					}
					// 겹친 일정들 중 하나를 열고 수정 시 겹치느 일정들 목록을 초기화함
					if (
						state.overlappedScheduleInfo.schedules.some(
							(schedule) => schedule.id === id,
						)
					) {
						state.overlappedScheduleInfo = initialOverlappedScheduleInfo;
					}
				},
			)
			.addCase(updateSchedule.rejected, () => {
				toast.dismiss();
				toast.error("일정 수정에 실패했습니다.");
			})
			.addCase(deleteSchedule.pending, () => {
				toast.loading("삭제 중");
			})
			.addCase(deleteSchedule.fulfilled, (state, { meta: { arg: id } }) => {
				toast.dismiss();
				toast.success("일정이 삭제되었습니다");
				state.calendarSchedules = state.calendarSchedules.filter(
					(prev) => prev.id !== id,
				);
				state.todaySchedules = state.todaySchedules.filter(
					(prev) => prev.id !== id,
				);
				state.schedulesForTheWeek = state.schedulesForTheWeek.filter(
					(prev) => prev.id !== id,
				);
			})
			.addCase(deleteSchedule.rejected, () => {
				toast.dismiss();
				toast.error("일정 삭제에 실패했습니다.");
			})
			.addCase(getOverlappedSchedules.fulfilled, (state, { payload }) => {
				state.overlappedScheduleInfo = payload;
			})
			.addCase(getOverlappedSchedules.rejected, (state) => {
				state.overlappedScheduleInfo = initialOverlappedScheduleInfo;
			})
			.addCase(getGroupScheduleProposal.fulfilled, (state, { payload }) => {
				state.scheduleProposals = payload;
			})
			.addCase(getScheduleProposals.fulfilled, (state, { payload }) => {
				payload.proposals.forEach((proposal) => {
					const proposalFormValue = convertScheduleDataToFormValue(proposal);
					const sameProposalIndex =
						state.recommendedScheduleProposals.findIndex((prevProposal) =>
							checkTowFormsAreDifferent(prevProposal, proposalFormValue),
						);
					if (sameProposalIndex === -1) {
						state.recommendedScheduleProposals.push(proposalFormValue);
					}
				});
			})
			// userGroup 업데이트 시
			.addCase(inqueryUserGroup.fulfilled, (state, { payload }) => {
				if (payload.length > 0 && !state.currentGroupScheduleId) {
					state.currentGroupScheduleId = payload[0].groupId;
				}
			})
			.addMatcher(
				isAnyOf(
					createSchedule.pending,
					getTodaySchedules.pending,
					getSchedulesForTheWeek.pending,
					getSchedulesSummary.pending,
					updateSchedule.pending,
					deleteSchedule.pending,
					getOverlappedSchedules.pending,
					getGroupScheduleProposal.pending,
					getScheduleProposals.pending,
				),
				(state) => {
					state.isLoading = true;
				},
			)
			.addMatcher(
				isAnyOf(
					createSchedule.fulfilled,
					getTodaySchedules.fulfilled,
					getSchedulesForTheWeek.fulfilled,
					getSchedulesSummary.fulfilled,
					updateSchedule.fulfilled,
					deleteSchedule.fulfilled,
					getOverlappedSchedules.fulfilled,
					getGroupScheduleProposal.fulfilled,
					getScheduleProposals.fulfilled,
				),
				(state) => {
					state.isLoading = false;
				},
			)
			.addMatcher(
				isAnyOf(
					createSchedule.rejected,
					getTodaySchedules.rejected,
					getSchedulesForTheWeek.rejected,
					getSchedulesSummary.rejected,
					updateSchedule.rejected,
					deleteSchedule.rejected,
					getOverlappedSchedules.rejected,
					getGroupScheduleProposal.rejected,
					getScheduleProposals.rejected,
				),
				(state) => {
					state.isLoading = false;
				},
			);
	},
});

export const {
	setCurrentYear,
	setCurrentMonth,
	setCurrentWeek,
	setCurrentCalenderView,
	resetOverlappedSchedules,
	changeSchedulePage,
	changeCurrentGroupId,
	changeRecommendedProposal,
	resetSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
