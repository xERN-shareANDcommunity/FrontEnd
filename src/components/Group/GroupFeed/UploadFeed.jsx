import React, { useState } from "react";
import { useSelector } from "react-redux";

import { FeedImgIcon } from "@/constants/iconConstants";

import {
	UploadSection,
	TopDiv,
	ImgAddDiv,
	UploadButton,
} from "./UploadFeed.styles";

const UploadFeed = () => {
	const { user } = useSelector((state) => state.auth);

	const [content, setContent] = useState("");

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
				<input type="file" id="feedImg" onChange={() => {}} />
			</TopDiv>
			<UploadButton disabled>업로드</UploadButton>
		</UploadSection>
	);
};

export default UploadFeed;
