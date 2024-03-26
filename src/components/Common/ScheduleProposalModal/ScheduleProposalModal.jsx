import React, { useRef, useState } from "react";

import _ from "lodash";
import moment from "moment";

import {
	ProposalParamsWrapperDiv,
	RadiosDiv,
} from "./ScheduleProposalModal.styles";
import FormModal from "../Modal/FormModal/FormModal";
import {
	DetailTextarea,
	ScheduleModalLayoutDiv,
	SubmitButton,
	TitleInput,
} from "../ScheduleModal.Shared.styles";

const initialFormValues = {
	title: "",
	content: "",

	isAllDay: false,
	freq: "NONE",
	interval: "",
	byweekday: [],
	until: "",
};

const ScheduleProposalModal = () => {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [isMultiple, setIsMultiple] = useState(false);
	const prevFormValue = useRef(initialFormValues);
	const proposalParams = {
		startDate: moment().format("YYYY-MM-DD"),
		endDate: null,
		minDuration: null,
	};

	const checkIsEmpty = () => {
		const trimmedFormValues = {
			...formValues,
			title: formValues.title.trim(),
			content: formValues.content.trim(),
		};
		return _.isEqual(trimmedFormValues, prevFormValue.current);
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
				<RadiosDiv>
					<label htmlFor="single">
						<input
							type="radio"
							id="single"
							checked={!isMultiple}
							onChange={() => setIsMultiple(false)}
						/>
						단일 날짜
					</label>
					<label htmlFor="multiple">
						<input
							type="radio"
							id="multiple"
							checked={isMultiple}
							onChange={() => setIsMultiple(true)}
						/>
						여러 날짜
					</label>
				</RadiosDiv>
				<ProposalParamsWrapperDiv>
					<div className="content">
						<h3>일정 추천</h3>
						<button type="button">
							{!proposalParams.endDate
								? "기간"
								: `${proposalParams.startDate}~${proposalParams.endDate}`}
						</button>
						<button type="button">
							{proposalParams.minDuration
								? `${proposalParams.minDuration}`
								: "시간"}
						</button>
					</div>
					<button
						type="button"
						disabled={
							!proposalParams.startDate ||
							!proposalParams.endDate ||
							!proposalParams.minDuration
						}
					>
						추천받기
					</button>
				</ProposalParamsWrapperDiv>
				<SubmitButton onClick={() => {}} disabled={true}>
					저장하기
				</SubmitButton>
			</ScheduleModalLayoutDiv>
		</FormModal>
	);
};

export default ScheduleProposalModal;
