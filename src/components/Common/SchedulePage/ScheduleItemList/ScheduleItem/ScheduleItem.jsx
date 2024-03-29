import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "styled-components";

import DeleteScheduleWarningModal from "@/components/Common/Modal/DeleteScheduleWarningModal/DeleteScheduleWarningModal";
import {
	DeleteScheduleIcon,
	DocumentIcon,
	EditScheduleIcon,
} from "@/constants/iconConstants";
import { UI_TYPE } from "@/constants/uiConstants";
import { deleteSchedule } from "@/features/schedule/schedule-service";
import {
	openScheduleEditModal,
	openScheduleViewModal,
} from "@/features/ui/ui-slice";
import { getGroupColor, getTimeString } from "@/utils/calendarUtils";

import {
	CardDiv,
	ColoredCircleDiv,
	ScheduleItemContentDiv,
	ScheduleItemLi,
	ScheduleItemRightButtonsDiv,
} from "./ScheduleItem.styles";

const ScheduleItem = ({
	schedule: {
		id,
		isGroup,
		title,
		startDateTime,
		endDateTime,
		recurrence,
		userId: authorId,
	},
}) => {
	const dispatch = useDispatch();
	const { colors } = useTheme();
	const [isDeleteWarningModalOn, setIsDeleteWarningModalOn] = useState(false);
	const {
		user: { userId },
	} = useSelector(({ auth }) => auth);

	return (
		<>
			<ScheduleItemLi data-testid={`scheduleItem-${id}`}>
				<CardDiv>
					<ColoredCircleDiv
						bgColor={isGroup ? getGroupColor(id) : colors.disabled_text}
					/>
					<ScheduleItemContentDiv>
						<div>
							<h3>{title}</h3>
							{recurrence === 1 && (
								<>
									&nbsp;
									<span className="recur">반복</span>
								</>
							)}
						</div>
						<span>{getTimeString(startDateTime, endDateTime)}</span>
					</ScheduleItemContentDiv>
					<ScheduleItemRightButtonsDiv>
						{userId !== authorId ? (
							<button
								type="button"
								aria-label="viewSchedule"
								onClick={() =>
									dispatch(
										openScheduleViewModal({
											type: isGroup
												? UI_TYPE.SHARE_SCHEDULE
												: UI_TYPE.PERSONAL_SCHEDULE,
											id,
										}),
									)
								}
							>
								<DocumentIcon />
							</button>
						) : (
							<>
								<button
									type="button"
									aria-label="editSchedule"
									onClick={() =>
										dispatch(
											openScheduleEditModal({
												type: isGroup
													? UI_TYPE.SHARE_SCHEDULE
													: UI_TYPE.PERSONAL_SCHEDULE,
												id,
											}),
										)
									}
								>
									<EditScheduleIcon />
								</button>
								<button
									type="button"
									aria-label="deleteSchedule"
									onClick={() => setIsDeleteWarningModalOn(true)}
								>
									<DeleteScheduleIcon />
								</button>
							</>
						)}
					</ScheduleItemRightButtonsDiv>
				</CardDiv>
			</ScheduleItemLi>
			{isDeleteWarningModalOn && (
				<DeleteScheduleWarningModal
					onCancel={() => setIsDeleteWarningModalOn(false)}
					onDelete={() => dispatch(deleteSchedule(id))}
				/>
			)}
		</>
	);
};

export default ScheduleItem;
