import React from "react";
import { useDispatch } from "react-redux";

import { CrownIcon } from "@/constants/iconConstants";
import { openMemberModal } from "@/features/ui/ui-slice";

import {
	MemberInnerDiv,
	MemberTitleDiv,
	MemberH3,
	MemberMoreSpan,
	MemberUl,
} from "./GroupMember.Shared.styles";

const MemberList = ({ leaderId, groupMemberList }) => {
	const dispatch = useDispatch();

	return (
		<MemberInnerDiv>
			<MemberTitleDiv>
				<MemberH3>그룹원</MemberH3>
				{groupMemberList.length > 5 && (
					<MemberMoreSpan onClick={() => dispatch(openMemberModal())}>
						더보기
					</MemberMoreSpan>
				)}
			</MemberTitleDiv>
			<MemberUl>
				{groupMemberList.slice(0, 5).map((info) => (
					<li key={info.member.userId}>
						<img
							src={info.member.image}
							alt={`${info.member.nickname}님의 이미지`}
						/>
						<h4>{info.member.nickname}</h4>
						{info.member.userId === leaderId && <CrownIcon />}
					</li>
				))}
			</MemberUl>
		</MemberInnerDiv>
	);
};

export default MemberList;
