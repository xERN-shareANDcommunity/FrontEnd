import React from "react";
import { useSelector } from "react-redux";

import CalendarContainer from "@/components/Common/SchedulePage/CalendarContainer/CalendarContainer";
import ScheduleItemList from "@/components/Common/SchedulePage/ScheduleItemList/ScheduleItemList";
import { LayoutMain } from "@/components/Common/SchedulePage/SchedulePageLayout.styles";
import { SCHEDULE_TYPE, VIEW_TYPE } from "@/constants/calendarConstants";

const SharedSchedulePage = () => {
	const currentCalendarView = useSelector(
		({ schedule }) => schedule.currentCalendarView,
	);

	return (
		<LayoutMain isMonthly={currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH}>
			<CalendarContainer type={SCHEDULE_TYPE.SHARED} />
			<ScheduleItemList />
		</LayoutMain>
	);
};

export default SharedSchedulePage;
