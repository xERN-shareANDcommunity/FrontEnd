import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import {
	CommentDiv,
	CommentContentDiv,
} from "@/components/Common/Feed/FeedComment/FeedComment.style";
import FeedOption from "@/components/Common/Feed/FeedOption";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useTimeStamp } from "@/hooks/useTimeStamp";

const FeedComment = ({
	// commentId,
	postId,
	groupId,
	author,
	authorImage,
	updatedAt,
	content,
}) => {
	const { user } = useSelector((state) => state.auth);

	const [isOptionOpen, setIsOptionOpen] = useState(false);

	const optionMenuRef = useRef();

	useOutsideClick(optionMenuRef, () => setIsOptionOpen(false));

	return (
		<CommentDiv>
			<img src={authorImage} alt="profileImg" />
			<CommentContentDiv>
				<h3>{author}</h3>
				<h4>{useTimeStamp(updatedAt)}</h4>
				<p>{content}</p>
			</CommentContentDiv>

			{user.nickname === author && (
				<FeedOption
					postId={postId}
					groupId={groupId}
					optionMenuRef={optionMenuRef}
					isOptionOpen={isOptionOpen}
					handleOptionClick={() => setIsOptionOpen((prev) => !prev)}
				/>
			)}
		</CommentDiv>
	);
};

export default FeedComment;
