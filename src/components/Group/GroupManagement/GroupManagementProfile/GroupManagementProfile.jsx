import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GroupDeleteModal from "@/components/Common/GroupModal/GroupDeleteModal/GroupDeleteModal";
import GroupExitModal from "@/components/Common/GroupModal/GroupExitModal/GroupExitModal";
import ToggleButton from "@/components/Common/ToggleButton/ToggleButton";
import { UI_TYPE } from "@/constants/uiConstants";
import {
	changeGroupPublicOption,
	updateGroupProfile,
} from "@/features/group/group-service";
import {
	openDeleteGroupModal,
	openExitGroupModal,
} from "@/features/ui/ui-slice";

import {
	InfoDiv,
	ProfileInput,
	InfoInput,
	ToggleButtonDiv,
	SaveButtonDiv,
	SaveButton,
	BottomButtonDiv,
	DividerHr,
	ExitButton,
	DeleteButton,
} from "./GroupManagementProfile.styles";

const GroupManagementProfile = ({ groupInfo }) => {
	const dispatch = useDispatch();

	const { openedModal } = useSelector((state) => state.ui);

	const { groupId, isPublicGroup } = groupInfo.information.group;
	const memberLength = groupInfo.information.memberInfo.length;

	const defaultProfileImg = groupInfo.information.group.image;

	const [isPublic, setIsPublic] = useState(isPublicGroup);

	const [ProfileImg, setProfileImg] = useState("");
	const [profileImgValue, setProfileImgValue] = useState(defaultProfileImg);
	const [nameValue, setNameValue] = useState(groupInfo.information.group.name);
	const [descriptionValue, setDescriptionValue] = useState(
		groupInfo.information.group.description,
	);

	const isSaveEnabled =
		(nameValue.trim() !== groupInfo.information.group.name.trim() ||
			descriptionValue !== groupInfo.information.group.description ||
			profileImgValue.trim() !== defaultProfileImg.trim() ||
			isPublicGroup !== Number(isPublic)) &&
		nameValue.trim();

	const handleClickSave = async () => {
		const formdata = new FormData();
		const chagnePublicOption = !isPublicGroup;

		const data = {
			name: nameValue,
			description:
				descriptionValue !== null && descriptionValue.length === 0
					? null
					: descriptionValue,
		};
		formdata.append("data", JSON.stringify(data));

		if (profileImgValue !== defaultProfileImg) {
			formdata.append("image", ProfileImg);
		}

		dispatch(updateGroupProfile({ formdata, groupId }));

		try {
			await dispatch(
				changeGroupPublicOption({ groupId, chagnePublicOption }),
			).unwrap();
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
			setIsPublic(!chagnePublicOption);
		}
	};

	const handleClickToggle = async () => {
		setIsPublic(!isPublic);
	};

	const handleChangeImg = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setProfileImgValue(reader.result);
			setProfileImg(file);
		};
	};

	return (
		<>
			<InfoDiv>
				<h3>프로필</h3>
				<img src={profileImgValue} alt="DefaultProfile" />
				<label htmlFor="profileImg">이미지 재선택</label>
				<ProfileInput type="file" id="profileImg" onChange={handleChangeImg} />
			</InfoDiv>
			<InfoDiv>
				<h3>이름</h3>
				<InfoInput
					type="text"
					defaultValue={nameValue}
					onChange={(e) => setNameValue(e.target.value)}
				/>
			</InfoDiv>
			<InfoDiv>
				<h3>소개글</h3>
				<textarea
					defaultValue={descriptionValue}
					onChange={(e) => setDescriptionValue(e.target.value)}
				/>
			</InfoDiv>
			<InfoDiv>
				<h3>공개여부</h3>
				<ToggleButtonDiv onClick={() => handleClickToggle()}>
					<ToggleButton isActive={isPublic} />
				</ToggleButtonDiv>
			</InfoDiv>
			<SaveButtonDiv>
				<SaveButton disabled={!isSaveEnabled} onClick={handleClickSave}>
					변경 정보 저장하기
				</SaveButton>
			</SaveButtonDiv>
			<DividerHr />
			<BottomButtonDiv>
				{memberLength > 1 && (
					<ExitButton onClick={() => dispatch(openExitGroupModal())}>
						그룹 나가기
					</ExitButton>
				)}
				<DeleteButton onClick={() => dispatch(openDeleteGroupModal())}>
					그룹 삭제
				</DeleteButton>
			</BottomButtonDiv>
			{openedModal === UI_TYPE.EXIT_GROUP && <GroupExitModal />}
			{openedModal === UI_TYPE.DELETE_GROUP && (
				<GroupDeleteModal groupInfo={groupInfo} />
			)}
		</>
	);
};

export default GroupManagementProfile;
