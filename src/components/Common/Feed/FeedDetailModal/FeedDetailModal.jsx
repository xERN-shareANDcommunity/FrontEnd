import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import FeedOption from "@/components/Common/Feed/FeedOption";
import FormModal from "@/components/Common/Modal/FormModal/FormModal";
import {
	CrownIcon,
	CommentIcon,
	EmptyHeartIcon,
	FillHeartIcon,
} from "@/constants/iconConstants";
import { getComments, postComment } from "@/features/comment/comment-service";
import { resetComments } from "@/features/comment/comment-slice";
import useOutsideClick from "@/hooks/useOutsideClick";

import {
	ContainerDiv,
	FeedDiv,
	ProfileDiv,
	ContentDiv,
	CommentDiv,
	CommentInputDiv,
	CommentInputContentDiv,
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
	leaderName,
	handleLikeClick,
}) => {
	const dispatch = useDispatch();

	const { comments } = useSelector((state) => state.comment);
	const { user } = useSelector((state) => state.auth);

	const [isOptionOpen, setIsOptionOpen] = useState(false);
	const [commentContent, setCommentContent] = useState("");

	const optionMenuRef = useRef();

	useOutsideClick(optionMenuRef, () => setIsOptionOpen(false));

	const handleAddComment = () => {
		dispatch(postComment({ groupId, postId, content: commentContent }));
		setCommentContent("");
	};

	useEffect(() => {
		dispatch(getComments({ groupId, postId }));

		return () => {
			dispatch(resetComments());
		};
	}, []);

	return (
		<FormModal isEmpty={commentContent.trim() === ""}>
			<ContainerDiv>
				<FeedDiv>
					<ProfileDiv>
						<img src={authorImage} alt={`${author}님의 프로필 이미지`} />
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
								<span>{comments.length}</span>
							</IconItemButton>
						</IconDiv>
					</ContentDiv>
				</FeedDiv>

				<CommentDiv>
					{comments.length !== 0 &&
						comments.map((commentInfo) => (
							<FeedComment
								key={commentInfo.commentId}
								commentId={commentInfo.commentId}
								author={commentInfo.author}
								authorImage={commentInfo.authorImage}
								updatedAt={commentInfo.updatedAt}
								content={commentInfo.content}
								postId={postId}
								groupId={groupId}
							/>
						))}
				</CommentDiv>

				<CommentInputDiv>
					<img src={authorImage} alt="profileImg" />
					<CommentInputContentDiv>
						<h3>{author}</h3>
						<textarea
							placeholder="댓글을 입력하세요"
							value={commentContent}
							onChange={(e) => setCommentContent(e.target.value)}
						/>
						<button
							type="submit"
							disabled={commentContent === ""}
							onClick={handleAddComment}
						>
							등록
						</button>
					</CommentInputContentDiv>
				</CommentInputDiv>
			</ContainerDiv>
		</FormModal>
	);
};

export default FeedDetailModal;
