import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import FeedDetailModal from "@/components/Common/Feed/FeedDetailModal/FeedDetailModal";
import DeleteMemberWarningModal from "@/components/Common/GroupModal/DeleteMemberWarningModal/DeleteMemberWarningModal";
import GroupDelegateModal from "@/components/Common/GroupModal/GroupDelegateModal/GroupDelegateModal";
import GroupDeleteModal from "@/components/Common/GroupModal/GroupDeleteModal/GroupDeleteModal";
import GroupExitModal from "@/components/Common/GroupModal/GroupExitModal/GroupExitModal";
import GroupJoinModal from "@/components/Common/GroupModal/GroupJoinModal/GroupJoinModal";
import MemberModal from "@/components/Group/GroupMember/MemberModal/MemberModal";
import MemberRequestModal from "@/components/Group/GroupMember/MemberModal/MemberRequestModal";
import { UI_TYPE } from "@/constants/uiConstants";

const GroupModalTrigger = ({
	groupId,
	leaderId,
	groupInfo,
	groupMemberList,
	groupRequestMemberList,
}) => {
	const { openedModal } = useSelector((state) => state.ui);

	const [searchParams] = useSearchParams();

	const inviteLink = searchParams.get("invite");

	return (
		<>
			{openedModal === UI_TYPE.JOIN_GROUP && (
				<GroupJoinModal inviteLink={inviteLink} />
			)}

			{openedModal === UI_TYPE.FEED_DETAIL_MODAL && (
				<FeedDetailModal groupId={groupId} leaderId={leaderId} />
			)}

			{openedModal === UI_TYPE.EXIT_GROUP && <GroupExitModal />}

			{openedModal === UI_TYPE.DELETE_GROUP && (
				<GroupDeleteModal groupInfo={groupInfo} />
			)}

			{openedModal === UI_TYPE.DELETE_MEMBER_WARNING_MODAL && (
				<DeleteMemberWarningModal groupId={groupId} />
			)}

			{openedModal === UI_TYPE.MEMBER_MODAL && (
				<MemberModal memberList={groupMemberList} />
			)}

			{openedModal === UI_TYPE.MEMBER_REQUEST_MODAL && (
				<MemberRequestModal
					requestMemberList={groupRequestMemberList}
					groupId={groupId}
				/>
			)}

			{openedModal === UI_TYPE.DELEGATE_GROUP && (
				<GroupDelegateModal groupInfo={groupInfo} />
			)}
		</>
	);
};

export default GroupModalTrigger;
