import React, { useState } from "react";

import moment from "moment";
import PropTypes from "prop-types";

import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import {
	LabelH3,
	DateContainerDiv,
	DateDiv,
	LabelH4,
} from "../ScheduleModal.Shared.styles";

const TIME_PICKER_TYPE = {
	START: "start",
	END: "end",
	NONE: null,
};

const DateAndTime = ({
	isProposal = false,
	startDate,
	startTime,
	endDate,
	endTime,
	onDateChange,
	onTimeChange,
}) => {
	const minStartDate = moment(
		new Date(new Date().setMonth(new Date().getMonth() - 6)),
	).format("YYYY-MM-DD");
	const [openedTimePicker, setOpenedTimePicker] = useState(
		TIME_PICKER_TYPE.NONE,
	);

	return (
		<>
			<LabelH3>{isProposal ? "일정 추천" : "날짜 및 시간"}</LabelH3>
			{isProposal && <LabelH4>일정 검색 범위</LabelH4>}
			<DateContainerDiv>
				<DateDiv>
					<DatePicker
						id="startDate"
						minDateStr={minStartDate}
						selectedStr={startDate}
						onChange={(date) => onDateChange(date, "startDate")}
					/>
					<TimePicker
						initialValue={startTime}
						selected={startTime}
						onChange={(value) => onTimeChange(value, "startTime")}
						isOpen={openedTimePicker === TIME_PICKER_TYPE.START}
						onOpen={() => setOpenedTimePicker(TIME_PICKER_TYPE.START)}
						onClose={() => setOpenedTimePicker(TIME_PICKER_TYPE.NONE)}
					/>
				</DateDiv>
				~
				<DateDiv>
					<DatePicker
						id="startDate"
						minDateStr={startDate}
						selectedStr={endDate}
						onChange={(date) => onDateChange(date, "endDate")}
					/>
					<TimePicker
						initialValue={endTime}
						selected={endTime}
						min={startDate === endDate ? startTime : undefined}
						onChange={(value) => onTimeChange(value, "endTime")}
						isOpen={openedTimePicker === TIME_PICKER_TYPE.END}
						onOpen={() => setOpenedTimePicker(TIME_PICKER_TYPE.END)}
						onClose={() => setOpenedTimePicker(TIME_PICKER_TYPE.NONE)}
						isModalPositionTopLeft={false}
					/>
				</DateDiv>
			</DateContainerDiv>
		</>
	);
};

DateAndTime.propTypes = {
	isProposal: PropTypes.bool.isRequired,
	startDate: PropTypes.string.isRequired,
	startTime: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired,
	endTime: PropTypes.string.isRequired,
	onDateChange: PropTypes.func.isRequired,
	onTimeChange: PropTypes.func.isRequired,
};

export default DateAndTime;
