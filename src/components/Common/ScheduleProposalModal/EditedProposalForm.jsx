import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import _ from "lodash";
import moment from "moment";

import { BackArrowIcon } from "@/constants/iconConstants";
import { changeRecommendedProposal } from "@/features/schedule/schedule-slice";
import {
	calculateIsAllDay,
	calculateMinUntilDateString,
	setByweekday,
} from "@/utils/calendarUtils";

import DateAndTime from "../ScheduleModal/DateAndTime";
import Repeat from "../ScheduleModal/Repeat/Repeat";
import RepeatDetail, {
	getRecurringString,
} from "../ScheduleModal/RepeatDetail/RepeatDetail";
import {
	AllDayCheckBoxDiv,
	FooterDiv,
	RepeatContainerDiv,
} from "../ScheduleModal/ScheduleModal.styles";
import { SubmitButton } from "../ScheduleModal.Shared.styles";

const initialFormValues = {
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

const EditedProposalForm = ({ index, onClose }) => {
	const dispatch = useDispatch();
	const recommendedScheduleProposals = useSelector(
		({ schedule }) => schedule.recommendedScheduleProposals,
	);
	const prevFormValue = useRef(
		recommendedScheduleProposals[index] || initialFormValues,
	);

	const [formValues, setFormValues] = useState(
		recommendedScheduleProposals[index] || initialFormValues,
	);

	useEffect(() => {
		prevFormValue.current =
			recommendedScheduleProposals[index] || initialFormValues;
		setFormValues(recommendedScheduleProposals[index] || initialFormValues);
	}, [recommendedScheduleProposals, index]);

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
		return _.isEqual(formValues, prevFormValue.current);
	};
	// valdate when change event occurs
	const checkFormIsFilledOrChanged = () => {
		if (checkIsEmpty()) {
			return false;
		}

		return (
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

	const isUniqueProposalForm = () => {
		const doesProposalAlreadyExist = recommendedScheduleProposals.some(
			(proposal) => {
				const copiedProposal = { ...proposal, byweekday: undefined };
				const copiedFormValues = { ...formValues, byweekday: undefined };
				const byweekday1 = [...proposal.byweekday];
				const byweekday2 = [...formValues.byweekday];
				byweekday1.sort();
				byweekday2.sort();
				return (
					_.isEqual(copiedProposal, copiedFormValues) &&
					_.isEqual(byweekday1, byweekday2)
				);
			},
		);
		if (doesProposalAlreadyExist) {
			toast.error("이미 동일한 일정 후보가 존재합니다.");
			return false;
		}

		return true;
	};

	const handleSubmit = () => {
		// form 유효성 검사
		if (
			!checkTimeIsValid() ||
			!checkIntervalIsValid() ||
			!checkByweekdayIsValid() ||
			!checkUntilIsValid() ||
			!isUniqueProposalForm()
		) {
			return;
		}

		// 일정 저장 로직
		dispatch(changeRecommendedProposal({ formValues, index }));

		// 폼 초기화
		setFormValues(initialFormValues);

		// 메뉴 닫기
		onClose();
	};

	const handleCancelClick = () => {
		onClose();
		// reset
		prevFormValue.current = initialFormValues;
		setFormValues(initialFormValues);
	};

	return (
		<div>
			<div>
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
					<SubmitButton
						onClick={handleSubmit}
						disabled={!checkFormIsFilledOrChanged()}
					>
						저장하기
					</SubmitButton>
					<button
						type="button"
						onClick={handleCancelClick}
						data-testid="editProposalForm-backButton"
					>
						<BackArrowIcon />
					</button>
				</FooterDiv>
			</div>
		</div>
	);
};

export default EditedProposalForm;
