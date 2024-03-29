import React from "react";
import { useDispatch } from "react-redux";

import { OptionThreeDotIcon } from "@/constants/iconConstants";
import { deleteComment, putComment } from "@/features/comment/comment-service";
import { deleteGroupPost } from "@/features/post/post-service";

import { OptionDiv, OptionMenuDiv } from "./Feed.styles";

const FeedOption = ({
	postId,
	groupId,
	optionMenuRef,
	isOptionOpen,
	handleOptionClick,
	isComment,
	commentId,
}) => {
	const dispatch = useDispatch();
	const content = "test";

	const handleDeletePost = () => {
		dispatch(deleteGroupPost({ postGroupId: groupId, postId }));
	};

	const handleDeleteComment = () => {
		dispatch(deleteComment({ groupId, postId, commentId }));
	};

	const handlePutComment = () => {
		dispatch(putComment({ groupId, postId, commentId, content }));
	};

	return (
		<OptionDiv ref={optionMenuRef}>
			<OptionThreeDotIcon onClick={handleOptionClick} />

			{isOptionOpen && (
				<OptionMenuDiv>
					<ul>
						<li>
							<button type="button" onClick={isComment && handlePutComment}>
								수정
							</button>
						</li>
						<li>
							<button
								type="button"
								onClick={isComment ? handleDeleteComment : handleDeletePost}
							>
								삭제
							</button>
						</li>
					</ul>
				</OptionMenuDiv>
			)}
		</OptionDiv>
	);
};

export default FeedOption;
