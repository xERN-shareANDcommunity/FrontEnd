import moment from "moment";

import customFetch from "@/components/UI/BaseAxios";
import { SCHEDULE_COLORS } from "@/constants/calendarConstants";
import convertToUTC from "@/utils/convertToUTC";

// 리스트(주마다 보기)로 진행했을 떄 보여줄 첫 일요일을 계산합니다.
export const getFirstDateOfWeek = (year, month, week) => {
	const firstDateOfMonth = new Date(year, month - 1);
	const firstDayOfMonth = firstDateOfMonth.getDay();
	firstDateOfMonth.setDate(
		firstDateOfMonth.getDate() - firstDayOfMonth + 7 * (week - 1),
	);
	return firstDateOfMonth.getDate();
};

// currentWeek 초기화를 위해 현재 몇 주차인지 계산합니다.
export const getCurrentWeek = () => {
	const today = new Date();
	const date = today.getDate();
	const day = today.getDay(); // 0~6;
	const firstDateOfWeek = date - day;
	const currentWeekNum = Math.ceil((firstDateOfWeek - 1) / 7) + 1;
	return currentWeekNum;
};

export const checkIsAlldaySchedule = (startDateTime, endDateTime) => {
	if (
		!(typeof startDateTime === "string") ||
		!(typeof endDateTime === "string")
	) {
		throw new Error("getIsAllDay의 인자는 string 타입이어야 합니다.");
	}
	const gap = new Date(endDateTime) - new Date(startDateTime);
	const startDateFormat = moment(startDateTime).format("YYYY-MM-DD");
	const endDateFormat = moment(startDateTime).format("YYYY-MM-DD");

	return (
		startDateFormat === endDateFormat &&
		gap === 86399999 &&
		convertToUTC(startDateFormat, "00:00") === startDateTime
	);
};

export const convertByweekdayNumberToString = (byweekdayNums) => {
	if (!Array.isArray(byweekdayNums)) return byweekdayNums;
	return byweekdayNums.map((num) => {
		if (num === 0) return "su";
		if (num === 1) return "mo";
		if (num === 2) return "tu";
		if (num === 3) return "we";
		if (num === 4) return "th";
		if (num === 5) return "fr";
		if (num === 6) return "sa";
		throw Error("유효하지 않은 byweekday number입니다");
	});
};

export const getSchedule = async (
	scheduleId,
	onFulfilled,
	groupId = null,
	isGroup = false,
) => {
	if (typeof onFulfilled !== "function") {
		throw new Error("onFullfilled 이벤트 리스너가 필요합니다.");
	}
	if (isGroup) {
		if (!groupId) {
			throw new Error("조회하려는 group의 Id가 필요합니다.");
		}
	}
	try {
		const response = await customFetch.get(
			`api/${
				isGroup && groupId ? `group/${groupId}` : "user"
			}/calendar/${scheduleId}`,
		);
		onFulfilled(response.data);
	} catch (error) {
		console.log(error);
	}
};

/** 
	response는 배열이며, owner인 유저가 배열 첫 번쨰 인덱스입니다.	
*/
export const getGroupMembers = async (onFulfilled, groupId) => {
	if (typeof onFulfilled !== "function") {
		throw new Error("onFullfilled 이벤트 리스너가 필요합니다.");
	}
	if (!groupId) {
		throw new Error("조회하려는 group의 Id가 필요합니다.");
	}
	try {
		const response = await customFetch.get(`/api/group/${groupId}/members`);
		response.data.sort((member) => (member.accessLevel === "owner" ? -1 : 1));
		onFulfilled(response.data);
	} catch (error) {
		console.log(error);
	}
};

export const getGroupColor = (groupId) => {
	return SCHEDULE_COLORS[groupId % 20];
};

export const getTimeString = (start, end, isAlldayValue) => {
	const isAllday = checkIsAlldaySchedule(start, end) || isAlldayValue;
	const startDate = new Date(start);
	const endDate = new Date(end);
	const startDateString = `${
		startDate.getMonth() + 1
	}월 ${startDate.getDate()}일`;
	if (isAllday) {
		return `${startDateString} 하루 종일`;
	}

	const startTimeString = `${
		startDate.getHours() < 10
			? `0${startDate.getHours()}`
			: startDate.getHours()
	}:${
		startDate.getMinutes() < 10
			? `0${startDate.getMinutes()}`
			: startDate.getMinutes()
	}`;
	let endDateString = `${endDate.getMonth() + 1}월 ${endDate.getDate()}일`;
	const endTimeString = `${
		// eslint-disable-next-line no-nested-ternary
		!endDate.getHours() && !endDate.getMinutes()
			? 24
			: endDate.getHours() < 10
			? `0${endDate.getHours()}`
			: endDate.getHours()
	}:${
		endDate.getMinutes() < 10
			? `0${endDate.getMinutes()}`
			: endDate.getMinutes()
	}`;

	const isOnlyToday = startDate.toDateString() === endDate.toDateString();

	if (isOnlyToday || checkIsAlldaySchedule(start, end)) {
		endDateString = null;
	}

	return `${startDateString} ${startTimeString} ~ ${
		endDateString || ""
	} ${endTimeString}`;
};

export const calculateMinUntilDateString = (
	startDateStr,
	freq,
	intervalValue,
	isInfinite = false,
) => {
	const interval = Math.floor(
		Number(intervalValue) > 0 ? Number(intervalValue) : 1,
	);
	if (typeof startDateStr !== "string") {
		throw new Error(
			`startDateStr은 문자열 타입이어야 합니다. 현재 값은 ${startDateStr}입니다.`,
		);
	}
	if (startDateStr.trim() === "") {
		throw new Error(
			`startDateStr은 빈 문자열이 아니어야 합니다. 현재 값은 비어있습니다.`,
		);
	}

	if (freq === "NONE" || isInfinite) {
		return "";
	}

	const startDate = new Date(startDateStr);
	let untilDate = "";

	if (freq === "DAILY" || freq === "DAILY_N") {
		untilDate = startDate.setDate(startDate.getDate() + interval + 1);
	} else if (freq === "WEEKLY" || freq === "WEEKLY_N") {
		untilDate = startDate.setDate(startDate.getDate() + 7 * interval + 1);
	} else if (freq === "MONTHLY" || freq === "MONTHLY_N") {
		startDate.setMonth(startDate.getMonth() + interval);
		untilDate = startDate.setDate(startDate.getDate() + 1);
	} else if (freq === "YEARLY" || freq === "YEARLY_N") {
		startDate.setFullYear(startDate.getFullYear() + interval);
		untilDate = startDate.setDate(startDate.getDate() + 1);
	}
	return new Date(untilDate).toISOString().slice(0, 10);
};

export const setByweekday = (weekNum, prev, checked) => {
	if (!checked) {
		return prev.filter((num) => num !== weekNum);
	}
	if (prev.indexOf(weekNum) === -1) {
		prev.push(weekNum);
	}
	return prev;
};

export const calculateIsAllDay = (startDate, startTime, endDate, endTime) =>
	startDate === endDate && startTime === "00:00" && endTime === "23:59";
