import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import _ from "lodash";
import moment from "moment";

import { FooterDiv } from "@/components/Common/ScheduleModal/ScheduleModal.styles";
import EditedProposalForm from "@/components/Common/ScheduleProposalModal/EditedProposalForm";
import { getScheduleProposals } from "@/features/schedule/schedule-service";
import { getTimeString } from "@/utils/calendarUtils";
import convertToUTC from "@/utils/convertToUTC";

import DurationPicker from "./DurationPicker/DurationPicker";
import {
	ProposalParamsWrapperDiv,
	RecommendedProposalsDiv,
	SliderWrapperDiv,
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

const initialProposalParams = {
	startDateStr: moment().format("YYYY-MM-DD"),
	startTimeStr: moment().format("HH:mm"),
	endDateStr: moment().format("YYYY-MM-DD"),
	endTimeStr: moment().format("HH:mm"),
	minDuration: 60, // 분
};

const ScheduleProposalModal = () => {
	const prevFormValue = useRef(initialFormValues);
	const dispatch = useDispatch();
	const recommendedScheduleProposals = useSelector(
		({ schedule }) => schedule.recommendedScheduleProposals,
	);

	const [formValues, setFormValues] = useState(initialFormValues);
	const [prevProposalParams, setPrevProposalParams] = useState(
		initialProposalParams,
	);
	const [proposalParams, setProposalParams] = useState(initialProposalParams);

	const [editiedProposalIndex, setEditiedProposalIndex] = useState(null); // 수정하는 건 뭔가, 새로 만들기의 경우 어떻게 해야 할까? null, -1, 그 외 인덱스

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

	const handleGettingProposal = async () => {
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

		if (checkTimeIsValid() && !_.isEqual(prevProposalParams, proposalParams)) {
			try {
				await dispatch(getScheduleProposals(proposalParams)).unwrap();
				setPrevProposalParams(proposalParams);
			} catch (error) {
				toast.error("일정 추천 중 오류가 발생했습니다.");
			}
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
				<SliderWrapperDiv>
					<div
						className={`slider ${
							// eslint-disable-next-line no-nested-ternary
							editiedProposalIndex === -1
								? "toLeft"
								: editiedProposalIndex !== null
								? "toRight"
								: ""
						}`}
					>
						<div>
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
											setProposalParams((prev) => ({
												...prev,
												minDuration: value,
											}))
										}
									/>
									<button
										type="button"
										disabled={_.isEqual(prevProposalParams, proposalParams)}
										onClick={handleGettingProposal}
									>
										추천받기
									</button>
								</div>
							</ProposalParamsWrapperDiv>
							<RecommendedProposalsDiv>
								{recommendedScheduleProposals.map((proposal, index) => (
									<div key={Object.values(proposal).join("")}>
										<div>
											<button
												type="button"
												onClick={() => handleSelectRecommendation(index)}
											>
												{formValues.selectedRecommendationIndexes.indexOf(
													index,
												) !== -1 && <div />}
											</button>
											<div>
												<span>
													{getTimeString(
														convertToUTC(
															proposal.startDate,
															proposal.startTime,
														),
														convertToUTC(proposal.endDate, proposal.endTime),
														proposal.isAllDay,
													)}
												</span>
												<span
													className={`freqIndicator ${
														proposal.freq !== "NONE" ? "active" : ""
													}`}
												>
													반복
												</span>
											</div>
										</div>
										<button
											type="button"
											className="edit"
											onClick={() => setEditiedProposalIndex(index)}
										>
											수정하기
										</button>
									</div>
								))}
								<button
									type="button"
									onClick={
										() =>
											setEditiedProposalIndex(
												recommendedScheduleProposals.length,
											) // 새로운 것 추가할 예정
									}
								>
									직접 만들기
								</button>
							</RecommendedProposalsDiv>
							<FooterDiv>
								<SubmitButton onClick={() => {}} disabled={true}>
									저장하기
								</SubmitButton>
							</FooterDiv>
						</div>
						<EditedProposalForm
							index={editiedProposalIndex}
							onClose={() => setEditiedProposalIndex(-1)}
						/>
					</div>
				</SliderWrapperDiv>
			</ScheduleModalLayoutDiv>
		</FormModal>
	);
};

export default ScheduleProposalModal;
