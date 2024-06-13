import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import GroupModalTrigger from "@/components/Common/GroupModal/GroupModalTrigger/GroupModalTrigger";
import GroupFeed from "@/components/Group/GroupFeed/GroupFeed";
import SecretFeed from "@/components/Group/GroupFeed/SecretFeed";
import UploadFeed from "@/components/Group/GroupFeed/UploadFeed";
import GroupManagement from "@/components/Group/GroupManagement/GroupManagement";
import GroupMember from "@/components/Group/GroupMember/GroupMember";
import GroupProfile from "@/components/Group/GroupProfile/GroupProfile";
import GroupTitle from "@/components/Group/GroupTitle/GroupTitle";
import { TAB_KEY, TAB_PARAM } from "@/constants/tabConstants";
import {
	getGroupInfo,
	getGroupMemberList,
	getGroupRequestMemberList,
} from "@/features/group/group-service";
import { resetGroupStateForGroupPage } from "@/features/group/group-slice";
import { resetPostStateForGroupPage } from "@/features/post/post-slice";
import { openJoinGroupModal } from "@/features/ui/ui-slice";

import { GroupMain, FeedDiv } from "./GroupPage.styles";

const GroupPage = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { groupInfo, groupMemberList, groupRequestMemberList } = useSelector(
		(state) => state.group,
	);

	const [isLoading, setIsLoading] = useState(true);
	const [isManaging, setIsManaging] = useState(false);

	const param = useParams();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const groupId = Number(param.id);

	useEffect(() => {
		dispatch(getGroupMemberList(groupId));
		dispatch(getGroupRequestMemberList(groupId));

		try {
			dispatch(getGroupInfo(groupId)).unwrap();
			setIsLoading(false);
		} catch (e) {
			navigate(`/community?${TAB_KEY}=${TAB_PARAM.MY_GROUP_FEED}`);
		}

		return () => {
			dispatch(resetPostStateForGroupPage());
			dispatch(resetGroupStateForGroupPage());
		};
	}, []);

	useEffect(() => {
		if (searchParams.get("invite")) {
			groupInfo?.information.memberInfo.some(
				(data) => data.userId !== user.userId && dispatch(openJoinGroupModal()),
			);
		}

		if (searchParams.get("mode")) {
			setIsManaging(true);
		} else {
			setIsManaging(false);
		}
	}, [searchParams]);

	if (isLoading || !groupInfo || !groupRequestMemberList) {
		return <div>그룹 정보 불러오는 중...</div>;
	}

	const { isPublicGroup } = groupInfo.information.group;
	const leaderId = groupInfo.information.leaderInfo.userId;
	const isGroupLeader = groupInfo.accessLevel === "owner";
	const isGroupMember = groupInfo.accessLevel !== null;
	const isGroupRequest =
		groupRequestMemberList.findIndex(
			(data) => data.member.userId === user.userId,
		) !== -1;

	return (
		<GroupMain>
			<GroupProfile
				groupInfo={groupInfo}
				isGroupLeader={isGroupLeader}
				isGroupMember={isGroupMember}
				isManaging={isManaging}
				groupMemberList={groupMemberList}
				isGroupRequest={isGroupRequest}
			/>

			{isManaging ? (
				<GroupManagement
					groupInfo={groupInfo}
					groupMemberList={groupMemberList}
				/>
			) : (
				<>
					{!isPublicGroup && !isGroupMember ? (
						<SecretFeed />
					) : (
						<FeedDiv>
							{isGroupMember && <UploadFeed />}
							<GroupTitle />
							<GroupFeed groupId={groupId} leaderId={leaderId} />
						</FeedDiv>
					)}

					{isGroupMember && (
						<GroupMember groupId={groupId} leaderId={leaderId} />
					)}
				</>
			)}

			<GroupModalTrigger
				groupId={groupId}
				leaderId={leaderId}
				groupInfo={groupInfo}
				groupMemberList={groupMemberList}
				groupRequestMemberList={groupRequestMemberList}
			/>
		</GroupMain>
	);
};

export default GroupPage;
