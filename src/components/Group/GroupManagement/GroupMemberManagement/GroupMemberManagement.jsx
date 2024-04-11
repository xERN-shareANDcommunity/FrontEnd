import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ACCESS_LEVEL_DATA } from "@/constants/accessConstants";
import { InfoIcon, AccessArrowIcon } from "@/constants/iconConstants";
import { changeAccessLevel } from "@/features/group/group-service";
import { openDeleteMemberWarningModal } from "@/features/ui/ui-slice";
import useOutsideClick from "@/hooks/useOutsideClick";

import AccessLevelInfo from "./AccessLevelInfo";
import CommentList from "./CommentList";
import {
	TitleUl,
	TitleLi,
	MemberUl,
	MemberLi,
	AccessLevelUl,
	AccessLevelLi,
} from "./GroupMemberManagement.styles";

const groupMemberManagementTitleData = [
	"프로필",
	"이름",
	"댓글 내역",
	"공감 내역",
	"가입 날짜",
];

const GroupMemberManagement = ({ groupId, memberList }) => {
	const dispatch = useDispatch();

	const [isAccessInfoOpen, setIsAccessInfoOpen] = useState(false);
	const [isCommentListOpen, setIsCommentListOpen] = useState(false);

	const [isAccessChangeOpenIndex, setIsAccessChangeOpenIndex] = useState(null);

	const navigate = useNavigate();

	const accessInfoRef = useRef(null);
	const commentListRef = useRef(null);

	useOutsideClick(accessInfoRef, () => setIsAccessInfoOpen(false));
	useOutsideClick(commentListRef, () => setIsCommentListOpen(false));

	const handleAccessChange = (num) =>
		setIsAccessChangeOpenIndex((prev) => (prev === num ? null : num));

	const handleChangeLevelClick = async (
		userId,
		accessLevel,
		memberAccessLevel,
	) => {
		if (memberAccessLevel !== accessLevel) {
			try {
				await dispatch(
					changeAccessLevel({ groupId, userId, accessLevel }),
				).unwrap();

				if (accessLevel === "owner") {
					navigate(`/group/${groupId}`);
				}
			} catch (error) {
				toast.error("그룹원 권한 변경에 실패했습니다.");
			}
		}
	};

	const changeUtcDate = (time) => {
		const year = new Date(time).getFullYear();
		const month = new Date(time).getMonth() + 1;
		const date = new Date(time).getDate();

		if (month < 10) {
			return `${year}.0${month}.${date}`;
		}

		return `${year}.${month}.${date}`;
	};

	return (
		<>
			<TitleUl>
				{groupMemberManagementTitleData.map((data) => (
					<TitleLi key={data}>{data}</TitleLi>
				))}
				<TitleLi
					ref={accessInfoRef}
					onClick={() => {
						setIsAccessInfoOpen(!isAccessInfoOpen);
					}}
					isClickable
				>
					멤버 권한
					<InfoIcon />
					{isAccessInfoOpen && <AccessLevelInfo />}
				</TitleLi>
			</TitleUl>
			{memberList &&
				memberList.map((memberInfo) => (
					<MemberUl key={memberInfo.member.userId}>
						<MemberLi>
							<img
								src={memberInfo.member.image}
								alt={`${memberInfo.member.nickname}님의 프로필`}
							/>
						</MemberLi>
						<MemberLi>
							<span>{memberInfo.member.nickname}</span>
						</MemberLi>
						<MemberLi
							ref={commentListRef}
							onClick={() => {
								setIsCommentListOpen(!isCommentListOpen);
							}}
							isClickable
						>
							<span>{memberInfo.member.commentCount}</span>
							{isCommentListOpen && <CommentList />}
						</MemberLi>
						<MemberLi>
							<span>{memberInfo.member.likeCount}</span>
						</MemberLi>
						<MemberLi>
							<span>{changeUtcDate(memberInfo.member.joinedDate)}</span>
						</MemberLi>
						<MemberLi
							onClick={() => {
								handleAccessChange(memberInfo.member.userId);
							}}
							isClickable
						>
							{ACCESS_LEVEL_DATA.map(
								(data) =>
									memberInfo.accessLevel === data.accessLevel && (
										<span key={data.accessLevel}>
											{data.icon}
											{memberInfo.accessLevel}
											<AccessArrowIcon />
										</span>
									),
							)}

							{isAccessChangeOpenIndex === memberInfo.member.userId && (
								<AccessLevelUl>
									{ACCESS_LEVEL_DATA.map((data) => (
										<AccessLevelLi
											key={data.accessLevel}
											isAccessLevel={
												data.accessLevel === memberInfo.accessLevel
											}
										>
											<button
												type="button"
												onClick={() => {
													handleChangeLevelClick(
														memberInfo.member.userId,
														data.accessLevel,
														memberInfo.accessLevel,
													);
												}}
											>
												{data.icon}
												{data.accessLevel}
											</button>
										</AccessLevelLi>
									))}
								</AccessLevelUl>
							)}
						</MemberLi>
						<MemberLi red>
							<span>
								<button
									type="button"
									onClick={() =>
										dispatch(openDeleteMemberWarningModal(memberInfo))
									}
								>
									내보내기
								</button>
							</span>
						</MemberLi>
					</MemberUl>
				))}
		</>
	);
};

export default GroupMemberManagement;
