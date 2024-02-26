import React, { useRef, useState } from "react";

import _ from "lodash";
import moment from "moment";

import { RadiosDiv } from "./ScheduleProposalModal.styles";
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

const ScheduleProposalModal = () => {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [isMultiple, setIsMultiple] = useState(false);
	const prevFormValue = useRef(initialFormValues);

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
							onClick={() => setIsMultiple(false)}
						/>
						단일 날짜
					</label>
					<label htmlFor="multiple">
						<input
							type="radio"
							id="multiple"
							checked={isMultiple}
							onClick={() => setIsMultiple(true)}
						/>
						여러 날짜
					</label>
				</RadiosDiv>
				<SubmitButton onClick={() => {}} disabled={true}>
					저장하기
				</SubmitButton>
			</ScheduleModalLayoutDiv>
		</FormModal>
	);
};

export default ScheduleProposalModal;
