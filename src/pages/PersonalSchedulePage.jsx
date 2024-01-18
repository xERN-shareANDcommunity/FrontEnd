import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScheduleModal from "@/components/Common/ScheduleModal/ScheduleModal";
import CalendarContainer from "@/components/Common/SchedulePage/CalendarContainer/CalendarContainer";
import ScheduleItemList from "@/components/Common/SchedulePage/ScheduleItemList/ScheduleItemList";
import { LayoutMain } from "@/components/Common/SchedulePage/SchedulePageLayout.styles";
import { VIEW_TYPE } from "@/constants/calendarConstants";
import { UI_TYPE } from "@/constants/uiConstants";
import { resetSchedule } from "@/features/schedule/schedule-slice";

const PersonalSchedulePage = () => {
	const dispatch = useDispatch();
	const openedModal = useSelector(({ ui }) => ui.openedModal);
	const currentCalendarView = useSelector(
		({ schedule }) => schedule.currentCalendarView,
	);

	useEffect(() => {
		return () => {
			dispatch(resetSchedule());
		};
	}, []);

	return (
		<>
			<LayoutMain isMonthly={currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH}>
				<CalendarContainer isPersonal={true} />
				<ScheduleItemList isPersonal={true} />
			</LayoutMain>
			{openedModal === UI_TYPE.PERSONAL_SCHEDULE && (
				<ScheduleModal type={openedModal} />
			)}
		</>
	);
};

export default PersonalSchedulePage;
