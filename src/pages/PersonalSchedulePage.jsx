import React from "react";
import { useSelector } from "react-redux";

import ScheduleModal from "@/components/Common/ScheduleModal/ScheduleModal";
import CalendarContainer from "@/components/Common/SchedulePage/CalendarContainer/CalendarContainer";
import ScheduleItemList from "@/components/Common/SchedulePage/ScheduleItemList/ScheduleItemList";
import { LayoutMain } from "@/components/Common/SchedulePage/SchedulePageLayout.styles";
import { SCHEDULE_TYPE, VIEW_TYPE } from "@/constants/calendarConstants";
import { UI_TYPE } from "@/constants/uiConstants";

const PersonalSchedulePage = () => {
	const openedModal = useSelector(({ ui }) => ui.openedModal);
	const currentCalendarView = useSelector(
		({ schedule }) => schedule.currentCalendarView,
	);

	return (
		<>
			<LayoutMain isMonthly={currentCalendarView === VIEW_TYPE.DAY_GRID_MONTH}>
				<CalendarContainer type={SCHEDULE_TYPE.PERSONAL} />
				<ScheduleItemList />
			</LayoutMain>
			{openedModal === UI_TYPE.PERSONAL_SCHEDULE && (
				<ScheduleModal type={openedModal} />
			)}
		</>
	);
};

export default PersonalSchedulePage;
