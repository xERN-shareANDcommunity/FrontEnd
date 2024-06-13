import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const Feed = ({ post, groupId, isGroupPage, leaderId }) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const [isPostLiked, setIsPostLiked] = useState(post.isLiked);
	const [postLikesCount, setPostLikesCount] = useState(post.likesCount);
	const [isOptionOpen, setIsOptionOpen] = useState(false);

	const [isPrevButtonDisplayed, setIsPrevButtonDisplayed] = useState(false);
	const [isNextButtonDisplayed, setIsNextButtonDisplayed] = useState(false);
	const [currentWidth, setCurrentWidth] = useState(0);

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

		setCurrentWidth((prev) => prev - 500);
	};

	const handleRightClick = () => {
		const wrap = itemRef.current;

		wrap.scrollBy({
			left: 500,
			behavior: "smooth",
		});

		setCurrentWidth((prev) => prev + 500);
	};

	useEffect(() => {
		if (!post.image) {
			return;
		}

		if (
			currentWidth !== 0 &&
			currentWidth < post.image.split(",").length * 500
		) {
			setIsPrevButtonDisplayed(true);
		} else {
			setIsPrevButtonDisplayed(false);
		}

		if (currentWidth === post.image.split(",").length * 500 - 500) {
			setIsNextButtonDisplayed(false);
		} else {
			setIsNextButtonDisplayed(true);
		}
	}, [currentWidth]);

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
							{post.image.split(",").map((img) => (
								<CarouselItemDiv key={img}>
									<img src={img} alt="postImg" />
								</CarouselItemDiv>
							))}
						</CarouselBoxDiv>
						{post.image.split(",").length > 1 && (
							<>
								{isPrevButtonDisplayed && (
									<ArrowButton onClick={handleLeftClick} className="prevButton">
										<LeftArrowIcon />
									</ArrowButton>
								)}

								{isNextButtonDisplayed && (
									<ArrowButton
										onClick={handleRightClick}
										className="nextButton"
									>
										<RightArrowIcon />
									</ArrowButton>
								)}
							</>
						)}
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
