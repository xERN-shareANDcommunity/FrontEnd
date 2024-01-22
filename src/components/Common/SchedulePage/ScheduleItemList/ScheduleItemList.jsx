import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScheduleItem from "@/components/Common/SchedulePage/ScheduleItemList/ScheduleItem/ScheduleItem";
import { SCHEDULE_PAGE_TYPE } from "@/constants/calendarConstants";
import { DottedCalendarIcon, ScheduleAddIcon } from "@/constants/iconConstants";
import { UI_TYPE } from "@/constants/uiConstants";
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
		scheduleProposals,
		todaySchedules,
		schedulesForTheWeek,
		overlappedScheduleInfo: {
			title: overlappedScheduleTitle,
			schedules: overlappedSchedules,
		},
		currentPageType,
	} = useSelector((state) => state.schedule);
	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	const isPersonal = currentPageType === SCHEDULE_PAGE_TYPE.PERSONAL;

	const isTodayTab =
		(isPersonal && currentTabIndex === 0) ||
		(!isPersonal && currentTabIndex === 1);

	const isForTheWeekTab =
		(isPersonal && currentTabIndex === 1) ||
		(!isPersonal && currentTabIndex === 2);

	const isProposalTab = !isPersonal && currentTabIndex === 0;

	const isOverlappedSchedulesOn = overlappedSchedules.length > 0;

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

	if (isPersonal) {
		return (
			<ScheduleItemListLayoutAside data-testid="personal-todo-list">
				<TodoHeader>
					<TodoTabButton
						selected={isTodayTab}
						onClick={() => setCurrentTabIndex(0)}
					>
						오늘 일정
					</TodoTabButton>
					<TodoTabButton
						selected={isForTheWeekTab}
						onClick={() => setCurrentTabIndex(1)}
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
					(isForTheWeekTab && schedulesForTheWeek.length === 0) ? (
						<TodoButton onClick={handleMenuOpen}>
							아직 추가된 일정이 없습니다! <br />할 일을 추가하여 하루동안 할
							일을 관리해보세요.
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
	}

	return (
		<ScheduleItemListLayoutAside data-testid="personal-todo-list">
			<TodoHeader>
				<TodoTabButton
					selected={isProposalTab}
					onClick={() => setCurrentTabIndex(0)}
				>
					일정 후보
				</TodoTabButton>
				<TodoTabButton
					selected={isTodayTab}
					onClick={() => setCurrentTabIndex(1)}
				>
					오늘 일정
				</TodoTabButton>
				<TodoTabButton
					selected={isForTheWeekTab}
					onClick={() => setCurrentTabIndex(2)}
				>
					예정
				</TodoTabButton>
			</TodoHeader>
			<TodoBody>
				<TodoBodyHeader>
					<div>
						<TodoH2>
							{/* eslint-disable-next-line no-nested-ternary */}
							{isProposalTab
								? "일정 후보(최대 5개)"
								: isTodayTab
								? "오늘 일정"
								: "예정"}
						</TodoH2>
						<TodoH3>
							{/* eslint-disable-next-line no-nested-ternary */}
							{isProposalTab
								? "함꼐 일정을 조율합니다."
								: isTodayTab
								? "하루동안의 할 일을 관리합니다."
								: "앞으로 7일간 예정된 일정을 확인합니다."}
						</TodoH3>
					</div>
					<div className="buttons">
						{isProposalTab && (
							<TodoBodyHeaderButton onClick={() => {}}>
								<DottedCalendarIcon />
								<span>후보 선택</span>
							</TodoBodyHeaderButton>
						)}
						<TodoBodyHeaderButton onClick={() => {}}>
							<ScheduleAddIcon />
							<span>후보 추가</span>
						</TodoBodyHeaderButton>
					</div>
				</TodoBodyHeader>
				{/* eslint-disable-next-line no-nested-ternary */}
				{isProposalTab && scheduleProposals.length === 0 ? (
					<TodoButton onClick={() => {}}>
						공유한 사용자들에게 일정 후보를
						<br />
						먼저 제안해보세요!
					</TodoButton>
				) : (isTodayTab && todaySchedules.length === 0) ||
				  (isForTheWeekTab && schedulesForTheWeek.length === 0) ? (
					<TodoButton onClick={() => {}}>
						아직 추가된 일정이 없습니다! <br />할 일을 추가하여 하루동안 할 일을
						관리해보세요.
					</TodoButton>
				) : (
					<TodoList>
						{/* eslint-disable-next-line no-nested-ternary */}
						{(isProposalTab
							? scheduleProposals
							: isTodayTab
							? todaySchedules
							: schedulesForTheWeek
						).map((schedule) => {
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
						})}
					</TodoList>
				)}
			</TodoBody>
		</ScheduleItemListLayoutAside>
	);
};

export default ScheduleItemList;
