import React, { useRef, useState } from "react";

import _ from "lodash";
import moment from "moment";

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
			<ScheduleModalLayoutDiv>
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
				<div>
					<span>단일 날짜</span>
					<span>여러 날짜</span>
				</div>
				<SubmitButton onClick={() => {}} disabled={true}>
					저장하기
				</SubmitButton>
			</ScheduleModalLayoutDiv>
		</FormModal>
	);
};

export default ScheduleProposalModal;
