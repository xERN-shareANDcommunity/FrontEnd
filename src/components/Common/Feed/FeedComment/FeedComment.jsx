import React from "react";

import {
	CommentDiv,
	CommentContentDiv,
} from "@/components/Common/Feed/FeedComment/FeedComment.style";
import { useTimeStamp } from "@/hooks/useTimeStamp";

const FeedComment = ({
	// commentId,
	author,
	authorImage,
	updatedAt,
	content,
}) => {
	return (
		<CommentDiv>
			<img src={authorImage} alt="profileImg" />
			<CommentContentDiv>
				<h3>{author}</h3>
				<h4>{useTimeStamp(updatedAt)}</h4>
				<p>{content}</p>
			</CommentContentDiv>

			{/* {user.nickname === author && (
				<FeedOption
					postId={postId}
					groupId={groupId}
					optionMenuRef={commentOptionMenuRef}
					isOptionOpen={isCommentOptionOpen}
					handleOptionClick={() => setIsCommentOptionOpen((prev) => !prev)}
				/>
			)} */}
		</CommentDiv>
	);
};

export default FeedComment;
