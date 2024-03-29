import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BaseModal from "@/components/Common/Modal/BaseModal";
import {
	CrownIcon,
	CommentIcon,
	EmptyHeartIcon,
	FillHeartIcon,
} from "@/constants/iconConstants";
import { getComments } from "@/features/comment/comment-service";
import { useTimeStamp } from "@/hooks/useTimeStamp";

import {
	ContainerDiv,
	FeedDiv,
	ProfileDiv,
	ContentDiv,
	CommentDiv,
	CommentContentDiv,
} from "./FeedDetailModal.style";
import { IconDiv, IconItemButton } from "../Feed.styles";

const FeedDetailModal = ({
	groupId,
	postId,
	author,
	authorImage,
	content,
	createdAt,
	likeCount,
	isPostLiked,
	commentCount,
	leaderName,
	handleLikeClick,
}) => {
	const dispatch = useDispatch();

	const { comments } = useSelector((state) => state.comment);

	useEffect(() => {
		dispatch(getComments({ groupId, postId }));
	}, []);

	return (
		<BaseModal>
			<ContainerDiv>
				<FeedDiv>
					<ProfileDiv>
						<img src={authorImage} alt="profileImg" />
						<h3>
							{author}
							{author === leaderName && <CrownIcon />}
						</h3>
					</ProfileDiv>
					<ContentDiv>
						<p>{content}</p>
						<span>{createdAt}</span>
						<IconDiv>
							<IconItemButton onClick={handleLikeClick}>
								{isPostLiked ? <FillHeartIcon /> : <EmptyHeartIcon />}
								<span>{likeCount}</span>
							</IconItemButton>
							<IconItemButton>
								<CommentIcon />
								<span>{commentCount}</span>
							</IconItemButton>
						</IconDiv>
					</ContentDiv>
				</FeedDiv>

				{comments.length !== 0 &&
					comments.comment.map((commentInfo) => (
						<CommentDiv key={commentInfo.commentId}>
							<img src={commentInfo.authorImage} alt="profileImg" />
							<CommentContentDiv>
								<h3>{commentInfo.author}</h3>
								<h4>{useTimeStamp(commentInfo.updatedAt)}</h4>
								<p>{commentInfo.content}</p>
							</CommentContentDiv>
						</CommentDiv>
					))}
			</ContainerDiv>
		</BaseModal>
	);
};

export default FeedDetailModal;
