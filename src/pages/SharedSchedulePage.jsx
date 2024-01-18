import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CalendarContainer from "@/components/Common/SchedulePage/CalendarContainer/CalendarContainer";
import ScheduleItemList from "@/components/Common/SchedulePage/ScheduleItemList/ScheduleItemList";
import { LayoutMain } from "@/components/Common/SchedulePage/SchedulePageLayout.styles";
import { VIEW_TYPE } from "@/constants/calendarConstants";
import { resetSchedule } from "@/features/schedule/schedule-slice";

const SharedSchedulePage = () => {
	const dispatch = useDispatch();
	const currentCalendarView = useSelector(
		({ schedule }) => schedule.currentCalendarView,
	);

	useEffect(() => {
		return () => {
			dispatch(resetSchedule());
		};
	}, []);

	return (
		<LayoutMain isMonthly={currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH}>
			<CalendarContainer isPersonal={false} />
			<ScheduleItemList isPersonal={false} />
		</LayoutMain>
	);
};

export default SharedSchedulePage;
