import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AddIcon } from "@/constants/iconConstants";
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
	if (!isGroupMember && !isGroupRequest) {
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

	if (isGroupRequest) {
		return (
			<ProfileButtonDiv>
				<ProfileButton className="disabledButton">수락 대기 중</ProfileButton>
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
