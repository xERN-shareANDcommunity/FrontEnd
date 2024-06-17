import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import GroupInviteLink from "@/components/Common/GroupInviteLink/GroupInviteLink";
import useOutsideClick from "@/hooks/useOutsideClick";

import { RelativeDiv } from "./GroupInviteButton.styles";

const GroupInviteButton = () => {
	const userGroupList = useSelector((state) => state.user.userGroupList);
	const currentGroupId = useSelector(
		(state) => state.schedule.currentGroupScheduleId,
	);
	const [isOpen, setIsOpen] = useState(false);

	const wrapperRef = useRef();

	useOutsideClick(wrapperRef, () => setIsOpen(false));

	const groupName = userGroupList.find(
		(userGroup) => userGroup.groupId === currentGroupId,
	)?.name;

	return (
		<RelativeDiv ref={wrapperRef}>
			<button type="button" onClick={() => setIsOpen((prev) => !prev)}>
				사용자 초대
			</button>
			{isOpen && currentGroupId && (
				<GroupInviteLink
					groupId={currentGroupId}
					groupName={groupName}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</RelativeDiv>
	);
};

export default GroupInviteButton;
