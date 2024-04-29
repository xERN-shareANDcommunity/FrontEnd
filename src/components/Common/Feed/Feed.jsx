import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SampleImg from "@/assets/img/p_00.png";
import SampleImg2 from "@/assets/img/p_01.png";
import SampleImg3 from "@/assets/img/p_02.png";
import FeedOption from "@/components/Common/Feed/FeedOption";
import {
	CrownIcon,
	CommentIcon,
	EmptyHeartIcon,
	FillHeartIcon,
	LeftArrowIcon,
	RightArrowIcon,
} from "@/constants/iconConstants";
import {
	cancelLikeGroupPost,
	likeGroupPost,
} from "@/features/post/post-service";
import { openFeedDetailModal } from "@/features/ui/ui-slice";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useTimeStamp } from "@/hooks/useTimeStamp";

import {
	FeedArticle,
	TopDiv,
	InfoDiv,
	BottomDiv,
	ContentDiv,
	CarouselDiv,
	CarouselBoxDiv,
	CarouselItemDiv,
	ArrowButton,
	IconDiv,
	IconItemButton,
} from "./Feed.styles";

const imgMockData = [
	{ img: SampleImg },
	{ img: SampleImg2 },
	{ img: SampleImg3 },
];

const Feed = ({ post, groupId, leaderId, isGroupPage }) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const [isPostLiked, setIsPostLiked] = useState(post.isLiked);
	const [postLikesCount, setPostLikesCount] = useState(post.likesCount);
	const [isOptionOpen, setIsOptionOpen] = useState(false);

	const optionMenuRef = useRef();
	const listRef = useRef(null);
	const itemRef = useRef(null);

	const navigate = useNavigate();

	useOutsideClick(optionMenuRef, () => setIsOptionOpen(false));

	const likeClick = async () => {
		try {
			await dispatch(
				likeGroupPost({ postGroupId: groupId, postId: post.postId }),
			).unwrap();
		} catch (error) {
			setIsPostLiked(false);
			setPostLikesCount((prev) => prev - 1);
		}
	};

	const disLikeClick = async () => {
		try {
			await dispatch(
				cancelLikeGroupPost({ postGroupId: groupId, postId: post.postId }),
			).unwrap();
		} catch (error) {
			setIsPostLiked(true);
			setPostLikesCount((prev) => prev + 1);
		}
	};

	const handleLikeClick = (e) => {
		e.stopPropagation();

		if (!isPostLiked) {
			setIsPostLiked(true);
			setPostLikesCount((prev) => prev + 1);
			likeClick();
		} else {
			setIsPostLiked(false);
			setPostLikesCount((prev) => prev - 1);
			disLikeClick();
		}
	};

	const handleLeftClick = () => {
		const wrap = itemRef.current;

		wrap.scrollBy({
			left: -500,
			behavior: "smooth",
		});
	};

	const handleRightClick = () => {
		const wrap = itemRef.current;

		wrap.scrollBy({
			left: 500,
			behavior: "smooth",
		});
	};

	return (
		<FeedArticle
			onClick={() =>
				isGroupPage
					? dispatch(openFeedDetailModal(post.postId))
					: navigate(`/group/${groupId}`)
			}
		>
			{user.nickname === post.author && (
				<FeedOption
					postId={post.postId}
					groupId={groupId}
					optionMenuRef={optionMenuRef}
					isOptionOpen={isOptionOpen}
					handleOptionClick={(e) => {
						e.stopPropagation();
						setIsOptionOpen((prev) => !prev);
					}}
				/>
			)}
			<TopDiv>
				<img src={post.authorImage} alt={`${post.author}님의 프로필 이미지`} />
				<InfoDiv>
					<h3>
						{post.author}

						{/* 게시글 작성자 id 비교 필요 */}
						{post.author === leaderId && <CrownIcon />}
					</h3>
					<h4>{useTimeStamp(post.createdAt)}</h4>
				</InfoDiv>
			</TopDiv>
			<BottomDiv>
				<ContentDiv>
					<p>{post.content}</p>
				</ContentDiv>

				{post.image && (
					<CarouselDiv ref={listRef}>
						<CarouselBoxDiv ref={itemRef}>
							{imgMockData.map((data) => (
								<CarouselItemDiv key={data.img}>
									<img src={data.img} alt="postImg" />
								</CarouselItemDiv>
							))}
						</CarouselBoxDiv>

						<ArrowButton onClick={handleLeftClick} className="prevButton">
							<LeftArrowIcon />
						</ArrowButton>

						<ArrowButton onClick={handleRightClick} className="nextButton">
							<RightArrowIcon />
						</ArrowButton>
					</CarouselDiv>
				)}

				<IconDiv>
					<IconItemButton onClick={handleLikeClick}>
						{isPostLiked ? <FillHeartIcon /> : <EmptyHeartIcon />}
						<span>{postLikesCount}</span>
					</IconItemButton>
					<IconItemButton>
						<CommentIcon />
						<span>{post.commentCount}</span>
					</IconItemButton>
				</IconDiv>
			</BottomDiv>
		</FeedArticle>
	);
};

export default Feed;
