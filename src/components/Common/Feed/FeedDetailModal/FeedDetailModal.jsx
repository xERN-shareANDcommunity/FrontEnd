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
import {
	getGroupPostInfo,
	cancelLikeGroupPost,
	likeGroupPost,
} from "@/features/post/post-service";
import { resetPostInfo } from "@/features/post/post-slice";
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

const FeedDetailModal = ({ groupId, leaderId }) => {
	const dispatch = useDispatch();

	const { comments } = useSelector((state) => state.comment);
	const { user } = useSelector((state) => state.auth);
	const { feedDetailModalId } = useSelector((state) => state.ui);
	const { postInfo } = useSelector((state) => state.post);

	const [isOptionOpen, setIsOptionOpen] = useState(false);
	const [commentContent, setCommentContent] = useState("");

	const optionMenuRef = useRef();

	useOutsideClick(optionMenuRef, () => setIsOptionOpen(false));

	const handleLikeClick = () => {
		if (!postInfo.post.isLiked) {
			dispatch(
				likeGroupPost({ postGroupId: groupId, postId: postInfo.post.postId }),
			);
		} else {
			dispatch(
				cancelLikeGroupPost({
					postGroupId: groupId,
					postId: postInfo.post.postId,
				}),
			);
		}
	};

	const handleAddComment = () => {
		dispatch(
			postComment({
				groupId,
				postId: feedDetailModalId,
				content: commentContent,
			}),
		);
		setCommentContent("");
	};

	useEffect(() => {
		dispatch(getComments({ groupId, postId: feedDetailModalId }));
		dispatch(getGroupPostInfo({ groupId, postId: feedDetailModalId }));

		return () => {
			dispatch(resetComments());
			dispatch(resetPostInfo());
		};
	}, []);

	if (!postInfo) {
		return <div>로딩중...</div>;
	}

	return (
		<FormModal isEmpty={commentContent.trim() === ""}>
			<ContainerDiv>
				<FeedDiv>
					<ProfileDiv>
						<img
							src={postInfo.post.authorImage}
							alt={`${postInfo.post.author}님의 프로필 이미지`}
						/>
						<h3>
							{postInfo.post.author}
							{/* 코멘트 작성자 id 필요 */}
							{postInfo.post.author === leaderId && <CrownIcon />}
						</h3>

						{postInfo.post.isMine && (
							<FeedOption
								postId={feedDetailModalId}
								groupId={groupId}
								optionMenuRef={optionMenuRef}
								isOptionOpen={isOptionOpen}
								handleOptionClick={() => setIsOptionOpen((prev) => !prev)}
							/>
						)}
					</ProfileDiv>
					<ContentDiv>
						<p>{postInfo.post.content}</p>
						<span>날짜 추가 예정</span>
						<IconDiv>
							<IconItemButton onClick={handleLikeClick}>
								{postInfo.post.isLiked ? <FillHeartIcon /> : <EmptyHeartIcon />}
								<span>{postInfo.post.likesCount}</span>
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
								postId={postInfo.post.postId}
								groupId={groupId}
							/>
						))}
				</CommentDiv>

				<CommentInputDiv>
					<img src={user.profileImage} alt="profileImg" />
					<CommentInputContentDiv>
						<h3>{user.nickname}</h3>
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
