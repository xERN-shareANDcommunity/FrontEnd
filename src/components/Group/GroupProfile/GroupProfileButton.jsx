import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import GroupDelegateModal from "@/components/Common/GroupModal/GroupDelegateModal/GroupDelegateModal";
import { AddIcon } from "@/constants/iconConstants";
import { UI_TYPE } from "@/constants/uiConstants";
import { changeRequestGroupJoin } from "@/features/group/group-service";
import { openDelegateGroupModal } from "@/features/ui/ui-slice";

import {
	ProfileButtonDiv,
	ProfileButton,
	ProfileWhiteButton,
} from "./GroupProfile.styles";
import GroupInviteLink from "../../Common/GroupInviteLink/GroupInviteLink";

const GroupProfileButton = ({
	groupInfo,
	isGroupMember,
	isGroupLeader,
	isManaging,
	isGroupRequest,
	// eslint-disable-next-line consistent-return
}) => {
	const dispatch = useDispatch();

	const { openedModal } = useSelector((state) => state.ui);

	const navigate = useNavigate();

	const [isGroupInviteLinkOpen, setIsGroupInviteLinkOpen] = useState(false);

	const memberLength = groupInfo.information.memberInfo.length;

	const { groupId, name } = groupInfo.information.group;

	//	그룹 관리 페이지일때
	if (isManaging) {
		return (
			<ProfileButtonDiv>
				<ProfileButton onClick={() => setIsGroupInviteLinkOpen(true)}>
					링크 생성하기
					{isGroupInviteLinkOpen && (
						<GroupInviteLink
							groupName={name}
							groupId={groupId}
							onClose={() => setIsGroupInviteLinkOpen(false)}
						/>
					)}
				</ProfileButton>

				{memberLength > 1 && (
					<ProfileWhiteButton
						onClick={() => dispatch(openDelegateGroupModal())}
					>
						그룹장 위임
					</ProfileWhiteButton>
				)}

				{openedModal === UI_TYPE.DELEGATE_GROUP && (
					<GroupDelegateModal
						groupInfo={groupInfo}
						groupMembers={groupInfo.information.memberInfo}
					/>
				)}
			</ProfileButtonDiv>
		);
	}

	// 그룹 리더일떄
	if (!isManaging && isGroupLeader) {
		return (
			<ProfileButtonDiv>
				<ProfileButton
					onClick={() =>
						navigate(
							`/group/${groupInfo.information.group.groupId}?mode=leader`,
						)
					}
				>
					그룹 관리
				</ProfileButton>
			</ProfileButtonDiv>
		);
	}

	// 그룹 멤버일때
	if (!isGroupLeader && isGroupMember) {
		return (
			<ProfileButtonDiv>
				<ProfileWhiteButton>그룹 나가기</ProfileWhiteButton>
			</ProfileButtonDiv>
		);
	}

	// 그룹 멤버가 아닐떄
	if (!isGroupMember && isGroupRequest === -1) {
		return (
			<ProfileButtonDiv>
				<ProfileWhiteButton
					onClick={() => dispatch(changeRequestGroupJoin(groupId))}
				>
					<>
						<AddIcon />
						그룹 참여 요청
					</>
				</ProfileWhiteButton>
			</ProfileButtonDiv>
		);
	}

	if (isGroupRequest !== -1) {
		return (
			<ProfileButtonDiv>
				<ProfileButton className="grayButton">수락 대기 중</ProfileButton>
				<ProfileWhiteButton
					onClick={() => dispatch(changeRequestGroupJoin(groupId))}
				>
					요청 취소
				</ProfileWhiteButton>
			</ProfileButtonDiv>
		);
	}
};

export default GroupProfileButton;
