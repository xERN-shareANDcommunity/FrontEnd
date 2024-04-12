import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import _ from "lodash";
import moment from "moment";

import FormModal from "@/components/Common/Modal/FormModal/FormModal";
import { SCHEDULE_MODAL_TYPE } from "@/constants/uiConstants";
import {
	createSchedule,
	updateSchedule,
} from "@/features/schedule/schedule-service.js";
import { closeModal, setIsLoading } from "@/features/ui/ui-slice";
import { getSchedule } from "@/utils/calendarUtils";
import { convertScheduleDataToFormValue } from "@/utils/convertSchedule";

import DateAndTime from "./DateAndTime";
import Repeat from "./Repeat/Repeat";
import RepeatDetail, { getRecurringString } from "./RepeatDetail/RepeatDetail";
import {
	AllDayCheckBoxDiv,
	RepeatContainerDiv,
	FooterDiv,
} from "./ScheduleModal.styles";
import {
	DetailTextarea,
	ScheduleModalLayoutDiv,
	TitleInput,
	SubmitButton,
} from "../ScheduleModal.Shared.styles";

const initialFormValues = {
	title: "",
	content: "",
	startDate: moment().format("YYYY-MM-DD"),
	startTime: moment().format("HH:mm"),
	endDate: moment().format("YYYY-MM-DD"),
	endTime: moment().format("HH:mm"),
	isAllDay: false,
	freq: "NONE",
	interval: "",
	byweekday: [],
	until: "",
};

const calculateMinUntilDateString = (
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

const setByweekday = (weekNum, prev, checked) => {
	if (!checked) {
		return prev.filter((num) => num !== weekNum);
	}
	if (prev.indexOf(weekNum) === -1) {
		prev.push(weekNum);
	}
	return prev;
};

const calculateIsAllDay = (startDate, startTime, endDate, endTime) =>
	startDate === endDate && startTime === "00:00" && endTime === "23:59";

const ScheduleModal = () => {
	const dispatch = useDispatch();
	// previous form value to compare
	const prevFormValue = useRef(initialFormValues);
	// state
	const { scheduleModalMode, scheduleModalId, isLoading } = useSelector(
		(state) => state.ui,
	);
	const [formValues, setFormValues] = useState(initialFormValues);
	// value
	const isCreateMode = scheduleModalMode === SCHEDULE_MODAL_TYPE.CREATE;
	const isEditMode = scheduleModalMode === SCHEDULE_MODAL_TYPE.EDIT;
	const isViewMode = scheduleModalMode === SCHEDULE_MODAL_TYPE.VIEW;

	const getModalTitle = () => {
		if (isCreateMode) return "일정 추가";

		if (isEditMode) return "일정 수정";

		if (isViewMode) return "일정 정보";

		return new Error("올바르지 않은 모달 타입입니다.");
	};

	// handle date change
	const handleDateValueChange = (date, id) => {
		const value = moment(date).format("YYYY-MM-DD");

		if (id === "startDate") {
			setFormValues((prev) => {
				const endDate =
					!prev.endDate || prev.endDate < value ? value : prev.endDate;
				const startDateWeekNum = new Date(value).getDay();
				const byweekday =
					prev.freq.startsWith("WEEKLY") &&
					prev.byweekday.indexOf(startDateWeekNum) === -1
						? [startDateWeekNum]
						: prev.byweekday;
				return {
					...prev,
					startDate: value,
					endDate,
					byweekday,
					until: calculateMinUntilDateString(
						value,
						prev.freq,
						prev.interval,
						prev.until === "",
					),
					isAllDay: calculateIsAllDay(
						value,
						prev.startTime,
						endDate,
						prev.endTime,
					),
				};
			});
		} else if (id === "endDate") {
			setFormValues((prev) => {
				const startDate =
					!prev.startDate || prev.startDate > value ? value : prev.startDate;
				const startDateWeekNum = new Date(startDate).getDay();
				const byweekday =
					prev.freq.startsWith("WEEKLY") &&
					prev.byweekday.indexOf(startDateWeekNum) === -1
						? [startDateWeekNum]
						: prev.byweekday;
				return {
					...prev,
					startDate,
					byweekday,
					endDate: value,
					isAllDay: calculateIsAllDay(
						startDate,
						prev.startTime,
						value,
						prev.endTime,
					),
				};
			});
		}
	};
	// handle time change
	const handleTimeValueChange = (value, id) => {
		if (id === "startTime") {
			setFormValues((prev) => ({
				...prev,
				startTime: value,
				endTime:
					prev.startDate === prev.endDate && value >= prev.endTime
						? value
						: prev.endTime,
				isAllDay: calculateIsAllDay(
					prev.startDate,
					value,
					prev.endDate,
					prev.endTime,
				),
			}));
		} else if (id === "endTime") {
			setFormValues((prev) => ({
				...prev,
				endTime: value,
				isAllDay: calculateIsAllDay(
					prev.startDate,
					prev.startTime,
					prev.endDate,
					value,
				),
			}));
		}
	};
	// handle isAllDay change
	const handleIsAllDayValueChange = (event) => {
		const { checked } = event.target;
		setFormValues((prev) => ({
			...prev,
			isAllDay: checked,
			endDate: checked ? prev.startDate : prev.endDate,
			startTime: checked ? "00:00" : prev.startTime,
			endTime: checked ? "23:59" : prev.endTime,
		}));
	};
	// handle freq change
	const handleFreqValueChange = (event) => {
		const {
			target: { value },
		} = event;
		setFormValues((prev) => ({
			...prev,
			freq: value,
			interval: value !== "NONE" ? 1 : "",
			until: calculateMinUntilDateString(
				prev.startDate,
				value,
				1,
				Boolean(!prev.until),
			),
			byweekday: value.startsWith("WEEKLY")
				? [new Date(prev.startDate).getDay()]
				: [],
		}));
	};
	// handle interval change
	const handleIntervalValueChange = (event) => {
		const {
			target: { value },
		} = event;

		if (Number.isNaN(Number(value))) return;

		setFormValues((prev) => ({
			...prev,
			interval: Number(value) >= 0 ? value : 1,
			until: calculateMinUntilDateString(
				prev.startDate,
				prev.freq,
				value,
				Boolean(!prev.until),
			),
		}));
	};
	// handle byweekday change
	const handleByweekdayValueChange = ({ target: { checked } }, weekNum) => {
		setFormValues((prev) => ({
			...prev,
			byweekday:
				new Date(prev.startDate).getDay() === weekNum
					? prev.byweekday
					: setByweekday(weekNum, prev.byweekday, checked),
		}));
	};
	const toggleUntilOrNot = (event) => {
		const {
			target: { value },
		} = event;
		setFormValues((prev) => ({
			...prev,
			until: calculateMinUntilDateString(
				prev.startDate,
				prev.freq,
				prev.interval,
				value === "NO",
			),
		}));
	};
	// handle until change
	const handleUntilValueChange = (date) => {
		const value = moment(date).format("YYYY-MM-DD");
		setFormValues((prev) => ({
			...prev,
			until: value,
		}));
	};

	const checkIsEmpty = () => {
		const trimmedFormValues = {
			...formValues,
			title: formValues.title.trim(),
			content: formValues.content.trim(),
		};
		return _.isEqual(trimmedFormValues, prevFormValue.current);
	};
	// valdate when change event occurs
	const checkFormIsFilledOrChanged = () => {
		if (checkIsEmpty()) {
			return false;
		}

		return (
			formValues.title.trim() !== "" &&
			formValues.content.trim() !== "" &&
			formValues.startDate !== "" &&
			formValues.startTime !== "" &&
			formValues.endDate !== "" &&
			formValues.endTime !== "" &&
			(formValues.freq === "NONE" || formValues.interval > 0) &&
			(formValues.freq === "WEEKLY" ? formValues.byweekday.length > 0 : true)
		);
	};

	// validate form values when submit event occurs
	// validate Date and Time
	const checkTimeIsValid = () => {
		if (formValues.startDate < formValues.endDate) {
			return true;
		}

		if (formValues.startDate === formValues.endDate) {
			if (formValues.startTime < formValues.endTime) {
				return true;
			}

			toast.error("시작 시간은 종료 시간보다 빨라야 합니다.");
			return false;
		}

		toast.error("종료 날짜는 시작 날짜보다 동일하거나 빠를 수 없습니다.");
		return false;
	};
	// validate interval
	const checkIntervalIsValid = () => {
		if (
			formValues.freq !== "NONE" &&
			(!Number.isInteger(Number(formValues.interval)) ||
				Number(formValues.interval) <= 0)
		) {
			toast.error("반복 간격은 0보다 큰 자연수여야 합니다");
			return false;
		}
		if (formValues.startDate === formValues.endDate) {
			if (formValues.startTime < formValues.endTime) {
				return true;
			}
			toast.error(
				"반복 요일은 무조건 일정 시작 날짜에 해당하는 요일을 포함해야 합니다.",
			);
			return false;
		}
		return true;
	};
	// validate byweekday
	const checkByweekdayIsValid = () => {
		if (!formValues.freq.startsWith("WEEKLY")) {
			return true;
		}

		if (
			formValues.byweekday.indexOf(new Date(formValues.startDate).getDay()) ===
			-1
		) {
			toast.error(
				"반복 요일은 무조건 일정 시작 날짜에 해당하는 요일을 포함해야 합니다.",
			);
			return false;
		}

		return true;
	};
	// validate until
	const checkUntilIsValid = () => {
		if (formValues.until && formValues.startDate >= formValues.until) {
			toast.error("반복 종료 일자는 일정 시작 날짜보다 커야 합니다.");
			return false;
		}

		if (
			!formValues.until ||
			formValues.until >=
				calculateMinUntilDateString(
					formValues.startDate,
					formValues.freq,
					formValues.interval,
				)
		) {
			return true;
		}

		toast.error(
			`반복 종료 일자는 최소 ${formValues.interval}${getRecurringString(
				formValues.freq,
			)} 이후여야 합니다.`,
		);
		return false;
	};

	const handleSubmit = () => {
		// form 유효성 검사
		if (
			!checkTimeIsValid() ||
			!checkIntervalIsValid() ||
			!checkByweekdayIsValid() ||
			!checkUntilIsValid() ||
			isViewMode
		) {
			return;
		}

		// 일정 저장 로직
		if (isCreateMode) {
			dispatch(createSchedule(formValues));
		} else {
			dispatch(updateSchedule({ schedule: formValues, id: scheduleModalId }));
		}

		// 폼 초기화
		setFormValues(initialFormValues);

		// 메뉴 닫기
		dispatch(closeModal());
	};

	useEffect(() => {
		if (!isCreateMode) {
			getSchedule(scheduleModalId, (schedule) => {
				dispatch(setIsLoading(false));
				setFormValues(convertScheduleDataToFormValue(schedule));
				prevFormValue.current = convertScheduleDataToFormValue(schedule);
			});
		} else {
			dispatch(setIsLoading(false));
		}

		return () => {
			dispatch(closeModal());
		};
	}, [isCreateMode, scheduleModalId]);

	useEffect(() => {
		// set byweekday
		if (
			!(formValues.freq === "WEEKLY" || formValues.freq === "WEEKLY_N") ||
			!formValues.startDate
		) {
			return;
		}
		const weekNum = new Date(formValues.startDate).getDay();
		setFormValues((prev) => ({
			...prev,
			byweekday:
				prev.byweekday.indexOf(weekNum) === -1 ? [weekNum] : prev.byweekday,
		}));
	}, [formValues.startDate, formValues.freq]);

	useEffect(() => {
		if (isEditMode) {
			getSchedule(scheduleModalId, (schedule) => {
				dispatch(setIsLoading(false));
				setFormValues(convertScheduleDataToFormValue(schedule));
				prevFormValue.current = convertScheduleDataToFormValue(schedule);
			});
		} else {
			dispatch(setIsLoading(false));
		}

		return () => {
			dispatch(closeModal());
		};
	}, [isEditMode, scheduleModalId]);

	return (
		<FormModal isEmpty={checkIsEmpty()}>
			<ScheduleModalLayoutDiv>
				<h2>{getModalTitle()}</h2>
				<TitleInput
					id="title"
					type="text"
					placeholder="일정 제목"
					value={formValues.title}
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, title: e.target.value }))
					}
					disabled={isLoading || isViewMode}
				/>
				<DetailTextarea
					id="content"
					rows="5"
					placeholder="상세 내용"
					value={formValues.content}
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, content: e.target.value }))
					}
					disabled={isLoading || isViewMode}
				/>
				<DateAndTime
					startDate={formValues.startDate}
					startTime={formValues.startTime}
					endDate={formValues.endDate}
					endTime={formValues.endTime}
					onDateChange={handleDateValueChange}
					onTimeChange={handleTimeValueChange}
				/>
				{formValues.startDate && (
					<AllDayCheckBoxDiv>
						<label>
							<input
								type="checkbox"
								onChange={handleIsAllDayValueChange}
								checked={formValues.isAllDay}
								disabled={isLoading || isViewMode}
							/>
							하루 종일
						</label>
					</AllDayCheckBoxDiv>
				)}
				<RepeatContainerDiv>
					<Repeat
						freq={formValues.freq}
						until={formValues.until}
						minUntil={calculateMinUntilDateString(
							formValues.startDate,
							formValues.freq,
							formValues.interval,
						)}
						onFreqChange={handleFreqValueChange}
						onUntilChange={handleUntilValueChange}
						onToggleUntilOrNot={toggleUntilOrNot}
					/>
					<RepeatDetail
						isWeekly={
							formValues.freq === "WEEKLY" || formValues.freq === "WEEKLY_N"
						}
						isWithN={formValues.freq.endsWith("N")}
						freq={formValues.freq}
						interval={formValues.interval}
						byweekday={formValues.byweekday}
						onByweekdayChange={handleByweekdayValueChange}
						onIntervalChange={handleIntervalValueChange}
					/>
				</RepeatContainerDiv>
				<FooterDiv
					isAllDayCheckboxDisplayed={
						formValues.startDate && !formValues.endDate
					}
				>
					{isViewMode || (
						<SubmitButton
							onClick={handleSubmit}
							disabled={!checkFormIsFilledOrChanged() || isLoading}
						>
							{isEditMode ? "수정하기" : "저장하기"}
						</SubmitButton>
					)}
				</FooterDiv>
			</ScheduleModalLayoutDiv>
		</FormModal>
	);
};

export default ScheduleModal;
