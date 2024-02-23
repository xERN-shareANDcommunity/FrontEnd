import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CalendarContainer from "@/components/Common/SchedulePage/CalendarContainer/CalendarContainer";
import ScheduleItemList from "@/components/Common/SchedulePage/ScheduleItemList/ScheduleItemList";
import { LayoutMain } from "@/components/Common/SchedulePage/SchedulePageLayout.styles";
import ScheduleProposalModal from "@/components/Common/ScheduleProposalModal/ScheduleProposalModal";
import { SCHEDULE_PAGE_TYPE, VIEW_TYPE } from "@/constants/calendarConstants";
import { SCHEDULE_MODAL_TYPE, UI_TYPE } from "@/constants/uiConstants";
import {
	getGroupScheduleProposal,
	getSchedulesForTheWeek,
	getSchedulesSummary,
	getTodaySchedules,
} from "@/features/schedule/schedule-service";
import {
	changeSchedulePage,
	resetSchedule,
} from "@/features/schedule/schedule-slice";
import { inqueryUserGroup } from "@/features/user/user-service";

const SharedSchedulePage = () => {
	const dispatch = useDispatch();
	const { currentCalendarView, currentGroupScheduleId } = useSelector(
		({ schedule }) => schedule,
	);
	const { openedModal, scheduleModalMode } = useSelector(({ ui }) => ui);

	useEffect(() => {
		const getSharedSchedulePreset = async () => {
			await dispatch(changeSchedulePage(SCHEDULE_PAGE_TYPE.SHARED));
			await dispatch(inqueryUserGroup());
		};
		getSharedSchedulePreset();
		return () => {
			dispatch(resetSchedule());
		};
	}, []);

	useEffect(() => {
		if (currentGroupScheduleId) {
			toast.dismiss();
			toast.loading("공유 일정을 가져오는 중...");
			dispatch(getSchedulesSummary());
			dispatch(getTodaySchedules());
			dispatch(getSchedulesForTheWeek());
			dispatch(getGroupScheduleProposal());
			toast.dismiss();
		}
	}, [currentGroupScheduleId]);

	return (
		<LayoutMain isMonthly={currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH}>
			<CalendarContainer />
			<ScheduleItemList />
			{openedModal === UI_TYPE.SHARE_SCHEDULE &&
				scheduleModalMode === SCHEDULE_MODAL_TYPE.PROPOSAL && (
					<ScheduleProposalModal />
				)}
		</LayoutMain>
	);
};

export default SharedSchedulePage;
