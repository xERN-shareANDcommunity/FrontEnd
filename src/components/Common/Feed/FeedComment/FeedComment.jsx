import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	CommentDiv,
	CommentContentDiv,
	EditContentDiv,
	ButtonDiv,
} from "@/components/Common/Feed/FeedComment/FeedComment.style";
import FeedOption from "@/components/Common/Feed/FeedOption";
import { putComment } from "@/features/comment/comment-service";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useTimeStamp } from "@/hooks/useTimeStamp";

const FeedComment = ({
	commentId,
	postId,
	groupId,
	author,
	authorImage,
	updatedAt,
	content,
}) => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const [isOptionOpen, setIsOptionOpen] = useState(false);
	const [newContent, setNewContent] = useState(content);
	const [isEdit, setIsEdit] = useState(false);

	const optionMenuRef = useRef();

	useOutsideClick(optionMenuRef, () => setIsOptionOpen(false));

	const handleEditComment = () => {
		dispatch(
			putComment({
				groupId,
				postId,
				commentId,
				content: newContent,
			}),
			setIsEdit(false),
		);
	};

	return (
		<CommentDiv>
			<img src={authorImage} alt="profileImg" />
			<CommentContentDiv>
				<h3>{author}</h3>
				<h4>{useTimeStamp(updatedAt)}</h4>

				{isEdit ? (
					<EditContentDiv>
						<textarea
							value={newContent}
							onChange={(e) => setNewContent(e.target.value)}
						/>
						<ButtonDiv>
							<button
								type="button"
								className="cancelBtn"
								onClick={() => setIsEdit(false)}
							>
								취소
							</button>
							<button
								type="submit"
								disabled={content === newContent}
								onClick={handleEditComment}
							>
								수정
							</button>
						</ButtonDiv>
					</EditContentDiv>
				) : (
					<p>{content}</p>
				)}
			</CommentContentDiv>

			{user.nickname === author && (
				<FeedOption
					postId={postId}
					groupId={groupId}
					optionMenuRef={optionMenuRef}
					isOptionOpen={isOptionOpen}
					handleOptionClick={() => setIsOptionOpen((prev) => !prev)}
					isComment
					commentId={commentId}
					handleEditCommentClick={() => {
						setIsOptionOpen(false);
						setIsEdit(true);
					}}
				/>
			)}
		</CommentDiv>
	);
};

export default FeedComment;
