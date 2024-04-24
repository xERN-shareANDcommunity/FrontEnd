import { createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";

import { SCHEDULE_PAGE_TYPE, VIEW_TYPE } from "@/constants/calendarConstants";
import commonThunk from "@/features/commonThunk";
import { closeModal } from "@/features/ui/ui-slice";
import { getFirstDateOfWeek } from "@/utils/calendarUtils";
import { convertScheduleFormValueToData } from "@/utils/convertSchedule";
import convertToUTC from "@/utils/convertToUTC";

export const getGroupScheduleProposal = createAsyncThunk(
	"schedule/getGroupScheduleProposal",
	async (_, thunkAPI) => {
		const {
			schedule: { currentGroupScheduleId, currentPageType },
		} = thunkAPI.getState();

		if (
			currentPageType !== SCHEDULE_PAGE_TYPE.SHARED ||
			!currentGroupScheduleId
		) {
			return thunkAPI.rejectWithValue("잘못된 일정 후보 요청 형식입니다.");
		}

		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/group/${currentGroupScheduleId}/proposal/list`,
				successCode: 200,
			},
			thunkAPI,
		);

		return data;
	},
);

export const getTodaySchedules = createAsyncThunk(
	"schedule/getTodaySchedules",
	async (_, thunkAPI) => {
		const {
			schedule: { currentGroupScheduleId, currentPageType },
		} = thunkAPI.getState();

		if (
			currentPageType === SCHEDULE_PAGE_TYPE.SHARED &&
			!currentGroupScheduleId
		) {
			return thunkAPI.rejectWithValue("잘못된 오늘 일정 요청 형식입니다.");
		}

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const startDateTime = today.toISOString();
		const endDateTime = new Date(
			today.setDate(today.getDate() + 1),
		).toISOString();

		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/${
					currentPageType === SCHEDULE_PAGE_TYPE.PERSONAL
						? "user"
						: `group/${currentGroupScheduleId}`
				}/calendar`,
				params: {
					startDateTime,
					endDateTime,
				},
				successCode: 200,
			},
			thunkAPI,
		);
		return data;
	},
);

export const getSchedulesForTheWeek = createAsyncThunk(
	"schedule/getSchedulesForTheWeek",
	async (_, thunkAPI) => {
		const {
			schedule: { currentGroupScheduleId, currentPageType },
		} = thunkAPI.getState();

		if (
			currentPageType === SCHEDULE_PAGE_TYPE.SHARED &&
			!currentGroupScheduleId
		) {
			return thunkAPI.rejectWithValue("잘못된 오늘 일정 요청 형식입니다.");
		}

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const startDateTime = new Date(
			today.setDate(today.getDate() + 1),
		).toISOString();
		const endDateTime = new Date(
			today.setDate(today.getDate() + 6),
		).toISOString();

		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/${
					currentPageType === SCHEDULE_PAGE_TYPE.PERSONAL
						? "user"
						: `group/${currentGroupScheduleId}`
				}/calendar`,
				params: {
					startDateTime,
					endDateTime,
				},
				successCode: 200,
			},
			thunkAPI,
		);
		return data;
	},
);

export const getSchedulesSummary = createAsyncThunk(
	"schedule/getSchedulesSummary",
	async (_, thunkAPI) => {
		const {
			schedule: { currentGroupScheduleId, currentPageType },
		} = thunkAPI.getState();

		if (
			currentPageType === SCHEDULE_PAGE_TYPE.SHARED &&
			!currentGroupScheduleId
		) {
			return thunkAPI.rejectWithValue("잘못된 오늘 일정 요청 형식입니다.");
		}

		const state = thunkAPI.getState();
		const { currentYear, currentMonth, currentWeek, currentCalendarView } =
			state.schedule;
		const firstDateOfWeek = getFirstDateOfWeek(
			currentYear,
			currentMonth,
			currentWeek,
		);
		const doesWeekContainNextMonth =
			getFirstDateOfWeek(currentYear, currentMonth, currentWeek + 1) > 1;
		const doesWeekContainNextYear =
			doesWeekContainNextMonth && currentYear === 12;
		const startDateTime = new Date(
			currentYear,
			currentMonth - 1,
			currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH ? 1 : firstDateOfWeek,
		).toISOString();
		const endDateTime = new Date(
			doesWeekContainNextYear ? currentYear + 1 : currentYear,
			// eslint-disable-next-line no-nested-ternary
			doesWeekContainNextYear
				? 1
				: doesWeekContainNextMonth
				? currentMonth
				: currentMonth - 1,
			currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH ||
			doesWeekContainNextMonth
				? 1
				: firstDateOfWeek + 6,
		).toISOString();

		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/${
					currentPageType === SCHEDULE_PAGE_TYPE.PERSONAL
						? "user"
						: `group/${currentGroupScheduleId}`
				}/calendar/summary`,
				params: {
					startDateTime,
					endDateTime,
				},
				successCode: 200,
			},
			thunkAPI,
		);

		return data;
	},
);

export const createSchedule = createAsyncThunk(
	"schedule/createSchedule",
	async (schedule, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "POST",
				url: `/api/user/calendar`,
				data: convertScheduleFormValueToData(schedule),
				successCode: 201,
			},
			thunkAPI,
		);

		return data;
	},
);

export const deleteSchedule = createAsyncThunk(
	"schedule/deleteSchedule",
	async (id, thunkAPI) => {
		const data = await commonThunk(
			{ method: "DELETE", url: `/api/user/calendar/${id}`, successCode: 204 },
			thunkAPI,
		);

		return data;
	},
);

export const updateSchedule = createAsyncThunk(
	"schedule/updateSchedule",
	async ({ schedule, id }, thunkAPI) => {
		const data = await commonThunk(
			{
				method: "PUT",
				url: `/api/user/calendar/${id}`,
				data: convertScheduleFormValueToData(schedule),
				successCode: 201,
			},
			thunkAPI,
		);

		return data;
	},
);

export const getOverlappedSchedules = createAsyncThunk(
	"schedule/getOverlappedSchedules",
	async ({ start, end }, thunkAPI) => {
		const {
			schedule: { currentCalendarView },
		} = thunkAPI.getState();

		if (!(start instanceof Date) || !(end instanceof Date))
			throw Error("잘못된 payload입니다.");

		const data = await commonThunk(
			{
				method: "GET",
				url: "/api/user/calendar",
				params: {
					startDateTime: start.toISOString(),
					endDateTime: end.toISOString(),
				},
				successCode: 200,
			},
			thunkAPI,
		);

		if (data.schedules.length === 0) {
			return thunkAPI.rejectWithValue("해당 날짜의 일정이 없습니다.");
		}

		if (data.schedules && currentCalendarView === VIEW_TYPE.DAY_GRID_WEEK) {
			data.schedules = data.schedules.filter(
				(schedule) =>
					new Date(schedule.startDateTime) <= start &&
					new Date(schedule.endDateTime) >= end,
			);
		}

		const yearFormat =
			start.getFullYear() === end.getFullYear() &&
			currentCalendarView === VIEW_TYPE.DAY_GRID_WEEK
				? ""
				: "YYYY년 ";
		const title =
			currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH
				? moment(start).format(`${yearFormat}MM월 DD일`)
				: `${moment(start).format(`${yearFormat}MM월 DD일 HH시 mm분`)}부터
${moment(end).format(`${yearFormat}MM월 DD일 HH시 mm분`)}`;

		return { schedules: data.schedules, title };
	},
);

export const getScheduleProposals = createAsyncThunk(
	"schedule/getScheduleProposals",
	async (
		{ startDateStr, endDateStr, startTimeStr, endTimeStr, minDuration },
		thunkAPI,
	) => {
		const groupId = thunkAPI.getState().schedule.currentGroupScheduleId;

		if (!startDateStr || !endDateStr || !minDuration || !groupId) {
			return thunkAPI.rejectWithValue("잘못된 데이터 형식입니다.");
		}

		const data = await commonThunk(
			{
				method: "GET",
				url: `/api/group/2/proposals?startDateTime=${convertToUTC(
					startDateStr,
					startTimeStr,
				)}&endDateTime=${convertToUTC(
					endDateStr,
					endTimeStr,
				)}&duration=${minDuration}`,
				successCode: 200,
			},
			thunkAPI,
		);

		return data;
	},
);

export const enrollScheudleProposals = createAsyncThunk(
	"schedule/enrollScheudleProposals",
	async ({ title, content, selectedRecommendationIndexes }, thunkAPI) => {
		const { currentGroupScheduleId: groupId, recommendedScheduleProposals } =
			thunkAPI.getState().schedule;

		if (
			!title ||
			!content ||
			selectedRecommendationIndexes.length === 0 ||
			!groupId
		) {
			return thunkAPI.rejectWithValue("잘못된 데이터 형식입니다.");
		}

		try {
			const promises = selectedRecommendationIndexes.map(
				async (proposalIndex) => {
					const body = convertScheduleFormValueToData({
						title,
						content,
						...recommendedScheduleProposals[proposalIndex],
					});
					delete body.requestStartDateTime;
					delete body.requestEndDateTime;
					return commonThunk(
						{
							method: "POST",
							url: `/api/group/${groupId}/proposal`,
							data: body,
							successCode: 200,
						},
						thunkAPI,
					);
				},
			);
			const result = await Promise.all(promises);
			thunkAPI.dispatch(closeModal());
			return result;
		} catch (error) {
			return thunkAPI.rejectWithValue("일정 후보 등록 실패");
		}
	},
);
