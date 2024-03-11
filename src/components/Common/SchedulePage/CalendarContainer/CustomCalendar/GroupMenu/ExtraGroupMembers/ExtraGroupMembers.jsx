import React, { useRef, useState } from "react";

import { SCHEDULE_COLORS } from "@/constants/calendarConstants";
import {
	ExtraMembersDropdownIcon,
	WhitePlusIcon,
} from "@/constants/iconConstants";
import useOutsideClick from "@/hooks/useOutsideClick";

import { RelativeWrapperDiv } from "./ExtraGroupMembers.styles";

const ExtraGroupMembers = ({ extraMembers }) => {
	const [isOpen, setIsOpen] = useState(false);

	const wrapperRef = useRef();

	useOutsideClick(wrapperRef, () => isOpen && setIsOpen(false));

	return (
		<RelativeWrapperDiv ref={wrapperRef}>
			<button
				data-testid="ExtraGroupMember-toggleButton"
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className={isOpen ? "activated" : ""}
			>
				<WhitePlusIcon />
			</button>
			{isOpen && (
				<div className="dropdown" data-testid="ExtraGroupMember-dropdown">
					<ExtraMembersDropdownIcon />
					<ul>
						{extraMembers.map(({ member }, index) => (
							<li key={member.userId}>
								<img
									src={member.image}
									alt={`${member.nickname}님의 이미지`}
									width={23}
									height={23}
									style={{
										border: `1px solid ${SCHEDULE_COLORS[index + 5]}`,
									}}
								/>
								<span>{member.nickname}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</RelativeWrapperDiv>
	);
};

export default ExtraGroupMembers;
