import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import _ from "lodash";
import moment from "moment";

import { getScheduleProposals } from "@/features/schedule/schedule-service";
import { getTimeString } from "@/utils/calendarUtils";

import DurationPicker from "./DurationPicker/DurationPicker";
import {
	ProposalParamsWrapperDiv,
	RecommendedProposalsDiv,
} from "./ScheduleProposalModal.styles";
import FormModal from "../Modal/FormModal/FormModal";
import DateAndTime from "../ScheduleModal/DateAndTime";
import {
	DetailTextarea,
	LabelH4,
	ScheduleModalLayoutDiv,
	SubmitButton,
	TitleInput,
} from "../ScheduleModal.Shared.styles";

const initialFormValues = {
	title: "",
	content: "",

	selectedRecommendationIndexes: [],
};

const ScheduleProposalModal = () => {
	const prevFormValue = useRef(initialFormValues);
	const dispatch = useDispatch();
	const recommendedScheduleProposals = useSelector(
		({ schedule }) => schedule.recommendedScheduleProposals,
	);
	const [formValues, setFormValues] = useState(initialFormValues);
	const [proposalParams, setProposalParams] = useState({
		startDateStr: moment().format("YYYY-MM-DD"),
		startTimeStr: moment().format("HH:mm"),
		endDateStr: moment().format("YYYY-MM-DD"),
		endTimeStr: moment().format("HH:mm"),
		minDuration: 60, // 분
	});

	const handleDateValueChange = (date, id) => {
		const value = moment(date).format("YYYY-MM-DD");

		if (id === "strtDate") {
			setProposalParams((prev) => ({ ...prev, startDateStr: value }));
		} else if (id === "endDate") {
			setProposalParams((prev) => ({
				...prev,
				startDateStr: prev.startDateStr > value ? value : prev.startDateStr,
				endDateStr: value,
			}));
		}
	};

	const handleTimeValueChange = (value, id) => {
		if (id === "startTime") {
			setProposalParams((prev) => ({
				...prev,
				startTimeStr: value,
				endTimeStr:
					prev.startDateStr === prev.endDateStr && value >= prev.endTimeStr
						? value
						: prev.endTime,
			}));
		} else if (id === "endTime") {
			setProposalParams((prev) => ({
				...prev,
				endTimeStr: value,
			}));
		}
	};

	const handleGettingProposal = () => {
		const checkTimeIsValid = () => {
			if (proposalParams.startDateStr < proposalParams.endDateStr) {
				return true;
			}

			if (proposalParams.startDateStr === proposalParams.endDateStr) {
				if (proposalParams.startTimeStr < proposalParams.endTimeStr) {
					return true;
				}

				toast.error("시작 시간은 종료 시간보다 빨라야 합니다.");
				return false;
			}

			toast.error("종료 날짜는 시작 날짜보다 동일하거나 빠를 수 없습니다.");
			return false;
		};

		if (checkTimeIsValid()) {
			dispatch(getScheduleProposals(proposalParams));
		}
	};

	const checkIsEmpty = () => {
		const trimmedFormValues = {
			...formValues,
			title: formValues.title.trim(),
			content: formValues.content.trim(),
		};
		return _.isEqual(trimmedFormValues, prevFormValue.current);
	};

	const handleSelectRecommendation = (index) => {
		setFormValues((prev) => {
			const isAlreadySelected =
				prev.selectedRecommendationIndexes.indexOf(index) !== -1;

			return {
				...prev,
				selectedRecommendationIndexes: isAlreadySelected
					? prev.selectedRecommendationIndexes.filter((el) => el !== index)
					: [...prev.selectedRecommendationIndexes, index],
			};
		});
	};

	return (
		<FormModal isEmpty={checkIsEmpty()}>
			<ScheduleModalLayoutDiv data-testid="ScheduleProposalModal">
				<h2>일정 후보 등록</h2>
				<TitleInput
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, title: e.target.value }))
					}
				/>
				<DetailTextarea
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, content: e.target.value }))
					}
				/>
				<ProposalParamsWrapperDiv>
					<DateAndTime
						isProposal={true}
						startDate={proposalParams.startDateStr}
						startTime={proposalParams.startTimeStr}
						endDate={proposalParams.endDateStr}
						endTime={proposalParams.endTimeStr}
						onDateChange={handleDateValueChange}
						onTimeChange={handleTimeValueChange}
					/>
					<LabelH4>일정 최소 구간</LabelH4>
					<div className="durationAndSubmit">
						<DurationPicker
							value={proposalParams.minDuration}
							onChange={(value) =>
								setProposalParams((prev) => ({ ...prev, minDuration: value }))
							}
						/>
						<button
							type="button"
							disabled={
								!proposalParams.startDateStr ||
								!proposalParams.startTimeStr ||
								!proposalParams.endDateStr ||
								!proposalParams.endTimeStr ||
								!proposalParams.minDuration
							}
							onClick={handleGettingProposal}
						>
							추천받기
						</button>
					</div>
				</ProposalParamsWrapperDiv>
				<RecommendedProposalsDiv>
					{recommendedScheduleProposals.map((proposals, index) => (
						<div key={proposals.startDateTime}>
							<div>
								<button
									type="button"
									onClick={() => handleSelectRecommendation(index)}
								>
									{formValues.selectedRecommendationIndexes.indexOf(index) !==
										-1 && <div />}
								</button>
								<span>
									{getTimeString(
										proposals.startDateTime,
										proposals.endDateTime,
									)}
								</span>
							</div>
							<button type="button">반복</button>
						</div>
					))}
					<button type="button" onClick={() => {}}>
						직접 만들기
					</button>
				</RecommendedProposalsDiv>
				<SubmitButton onClick={() => {}} disabled={true}>
					저장하기
				</SubmitButton>
			</ScheduleModalLayoutDiv>
		</FormModal>
	);
};

export default ScheduleProposalModal;
