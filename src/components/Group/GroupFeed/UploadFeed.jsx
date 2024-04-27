import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import imageCompression from "browser-image-compression";

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
	const [imgList, setImgList] = useState([]);
	const [previewImgList, setPreviewImgList] = useState([]);

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

	const handleCompressImage = async (fileList) => {
		const imageFileList = [];

		try {
			await Promise.all(
				[...fileList].map(async (file) => {
					const compressImageFile = await imageCompression(file, 1);

					const fileName = file.name;
					const fileType = compressImageFile.type;
					const convertedFile = new File([compressImageFile], fileName, {
						type: fileType,
					});

					imageFileList.push(convertedFile);
				}),
			);
		} catch (e) {
			imageFileList.push(...fileList);
		}

		return imageFileList;
	};

	const handleChangeImg = async (e) => {
		const fileList = e.target.files;

		if (fileList.length > 3) {
			toast.error("이미지는 3개까지 등록 가능합니다.");

			return;
		}

		const imageUrlList = [...previewImgList];

		Array.from(fileList).forEach((file) => {
			imageUrlList.push(URL.createObjectURL(file));
		});

		setPreviewImgList(imageUrlList);

		const compressedImages = await handleCompressImage(fileList);

		setImgList(compressedImages);
	};

	const handleImgClose = (selectImg, index) => {
		setPreviewImgList((prevPreviewImgList) =>
			prevPreviewImgList.filter((prevImg) => prevImg !== selectImg),
		);

		setImgList((prevImgList) =>
			prevImgList.filter((img) => img !== imgList[index]),
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		const data = {
			content,
		};

		formData.append("data", JSON.stringify(data));

		imgList.forEach((img, index) => formData.append(`image${index + 1}`, img));

		dispatch(createPost({ groupId, formData }));
		setContent("");
		setImgList("");
	};

	useEffect(() => {
		return () => {
			previewImgList.forEach((imgUrl) => URL.revokeObjectURL(imgUrl));
		};
	}, []);

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
						{previewImgList.map((img, index) => (
							<ImgDiv key={img}>
								<img src={img} alt={`feedImg${index}`} />
								<FeedImgCloseIcon onClick={() => handleImgClose(img, index)} />
							</ImgDiv>
						))}
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
