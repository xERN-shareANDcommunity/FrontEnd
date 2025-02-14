import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import moment from "moment";

import FormModal from "@/components/Common/Modal/FormModal/FormModal";
import { SCHEDULE_MODAL_TYPE } from "@/constants/uiConstants";
import {
	createSchedule,
	updateSchedule,
} from "@/features/schedule/schedule-service.js";
import { closeModal, setIsLoading } from "@/features/ui/ui-slice";
import {
	calculateIsAllDay,
	calculateMinUntilDateString,
	getInitializeEndTimeAfterChangeStartTime,
	getSchedule,
	setByweekday,
	validateByweekday,
	validateDateTimeIsValid,
	validateInterval,
	validateUntil,
} from "@/utils/calendarUtils";
import { convertScheduleDataToFormValue } from "@/utils/convertSchedule";

import DateAndTime from "./DateAndTime";
import Repeat from "./Repeat/Repeat";
import RepeatDetail from "./RepeatDetail/RepeatDetail";
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
				endTime: getInitializeEndTimeAfterChangeStartTime(
					prev.startDate,
					prev.endDate,
					value,
					prev.endTime,
				),
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

	const handleSubmit = () => {
		// form 유효성 검사
		if (
			!validateDateTimeIsValid(
				formValues.startDate,
				formValues.startTime,
				formValues.endDate,
				formValues.endTime,
			) ||
			!validateInterval(formValues) ||
			!validateByweekday(formValues) ||
			!validateUntil(formValues) ||
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
					isProposal={false}
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
				<FooterDiv>
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
