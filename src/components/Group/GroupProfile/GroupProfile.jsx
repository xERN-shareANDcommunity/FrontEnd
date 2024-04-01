import React from "react";

import {
	ContainerDiv,
	TopDiv,
	MiddleDiv,
	MiddleInnerDiv,
} from "./GroupProfile.styles";
import GroupProfileButton from "./GroupProfileButton";

const GroupProfile = ({
	groupInfo,
	isGroupMember,
	isGroupLeader,
	isManaging,
	groupMemberList,
	isGroupRequest,
}) => {
	return (
		<ContainerDiv>
			<TopDiv>
				<img src={groupInfo.information.group.image} alt="groupImg" />
				<h3>{groupInfo.information.group.name}</h3>
				<p>{groupInfo.information.group.description}</p>
			</TopDiv>
			<MiddleDiv>
				<MiddleInnerDiv>
					<h3>{groupMemberList.length}</h3>
					<h4>그룹원</h4>
				</MiddleInnerDiv>
				<MiddleInnerDiv>
					<h3>{groupInfo.information.group.feedCount.toLocaleString()}</h3>
					<h4>작성된 피드</h4>
				</MiddleInnerDiv>
			</MiddleDiv>
			<GroupProfileButton
				groupInfo={groupInfo}
				isGroupMember={isGroupMember}
				isGroupLeader={isGroupLeader}
				isManaging={isManaging}
				isGroupRequest={isGroupRequest}
			/>
		</ContainerDiv>
	);
};

export default GroupProfile;
