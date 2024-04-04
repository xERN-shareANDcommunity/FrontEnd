import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

import useOutsideClick from "@/hooks/useOutsideClick";

import { RelativeDiv } from "./DurationPicker.styles";

const getHours = (minutes) => Math.floor(minutes / 60);

const convertMinutesToDurationString = (minutes) => {
	if (minutes < 60) return `${minutes}분`;
	if (minutes % 60 === 0) return `${minutes / 60}시간`;
	return `${getHours(minutes)}시간 ${minutes % 60}분`;
};

const DurationPicker = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [hours, setHours] = useState(getHours(value));
	const [minutes, setMinutes] = useState(value % 60);

	const pickerRef = useRef();

	useOutsideClick(pickerRef, () => {
		setMinutes(value % 60);
		setHours(getHours(value));
		setIsOpen(false);
	});

	const handleSubmit = () => {
		if (!minutes && !hours) {
			toast.error("일정 최소 구간은 1분 이상이어야 합니다.");
		} else {
			setIsOpen(false);
			onChange(minutes + hours * 60);
		}
	};
	return (
		<RelativeDiv ref={pickerRef}>
			<button type="button" onClick={() => setIsOpen((prev) => !prev)}>
				{convertMinutesToDurationString(value)}
			</button>
			{isOpen && (
				<div>
					<div>
						<div className="hours">
							{Array.from({ length: 25 }, (_, idx) => idx).map((el) => (
								<button
									key={el}
									type="button"
									className={hours === el ? "selected" : ""}
									disabled={minutes === 0 && el === 0}
									onClick={() => setHours(el)}
								>
									{el}
								</button>
							))}
						</div>
						<div className="minutes">
							{Array.from({ length: 60 }, (_, idx) => idx).map((el) => (
								<button
									key={el}
									type="button"
									className={minutes === el ? "selected" : ""}
									disabled={hours === 0 && el === 0}
									onClick={() => setMinutes(el)}
								>
									{el}
								</button>
							))}
						</div>
					</div>
					<div>
						<button type="button" onClick={() => setIsOpen(false)}>
							취소
						</button>
						<button type="button" onClick={handleSubmit} className="confirm">
							확인
						</button>
					</div>
				</div>
			)}
		</RelativeDiv>
	);
};

export default DurationPicker;
