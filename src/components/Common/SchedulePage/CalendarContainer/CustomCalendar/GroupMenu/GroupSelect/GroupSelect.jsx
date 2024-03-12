import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SCHEDULE_COLORS } from "@/constants/calendarConstants";
import { DownArrowIcon } from "@/constants/iconConstants";
import { changeCurrentGroupId } from "@/features/schedule/schedule-slice";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
	GroupSelectWrapperDiv,
	PickerDiv,
	SelectButton,
} from "./GroupSelect.styles";

const GroupSelect = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const userGroupList = useSelector((state) => state.user.userGroupList);
	const currentGroupId = useSelector(
		(state) => state.schedule.currentGroupScheduleId,
	);
	const [isOpen, setIsOpen] = useState(false);

	const wrapperRef = useRef();

	useOutsideClick(wrapperRef, () => isOpen && setIsOpen(false));

	const handleOptionClick = (event) => {
		dispatch(changeCurrentGroupId(Number(event.target.value)));
		setIsOpen(false);
	};

	useEffect(() => {
		if (userGroupList.length > 0) {
			navigate("/personal", {
				state: {
					isRedirected: true,
				},
			});
		}
	}, [userGroupList]);

	return (
		<GroupSelectWrapperDiv ref={wrapperRef} role="combobox">
			<SelectButton
				type="button"
				className={isOpen ? "activated" : ""}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<span>
					{
						userGroupList[
							userGroupList.findIndex((obj) => obj.groupId === currentGroupId)
						].name
					}
				</span>
				<DownArrowIcon />
			</SelectButton>
			{isOpen && (
				<PickerDiv>
					{userGroupList.map((obj, index) => (
						<button
							key={obj.groupId}
							type="button"
							className={obj.groupId === currentGroupId ? "selected" : ""}
							value={obj.groupId}
							onClick={handleOptionClick}
							data-testid={obj.groupId}
						>
							<img
								src={obj.image}
								alt={`${obj.name} 그룹 이미지`}
								width={23}
								height={23}
								style={{
									border: `1px solid ${SCHEDULE_COLORS[index + 5]}`,
								}}
							/>
							<span>{obj.name}</span>
						</button>
					))}
				</PickerDiv>
			)}
		</GroupSelectWrapperDiv>
	);
};

export default GroupSelect;
