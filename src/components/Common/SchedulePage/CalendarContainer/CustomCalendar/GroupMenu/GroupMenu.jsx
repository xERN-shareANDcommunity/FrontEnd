import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { SCHEDULE_COLORS } from "@/constants/calendarConstants";
import { CrownIcon } from "@/constants/iconConstants";
import { getGroupMembers } from "@/utils/calendarUtils";

import ExtraGroupMembers from "./ExtraGroupMembers/ExtraGroupMembers";
import GroupInviteButton from "./GroupInviteButton/GroupInviteButton";
import { GroupMemberAvatar, GroupMenuDiv } from "./GroupMenu.styles";
import GroupSelect from "./GroupSelect/GroupSelect";

const GroupMenu = () => {
	const userId = useSelector((state) => state.auth.user.userId);
	const { isUserGroupFetching, currentGroupScheduleId } = useSelector(
		(state) => state.schedule,
	);
	const [groupMembers, setGroupMembers] = useState([]);

	const isUserOwner = Boolean(
		groupMembers.find((groupMember) => groupMember.member.userId === userId)
			?.accessLevel === "owner",
	);
	useEffect(() => {
		if (currentGroupScheduleId) {
			getGroupMembers((data) => setGroupMembers(data), currentGroupScheduleId);
		}
	}, [currentGroupScheduleId]);

	if (isUserGroupFetching) {
		return (
			<GroupMenuDiv>
				<div className="loading">
					<div className="shimmer" />
				</div>
			</GroupMenuDiv>
		);
	}

	return (
		<GroupMenuDiv role="menu">
			<div className="groupMembers">
				{groupMembers.slice(0, 5).map(({ member }, index) => (
					<Fragment key={member.userId}>
						<GroupMemberAvatar
							data-testid={`groupMemberAvatar-${!index ? "owner" : "member"}`}
							priority={groupMembers.length - index}
							style={{ border: `1px solid ${SCHEDULE_COLORS[index]}` }}
						>
							{index === 0 && <CrownIcon />}
							<img
								src={member.image}
								alt={`${member.nickname}님의 이미지`}
								width={26}
								height={26}
							/>
						</GroupMemberAvatar>
					</Fragment>
				))}
				{groupMembers.length > 5 && (
					<ExtraGroupMembers extraMembers={groupMembers.slice(5)} />
				)}
			</div>
			{isUserOwner && <GroupInviteButton />}
			{currentGroupScheduleId && <GroupSelect />}
		</GroupMenuDiv>
	);
};

export default GroupMenu;
