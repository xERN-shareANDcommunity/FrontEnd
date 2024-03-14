import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import BaseModal from "@/components/Common/Modal/BaseModal";
import { closeModal } from "@/features/ui/ui-slice";

import { NotificationModalWrapperDiv } from "./EmptyUserGroupNotificationModal.styles";

const EmptyUserGroupNotificationModal = () => {
	const dispatch = useDispatch();
	const navitage = useNavigate();
	return (
		<BaseModal onClose={() => dispatch(closeModal())}>
			<NotificationModalWrapperDiv>
				<h2>가입된 그룹이 없습니다.</h2>
				<p>
					<span>&apos;그룹 신청하기&apos; 버튼을 통해</span>
					<span>그룹을 만들어보세요.</span>
				</p>
				{/* 여기 그룹 검색 탭으로 전환되어야 함을 알리는 state를 더해야 함 */}
				<button
					type="button"
					onClick={() =>
						navitage("/community", { state: { isForGroupSearching: true } })
					}
				>
					그룹 신청하기
				</button>
			</NotificationModalWrapperDiv>
		</BaseModal>
	);
};

export default EmptyUserGroupNotificationModal;
