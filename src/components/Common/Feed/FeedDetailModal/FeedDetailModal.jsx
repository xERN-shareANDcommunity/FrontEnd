import React from "react";

import BaseModal from "@/components/Common/Modal/BaseModal";
import {
	CrownIcon,
	CommentIcon,
	EmptyHeartIcon,
	FillHeartIcon,
} from "@/constants/iconConstants";

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

				<CommentDiv>
					<img src={authorImage} alt="profileImg" />
					<CommentContentDiv>
						<h3>그룹원 01</h3>
						<h4>15분 전</h4>
						<p>
							오늘은 개발 스터디 그룹에서 알고리즘 대회에 참가했어! 문제를
							풀면서 서로 도움을 주고 받으며 즐거운 시간을 보냈어. 성장하는
							모습을 느낄 수 있어 뿌듯해
						</p>
					</CommentContentDiv>
				</CommentDiv>
			</ContainerDiv>
		</BaseModal>
	);
};

export default FeedDetailModal;
