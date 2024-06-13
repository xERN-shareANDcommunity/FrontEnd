import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BaseModal from "@/components/Common/Modal/BaseModal";
import { CheckIcon } from "@/constants/iconConstants";
import { TAB_KEY, TAB_PARAM } from "@/constants/tabConstants";
import { delegateGroup } from "@/features/group/group-service";
import { closeModal } from "@/features/ui/ui-slice";

import {
	ContainerDiv,
	TitleH2,
	ContentDiv,
	Button,
	SelectBoxLi,
	SelectWrapUl,
} from "../GroupModal.Shared.styles";

const SelectBox = ({ name, isSelected, onClick }) => (
	<SelectBoxLi onClick={onClick} isSelected={isSelected}>
		<div>{isSelected && <CheckIcon />}</div>
		<span>{name}</span>
	</SelectBoxLi>
);

const GroupDelegateModal = ({ groupInfo }) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [selectedMemberId, setSelectedMemberId] = useState(null);

	const groupDetailInfo = groupInfo.information.group;
	const groupMembers = groupInfo.information.memberInfo;

	const memberList = groupMembers.filter(
		(info) => info.userId !== groupDetailInfo.leader,
	);

	const handleClickDelegate = async () => {
		const { groupId } = groupDetailInfo;

		try {
			await dispatch(delegateGroup({ groupId, selectedMemberId })).unwrap();
			dispatch(closeModal());
			navigate(`/community?${TAB_KEY}=${TAB_PARAM.MY_GROUP_FEED}`);
		} catch (e) {
			toast.error("그룹장 위임에 실패했습니다.");
		}
	};

	const handleClickSelectBox = (userId) => {
		setSelectedMemberId((prev) => (prev === userId ? null : userId));
	};

	return (
		<BaseModal isUpper>
			<ContainerDiv>
				<TitleH2>
					<strong>{`${groupDetailInfo.name}을(를) 위임받을 그룹원을 선택해주세요.`}</strong>
				</TitleH2>
				<ContentDiv className="delegate-modal">
					<p>
						위임받을 그룹원을 선택하고 위임하기 버튼을 누르면
						<br />
						방장 권한이 해당 사용자에게 넘어갑니다.
					</p>
					<SelectWrapUl>
						{memberList.map((info) => (
							<SelectBox
								key={info.userId}
								name={info.nickname}
								onClick={() => handleClickSelectBox(info.userId)}
								isSelected={info.userId === selectedMemberId}
							/>
						))}
					</SelectWrapUl>
					<Button onClick={handleClickDelegate} disabled={!selectedMemberId}>
						위임하기
					</Button>
				</ContentDiv>
			</ContainerDiv>
		</BaseModal>
	);
};

export default GroupDelegateModal;
