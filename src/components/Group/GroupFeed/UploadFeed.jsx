import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FeedImgIcon } from "@/constants/iconConstants";
import { createPost } from "@/features/post/post-service";

import {
	UploadSection,
	TopDiv,
	ImgAddDiv,
	UploadButton,
} from "./UploadFeed.styles";

const UploadFeed = ({ groupId }) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const [content, setContent] = useState("");
	const [profileImg, setProfileImg] = useState("");

	const handleChangeImg = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setProfileImg(file);
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		const data = {
			content,
		};

		formData.append("data", JSON.stringify(data));

		formData.append("image1", profileImg);

		dispatch(createPost({ groupId, formData }));
		setContent("");
		setProfileImg("");
	};

	return (
		<UploadSection>
			<TopDiv>
				<img src={user.profileImage} alt="profileImg" />
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="그룹에 공유하고 싶은 글을 작성하여 올려보세요."
				/>

				<label htmlFor="feedImg">
					<ImgAddDiv>
						<FeedImgIcon />
						<p>이미지 등록하기</p>
					</ImgAddDiv>
				</label>
				<input type="file" id="feedImg" onChange={handleChangeImg} />
			</TopDiv>
			<UploadButton
				type="submit"
				disabled={content.trim() === ""}
				onClick={handleSubmit}
			>
				업로드
			</UploadButton>
		</UploadSection>
	);
};

export default UploadFeed;
