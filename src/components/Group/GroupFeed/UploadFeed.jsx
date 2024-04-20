import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import SampleImg from "@/assets/img/bg_02.png";
import { FeedImgIcon, FeedImgCloseIcon } from "@/constants/iconConstants";
import { createPost } from "@/features/post/post-service";

import {
	UploadSection,
	TopDiv,
	BottomDiv,
	ImgButtonDiv,
	ImgAddDiv,
	ImgBoxDiv,
	ImgPreviewDiv,
	ImgDiv,
	UploadButton,
} from "./UploadFeed.styles";

const UploadFeed = ({ groupId }) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const [content, setContent] = useState("");
	const [profileImg, setProfileImg] = useState("");

	const textareaRef = useRef(null);

	const handleChangeContent = (e) => {
		setContent(e.currentTarget.value);

		const { scrollHeight } = textareaRef.current;

		if (scrollHeight > 224) {
			textareaRef.current.style.height = `224px`;
		} else {
			textareaRef.current.style.height = `${scrollHeight}px`;
		}
	};

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
					ref={textareaRef}
					value={content}
					onChange={handleChangeContent}
					placeholder="그룹에 공유하고 싶은 글을 작성하여 올려보세요."
				/>
			</TopDiv>
			<BottomDiv>
				<ImgButtonDiv>
					<label htmlFor="feedImg">
						<ImgAddDiv>
							<FeedImgIcon />
							<p>
								이미지 등록하기 <span>(최대 3장)</span>
							</p>
						</ImgAddDiv>
					</label>
					<input type="file" id="feedImg" onChange={handleChangeImg} multiple />
				</ImgButtonDiv>

				<ImgBoxDiv>
					<ImgPreviewDiv>
						<ImgDiv>
							<img src={SampleImg} alt="sampleImg" />
							<FeedImgCloseIcon />
						</ImgDiv>
						<ImgDiv>
							<img src={SampleImg} alt="sampleImg" />
							<FeedImgCloseIcon />
						</ImgDiv>
						<ImgDiv>
							<img src={SampleImg} alt="sampleImg" />
							<FeedImgCloseIcon />
						</ImgDiv>
					</ImgPreviewDiv>
					<UploadButton
						type="submit"
						disabled={content.trim() === ""}
						onClick={handleSubmit}
					>
						업로드
					</UploadButton>
				</ImgBoxDiv>
			</BottomDiv>
		</UploadSection>
	);
};

export default UploadFeed;
