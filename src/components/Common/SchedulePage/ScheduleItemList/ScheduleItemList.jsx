import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScheduleItem from "@/components/Common/SchedulePage/ScheduleItemList/ScheduleItem/ScheduleItem";
import { ScheduleAddIcon } from "@/constants/iconConstants";
import { UI_TYPE } from "@/constants/uiConstants";
import {
	getSchedulesForTheWeek,
	getTodaySchedules,
} from "@/features/schedule/schedule-service.js";
import { resetOverlappedSchedules } from "@/features/schedule/schedule-slice";
import { openScheduleCreateModal } from "@/features/ui/ui-slice";

import {
	TodoHeader,
	TodoBody,
	TodoButton,
	TodoList,
	TodoH2,
	TodoH3,
	TodoBodyHeader,
	ScheduleItemListLayoutAside,
	TodoBodyHeaderButton,
	TodoTabButton,
} from "./ScheduleItemList.styles";

const ScheduleItemList = () => {
	const dispatch = useDispatch();
	const {
		todaySchedules,
		schedulesForTheWeek,
		overlappedScheduleInfo: {
			title: overlappedScheduleTitle,
			schedules: overlappedSchedules,
		},
	} = useSelector((state) => state.schedule);
	const [isTodayTab, setIsTodayTab] = useState(true);

	const isOverlappedSchedulesOn = overlappedSchedules.length > 0;
	useEffect(() => {
		dispatch(getTodaySchedules());
		dispatch(getSchedulesForTheWeek());
	}, []);

	const handleMenuOpen = () => {
		dispatch(
			openScheduleCreateModal({
				type: UI_TYPE.PERSONAL_SCHEDULE,
			}),
		);
	};

	if (isOverlappedSchedulesOn) {
		return (
			<ScheduleItemListLayoutAside data-testid="personal-todo-list">
				<TodoBody>
					<TodoBodyHeader>
						<div>
							{overlappedScheduleTitle.split("\n").map((line) => (
								<TodoH2 key={line}>{line}</TodoH2>
							))}
							<TodoH3>동안의 일정들</TodoH3>
						</div>
						<TodoBodyHeaderButton
							onClick={() => dispatch(resetOverlappedSchedules())}
						>
							<span>돌아가기</span>
						</TodoBodyHeaderButton>
					</TodoBodyHeader>
					<TodoList>
						{overlappedSchedules.map((schedule) => (
							<ScheduleItem
								key={
									schedule.recurrence
										? schedule.startDateTime + schedule.id
										: schedule.id
								}
								schedule={schedule}
							/>
						))}
					</TodoList>
				</TodoBody>
			</ScheduleItemListLayoutAside>
		);
	}

	return (
		<ScheduleItemListLayoutAside data-testid="personal-todo-list">
			<TodoHeader>
				<TodoTabButton
					selected={isTodayTab}
					onClick={() => setIsTodayTab(true)}
				>
					오늘 일정
				</TodoTabButton>
				<TodoTabButton
					selected={!isTodayTab}
					onClick={() => setIsTodayTab(false)}
				>
					예정
				</TodoTabButton>
			</TodoHeader>
			<TodoBody>
				<TodoBodyHeader>
					<div>
						<TodoH2>{isTodayTab ? "오늘 일정" : "예정"}</TodoH2>
						<TodoH3>
							{isTodayTab
								? "하루동안의 할 일을 관리합니다."
								: "앞으로 7일간 예정된 일정을 확인합니다."}
						</TodoH3>
					</div>
					<TodoBodyHeaderButton onClick={handleMenuOpen}>
						<ScheduleAddIcon />
						<span>일정 추가</span>
					</TodoBodyHeaderButton>
				</TodoBodyHeader>
				{(isTodayTab && todaySchedules.length === 0) ||
				(!isTodayTab && schedulesForTheWeek.length === 0) ? (
					<TodoButton onClick={handleMenuOpen}>
						아직 추가된 일정이 없습니다! <br />할 일을 추가하여 하루동안 할 일을
						관리해보세요.
					</TodoButton>
				) : (
					<TodoList>
						{(isTodayTab ? todaySchedules : schedulesForTheWeek).map(
							(schedule) => {
								return (
									<ScheduleItem
										key={
											schedule.recurrence
												? schedule.startDateTime + schedule.id
												: schedule.id
										}
										schedule={schedule}
									/>
								);
							},
						)}
					</TodoList>
				)}
			</TodoBody>
		</ScheduleItemListLayoutAside>
	);
};

export default ScheduleItemList;
