import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmptyLayout from "@/components/Common/EmptyLayout/EmptyLayout";
import Feed from "@/components/Common/Feed/Feed";
import FeedDetailModal from "@/components/Common/Feed/FeedDetailModal/FeedDetailModal";
import ScrollBottom from "@/components/Common/ScrollBottom";
import { EMPTY_TYPE } from "@/constants/emptyConstants";
import { UI_TYPE } from "@/constants/uiConstants";
import { getGroupAllPosts } from "@/features/post/post-service";

import { FeedSection } from "./GroupFeed.styles";

const GroupFeed = ({ groupId, leaderId }) => {
	const dispatch = useDispatch();

	const { allGroupPosts, allGroupPostsIsEnd } = useSelector(
		(state) => state.post,
	);
	const { openedModal } = useSelector((state) => state.ui);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			await dispatch(getGroupAllPosts(groupId));
			setIsLoading(false);
		})();
	}, []);

	const handleOnView = () => {
		if (!allGroupPostsIsEnd) {
			dispatch(getGroupAllPosts(groupId));
		}
	};

	if (isLoading) {
		return <div>로딩중</div>;
	}

	if (allGroupPosts.length === 0) {
		return <EmptyLayout emptyType={EMPTY_TYPE.GROUP_FEED} />;
	}

	return (
		<FeedSection>
			{allGroupPosts.map((post) => (
				<Feed
					key={post.postId}
					post={post}
					leaderId={leaderId}
					groupId={groupId}
				/>
			))}
			{openedModal === UI_TYPE.FEED_DETAIL_MODAL && (
				<FeedDetailModal groupId={groupId} leaderId={leaderId} />
			)}
			<ScrollBottom onView={handleOnView} />
		</FeedSection>
	);
};

export default GroupFeed;
