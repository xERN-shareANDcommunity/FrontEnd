import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedOption from "@/components/Common/Feed/FeedOption";
import BaseModal from "@/components/Common/Modal/BaseModal";
import {
	CrownIcon,
	CommentIcon,
	EmptyHeartIcon,
	FillHeartIcon,
} from "@/constants/iconConstants";
import { getComments } from "@/features/comment/comment-service";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
	ContainerDiv,
	FeedDiv,
	ProfileDiv,
	ContentDiv,
} from "./FeedDetailModal.style";
import { IconDiv, IconItemButton } from "../Feed.styles";
import FeedComment from "../FeedComment/FeedComment";

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
	const { user } = useSelector((state) => state.auth);

	const [isOptionOpen, setIsOptionOpen] = useState(false);

	const optionMenuRef = useRef();

	useOutsideClick(optionMenuRef, () => setIsOptionOpen(false));

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

						{user.nickname === author && (
							<FeedOption
								postId={postId}
								groupId={groupId}
								optionMenuRef={optionMenuRef}
								isOptionOpen={isOptionOpen}
								handleOptionClick={() => setIsOptionOpen((prev) => !prev)}
							/>
						)}
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
						<FeedComment
							key={commentInfo.commendId}
							commendId={commentInfo.commendId}
							author={commentInfo.author}
							authorImage={commentInfo.authorImage}
							updatedAt={commentInfo.updatedAt}
							content={commentInfo.content}
						/>
					))}
			</ContainerDiv>
		</BaseModal>
	);
};

export default FeedDetailModal;
