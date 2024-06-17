import React from "react";

import PropTypes from "prop-types";

import { LabelH3 } from "../../ScheduleModal.Shared.styles";
import CustomSelect from "../CustomSelect/CustomSelect";
import DatePicker from "../DatePicker";

const FREQ_OPTIONS = [
	{ value: "NONE", text: "반복 안함" },
	{ value: "DAILY", text: "매일" },
	{ value: "DAILY_N", text: "N일 간격" },
	{ value: "WEEKLY", text: "매주" },
	{ value: "WEEKLY_N", text: "N주 간격" },
	{ value: "MONTHLY", text: "매월" },
	{ value: "MONTHLY_N", text: "N개월 간격" },
	{ value: "YEARLY", text: "매년" },
	{ value: "YEARLY_N", text: "N년 간격" },
];

const UNTIL_OR_NOT_OPTIONS = [
	{ value: "NO", text: "안 함" },
	{ value: "YES", text: "날짜" },
];

const Repeat = ({
	freq,
	until,
	minUntil,
	onFreqChange,
	onToggleUntilOrNot,
	onUntilChange,
}) => {
	return (
		<div>
			<div>
				<LabelH3>반복 여부</LabelH3>
				<CustomSelect
					value={freq}
					onChange={onFreqChange}
					options={FREQ_OPTIONS}
				/>
			</div>
			{freq !== "NONE" && (
				<>
					<div>
						<LabelH3>반복 종료</LabelH3>
						<CustomSelect
							value={until === "" ? "NO" : "YES"}
							onChange={onToggleUntilOrNot}
							options={UNTIL_OR_NOT_OPTIONS}
						/>
					</div>
					{until !== "" && (
						<div>
							<LabelH3>반복 종료 날짜</LabelH3>
							<DatePicker
								id="until"
								minDateStr={minUntil}
								selectedStr={until}
								onChange={onUntilChange}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

Repeat.propTypes = {
	freq: PropTypes.oneOf([
		"NONE",
		"DAILY",
		"DAILY_N",
		"WEEKLY",
		"WEEKLY_N",
		"MONTHLY",
		"MONTHLY_N",
		"YEARLY",
		"YEARLY_N",
	]).isRequired,
	until: PropTypes.string.isRequired,
	minUntil: PropTypes.string.isRequired,
	onFreqChange: PropTypes.func.isRequired,
	onUntilChange: PropTypes.func.isRequired,
};

export default Repeat;
