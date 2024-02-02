import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DownArrowIcon } from "@/constants/iconConstants";
import { changeCurrentGroupId } from "@/features/schedule/schedule-slice";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
	GroupSelectWrapperDiv,
	PickerDiv,
	SelectButton,
} from "./GroupSelect.styles";

const GroupSelect = () => {
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
					{userGroupList.map((obj) => (
						<button
							key={obj.groupId}
							type="button"
							className={obj.groupId === currentGroupId ? "selected" : ""}
							value={obj.groupId}
							onClick={handleOptionClick}
						>
							{obj.name}
						</button>
					))}
				</PickerDiv>
			)}
		</GroupSelectWrapperDiv>
	);
};

export default GroupSelect;
