import React, { useState } from "react";
import { useDispatch } from "react-redux";

import FormModal from "@/components/Common/Modal/FormModal/FormModal.jsx";
import { GroupImgAddIcon } from "@/constants/iconConstants.js";
import { createGroup } from "@/features/group/group-service.js";
import { closeModal } from "@/features/ui/ui-slice.js";

import {
	TopDiv,
	TitleH2,
	GroupNameLabel,
	GroupNameTextarea,
	GroupDescriptionLabel,
	GroupDescriptionTextarea,
	ButtonWrapDiv,
	GroupCreateButton,
} from "./GroupCreateModal.style.js";

const GroupCreateModal = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [profileImg, setProfileImg] = useState("");
	const [previewImg, setPreviewImg] = useState("");

	const dispatch = useDispatch();

	const isEmpty = name.trim() === "" && description.trim() === "";

	const handleChangeImg = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setProfileImg(file);
			setPreviewImg(reader.result);
		};
	};

	const handleCreateGroup = (event) => {
		event.preventDefault();

		const formData = new FormData();

		const data = {
			name,
			description: description.length === 0 ? null : description,
		};

		formData.append("data", JSON.stringify(data));

		formData.append("image", profileImg);

		if (name.length < 21 && description.length < 101) {
			dispatch(createGroup(formData));
			dispatch(closeModal({ type: "CREATE_GROUP" }));
		}
	};

	return (
		<FormModal isEmpty={isEmpty}>
			<TopDiv>
				<TitleH2>그룹 만들기</TitleH2>
				{previewImg.length !== 0 ? (
					<img src={previewImg} alt="profileImg" />
				) : (
					<>
						<label htmlFor="profileImg">
							<GroupImgAddIcon />
						</label>
						<input type="file" id="profileImg" onChange={handleChangeImg} />
					</>
				)}
			</TopDiv>
			<GroupNameLabel htmlFor="name">그룹 이름</GroupNameLabel>
			<GroupNameTextarea
				name="name"
				onChange={(e) => setName(e.target.value)}
				value={name}
				maxLength={20}
			/>
			<GroupDescriptionLabel htmlFor="description">
				그룹 소개
			</GroupDescriptionLabel>
			<GroupDescriptionTextarea
				name="description"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
				maxLength={100}
			/>
			<ButtonWrapDiv>
				<GroupCreateButton
					type="submit"
					disabled={
						!name.trim() || name.length > 20 || description.length > 100
					}
					onClick={handleCreateGroup}
				>
					생성하기
				</GroupCreateButton>
			</ButtonWrapDiv>
		</FormModal>
	);
};

export default GroupCreateModal;
