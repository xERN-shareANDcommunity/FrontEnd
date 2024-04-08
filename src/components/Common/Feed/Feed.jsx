import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedDetailModal from "@/components/Common/Feed/FeedDetailModal/FeedDetailModal";
import FeedOption from "@/components/Common/Feed/FeedOption";
import {
	CrownIcon,
	CommentIcon,
	EmptyHeartIcon,
	FillHeartIcon,
} from "@/constants/iconConstants";
import { UI_TYPE } from "@/constants/uiConstants";
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
	IconDiv,
	IconItemButton,
} from "./Feed.styles";

const Feed = ({ post, groupId, leaderName }) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { openedModal } = useSelector((state) => state.ui);

	const [isPostLiked, setIsPostLiked] = useState(post.isLiked);
	const [postLikesCount, setPostLikesCount] = useState(post.likesCount);
	const [isOptionOpen, setIsOptionOpen] = useState(false);

	const optionMenuRef = useRef();

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

	return (
		<>
			<FeedArticle onClick={() => dispatch(openFeedDetailModal(post.postId))}>
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
					<img
						src={post.authorImage}
						alt={`${post.author}님의 프로필 이미지`}
					/>
					<InfoDiv>
						<h3>
							{post.author}
							{post.author === leaderName && <CrownIcon />}
						</h3>
						<h4>{useTimeStamp(post.createdAt)}</h4>
					</InfoDiv>
				</TopDiv>
				<BottomDiv>
					<ContentDiv>
						<p>{post.content}</p>
					</ContentDiv>

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

			{openedModal === UI_TYPE.FEED_DETAIL_MODAL(post.postId) && (
				<FeedDetailModal
					groupId={groupId}
					postId={post.postId}
					author={post.author}
					authorImage={post.authorImage}
					content={post.content}
					createdAt={useTimeStamp(post.createdAt)}
					likeCount={postLikesCount}
					isPostLiked={isPostLiked}
					leaderName={leaderName}
					handleLikeClick={handleLikeClick}
				/>
			)}
		</>
	);
};

export default Feed;
