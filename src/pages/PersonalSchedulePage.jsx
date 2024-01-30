import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ScheduleModal from "@/components/Common/ScheduleModal/ScheduleModal";
import CalendarContainer from "@/components/Common/SchedulePage/CalendarContainer/CalendarContainer";
import ScheduleItemList from "@/components/Common/SchedulePage/ScheduleItemList/ScheduleItemList";
import { LayoutMain } from "@/components/Common/SchedulePage/SchedulePageLayout.styles";
import { SCHEDULE_PAGE_TYPE, VIEW_TYPE } from "@/constants/calendarConstants";
import { UI_TYPE } from "@/constants/uiConstants";
import {
	getSchedulesForTheWeek,
	getSchedulesSummary,
	getTodaySchedules,
} from "@/features/schedule/schedule-service";
import {
	changeSchedulePage,
	resetSchedule,
} from "@/features/schedule/schedule-slice";

const PersonalSchedulePage = () => {
	const dispatch = useDispatch();
	const openedModal = useSelector(({ ui }) => ui.openedModal);
	const currentCalendarView = useSelector(
		({ schedule }) => schedule.currentCalendarView,
	);

	useEffect(() => {
		const getPersonalPageInfo = async () => {
			await dispatch(changeSchedulePage(SCHEDULE_PAGE_TYPE.PERSONAL));
			toast.dismiss();
			toast.loading("개인 일정을 가져오는 중...");
			dispatch(getSchedulesSummary());
			dispatch(getTodaySchedules());
			dispatch(getSchedulesForTheWeek());
			toast.dismiss();
		};
		getPersonalPageInfo();
		return () => {
			dispatch(resetSchedule());
		};
	}, []);

	return (
		<>
			<LayoutMain isMonthly={currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH}>
				<CalendarContainer />
				<ScheduleItemList />
			</LayoutMain>
			{openedModal === UI_TYPE.PERSONAL_SCHEDULE && (
				<ScheduleModal type={openedModal} />
			)}
		</>
	);
};

export default PersonalSchedulePage;
