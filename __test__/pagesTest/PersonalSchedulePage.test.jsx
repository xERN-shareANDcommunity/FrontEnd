/**
 * @jest-environment jsdom
 */
import React from "react";
import ReactDOM from "react-dom";

import { userEvent } from "@storybook/testing-library";
import { screen } from "@testing-library/react";

import ScheduleModal from "@/components/Common/ScheduleModal/ScheduleModal.jsx";
import { SCHEDULE_MODAL_TYPE } from "@/constants/uiConstants";
import PersonalSchedulePage from "@/pages/PersonalSchedulePage.jsx";
import lightTheme from "@/styles/theme.js";

import { render } from "../../jest.setup.js";

const TITLE_TEXT = "일정 1";
const CONTENT_TEXT = "일정 상세 정보";

const getInitialScheduleState = ({ recurrence, isAllDay, isMine }) => {
	const startDate = new Date();
	const endDate = new Date();
	if (isAllDay) {
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(23, 59, 59, 999);
	}
	return {
		schedule: {
			todaySchedules: [
				{
					id: 0,
					userId: 1,
					isGroup: false,
					title: TITLE_TEXT,
					startDateTime: startDate.toISOString(),
					endDateTime: endDate.toISOString(),
					recurrence,
				},
			],
			calendarSchedules: [],
			schedulesForTheWeek: [],
			overlappedScheduleInfo: {
				title: "",
				schedules: [],
			},
		},
		ui: {
			isLoading: true,
			scheduleModalMode: SCHEDULE_MODAL_TYPE.CREATE,
		},
		auth: {
			user: { userId: isMine ? 1 : 2 },
		},
	};
};

describe("PersonalSchedulePage without modal", () => {
	describe("fetch data and update UI", () => {
		it("initial render with on all-day todaySchedule", async () => {
			const { unmount } = render(<PersonalSchedulePage />, {
				preloadedState: {
					auth: {
						user: {
							userId: 1,
						},
					},
				},
			});
			// before fetching schedules
			const calendar = screen.getByTestId("calendar-container");
			const todaySchedulesTab = screen.getByRole("button", {
				name: "오늘 일정",
			});
			const schedulesForTheWeekTab = screen.getByRole("button", {
				name: "예정",
			});
			let addButton = screen.getByRole("button", {
				name: "아직 추가된 일정이 없습니다! 할 일을 추가하여 하루동안 할 일을 관리해보세요.",
			});

			expect(calendar).toBeInTheDocument();
			expect(todaySchedulesTab).toHaveStyle({
				backgroundColor: lightTheme.colors.primary,
			});
			expect(schedulesForTheWeekTab).toHaveStyle({
				backgroundColor: lightTheme.colors.white,
			});
			expect(addButton).toBeInTheDocument();

			// fetching
			await screen.findByText("오늘오늘");

			// after fetching schedules
			addButton = screen.queryByRole("button", {
				name: "아직 추가된 일정이 없습니다! 할 일을 추가하여 하루동안 할 일을 관리해보세요.",
			});
			const todayScheduleItem = screen.getByText(
				`${new Date().getMonth() + 1}월 ${new Date().getDate()}일 하루 종일`,
			);

			expect(addButton).toBeNull();
			expect(todayScheduleItem).toBeInTheDocument();

			// explicit unmount
			unmount();
		});

		it("render all-day tommorow schedule with changing tab color when user click '예정' tab", async () => {
			const { unmount } = render(<PersonalSchedulePage />, {
				preloadedState: {
					auth: {
						user: {
							userId: 1,
						},
					},
				},
			});

			// initial
			const todaySchedulesTab = screen.getByRole("button", {
				name: "오늘 일정",
			});
			const schedulesForTheWeekTab = screen.getByRole("button", {
				name: "예정",
			});
			expect(todaySchedulesTab).toHaveStyle({
				backgroundColor: lightTheme.colors.primary,
			});
			expect(schedulesForTheWeekTab).toHaveStyle({
				backgroundColor: lightTheme.colors.white,
			});

			// action
			userEvent.click(schedulesForTheWeekTab);

			// fetching
			await screen.findByText("오늘오늘");

			// after fetching
			expect(todaySchedulesTab).toHaveStyle({
				backgroundColor: lightTheme.colors.white,
			});
			expect(schedulesForTheWeekTab).toHaveStyle({
				backgroundColor: lightTheme.colors.primary,
			});
			const nextDay = new Date();
			nextDay.setDate(nextDay.getDate() + 1);
			const scheduleItem = screen.getByText(
				`${nextDay.getMonth() + 1}월 ${nextDay.getDate()}일 하루 종일`,
			);
			expect(scheduleItem).toBeInTheDocument();

			// explicit unmount
			unmount();
		});
	});
	describe("render diffrent ScheduleItem UI depends on schedule type", () => {
		describe("Is it recurring?", () => {
			it("yes", () => {
				const { unmount } = render(<PersonalSchedulePage />, {
					preloadedState: getInitialScheduleState({
						recurrence: 0,
						isAllDay: false,
					}),
				});

				const todaySchedule = screen.queryByText("반복");
				expect(todaySchedule).toBeNull();

				// explicit unmount
				unmount();
			});
			it("no", () => {
				const { unmount } = render(<PersonalSchedulePage />, {
					preloadedState: getInitialScheduleState({
						recurrence: 1,
						isAllDay: false,
					}),
				});

				const todaySchedule = screen.getByText("반복");
				expect(todaySchedule).toBeInTheDocument();

				// explicit unmount
				unmount();
			});
		});
		describe("Is it all day?", () => {
			it("yes", () => {
				const { unmount } = render(<PersonalSchedulePage />, {
					preloadedState: getInitialScheduleState({
						recurrence: 0,
						isAllDay: true,
					}),
				});

				const allDayElement = screen.getByText(
					`${new Date().getMonth() + 1}월 ${new Date().getDate()}일 하루 종일`,
				);
				expect(allDayElement).toBeInTheDocument();

				// explicit unmount
				unmount();
			});
			it("no", () => {
				const { unmount } = render(<PersonalSchedulePage />, {
					preloadedState: getInitialScheduleState({
						recurrence: 0,
						isAllDay: false,
					}),
				});

				const allDayElement = screen.queryByText(
					`${new Date().getMonth() + 1}월 ${new Date().getDate()}일 하루 종일`,
				);
				expect(allDayElement).toBeNull();

				// explicit unmount
				unmount();
			});
		});
		describe("Is it mine?", () => {
			it("yes", () => {
				const { unmount } = render(<PersonalSchedulePage />, {
					preloadedState: getInitialScheduleState({
						recurrence: 0,
						isAllDay: false,
						isMine: true,
					}),
				});

				const scheduleItem = screen.getByTestId(
					`scheduleItem-${
						getInitialScheduleState({ isMine: true }).schedule.todaySchedules[0]
							.id
					}`,
				);
				const [editButton, deleteButton] =
					scheduleItem.getElementsByTagName("button");

				expect(editButton).toHaveAttribute("aria-label", "editSchedule");
				expect(deleteButton).toHaveAttribute("aria-label", "deleteSchedule");

				// explicit unmount
				unmount();
			});
			it("no", () => {
				const { unmount } = render(<PersonalSchedulePage />, {
					preloadedState: getInitialScheduleState({
						recurrence: 0,
						isAllDay: false,
						isMine: false,
					}),
				});

				const viewButton = screen
					.getByTestId(
						`scheduleItem-${
							getInitialScheduleState({ isMine: true }).schedule
								.todaySchedules[0].id
						}`,
					)
					.getElementsByTagName("button")[0];

				expect(viewButton).toHaveAttribute("aria-label", "viewSchedule");

				// explicit unmount
				unmount();
			});
		});
	});
});

describe("ScheduleModal in PersonalSchedulePage", () => {
	beforeAll(() => {
		ReactDOM.createPortal = jest.fn((element) => {
			return element;
		});
		window.scrollTo = jest.fn();
	});
	describe("trigger opening ScheduleModal", () => {
		describe("as a create mode", () => {
			it("when click '일정 추가' button", () => {
				const { unmount } = render(<PersonalSchedulePage />);

				userEvent.click(screen.getByRole("button", { name: "일정 추가" }));

				const saveButton = screen.getByRole("button", {
					name: "저장하기",
				});
				expect(saveButton).toBeDisabled();

				// explicit unmount
				unmount();
			});
			it("when click big add button", () => {
				const { unmount } = render(<PersonalSchedulePage />);

				userEvent.click(
					screen.getByRole("button", {
						name: "아직 추가된 일정이 없습니다! 할 일을 추가하여 하루동안 할 일을 관리해보세요.",
					}),
				);

				const saveButton = screen.getByRole("button", {
					name: "저장하기",
				});
				expect(saveButton).toBeDisabled();

				// explicit unmount
				unmount();
			});
		});
		describe("as a edit mode", () => {
			it("when click editButton in existing my schedule", async () => {
				const { unmount } = render(<PersonalSchedulePage />, {
					preloadedState: getInitialScheduleState({
						recurrence: 0,
						isAllDay: false,
						isMine: true,
					}),
				});

				const editButton = screen
					.getByTestId(
						`scheduleItem-${
							getInitialScheduleState({ isMine: true }).schedule
								.todaySchedules[0].id
						}`,
					)
					.getElementsByTagName("button")[0];

				userEvent.click(editButton);

				const modalTitle = screen.getByText("일정 수정");
				const titleInput = await screen.findByPlaceholderText("일정 제목");
				const textarea = await screen.findByPlaceholderText("상세 내용");
				const dateButtons = await screen.findAllByRole("button", {
					name: "2023년 12월 14일",
				});
				const startTimeButton = await screen.findByRole("button", {
					name: "오전 10:55",
				});
				const endTimeButton = await screen.findByRole("button", {
					name: "오후 02:55",
				});
				const allDayCheckbox = await screen.findByLabelText("하루 종일");
				const repeatOrNotSelect = await screen.findByRole("button", {
					name: "반복 안함",
				});
				const submitButton = await screen.findByRole("button", {
					name: "수정하기",
				});

				expect(modalTitle).toBeInTheDocument();
				expect(titleInput).toHaveValue("오늘오늘");
				expect(titleInput).toBeEnabled();
				expect(textarea).toHaveValue("오늘 끝");
				expect(textarea).toBeEnabled();
				expect(dateButtons).toHaveLength(2);
				dateButtons.forEach((dateButton) => expect(dateButton).toBeEnabled());
				expect(startTimeButton).toBeEnabled();
				expect(endTimeButton).toBeEnabled();
				expect(allDayCheckbox).not.toBeChecked();
				expect(allDayCheckbox).toBeEnabled();
				expect(repeatOrNotSelect).toBeEnabled();
				expect(submitButton).toBeDisabled();

				// explicit unmount
				unmount();
			});
		});
		describe("as a view mode", () => {
			it("when click editButton in existing not my schedule", async () => {
				const { unmount } = render(<PersonalSchedulePage />, {
					preloadedState: getInitialScheduleState({
						recurrence: 0,
						isAllDay: false,
						isMine: false,
					}),
				});

				const viewButton = screen
					.getByTestId(
						`scheduleItem-${
							getInitialScheduleState({ isMine: true }).schedule
								.todaySchedules[0].id
						}`,
					)
					.getElementsByTagName("button")[0];

				userEvent.click(viewButton);

				const modalTitle = screen.getByText("일정 정보");
				const titleInput = await screen.findByPlaceholderText("일정 제목");
				const textarea = await screen.findByPlaceholderText("상세 내용");
				const startTimeButton = await screen.findByRole("button", {
					name: "오전 10:55",
				});
				const endTimeButton = await screen.findByRole("button", {
					name: "오후 02:55",
				});
				const allDayCheckbox = await screen.findByLabelText("하루 종일");
				const repeatOrNotSelect = await screen.findByRole("button", {
					name: "반복 안함",
				});
				const submitButton = screen.queryByRole("button", {
					name: /수정하기|저장하기/i,
				});

				expect(modalTitle).toBeInTheDocument();
				expect(titleInput).toHaveValue("오늘오늘");
				expect(titleInput).toBeDisabled();
				expect(textarea).toHaveValue("오늘 끝");
				expect(textarea).toBeDisabled();
				expect(startTimeButton).toBeDisabled();
				expect(endTimeButton).toBeDisabled();
				expect(allDayCheckbox).not.toBeChecked();
				expect(allDayCheckbox).toBeDisabled();
				expect(repeatOrNotSelect).toBeDisabled();
				expect(submitButton).toBeNull();

				// explicit unmount
				unmount();
			});
		});
	});
	describe("change UI in ScheduleModal while fill in form", () => {
		it("enable '저장하기' 버튼 if fill in title and content", () => {
			render(<ScheduleModal />);

			const titleInput = screen.getByPlaceholderText("일정 제목");
			const contentTextarea = screen.getByPlaceholderText("상세 내용");
			const submitButton = screen.getByRole("button", { name: "저장하기" });
			expect(submitButton).toBeDisabled();

			userEvent.clear(titleInput);
			userEvent.clear(contentTextarea);
			userEvent.type(titleInput, "일정 제목 예시 1");
			userEvent.type(contentTextarea, "일정 설명 예시");

			expect(submitButton).toBeEnabled();
		});
		describe("depend on recurring type", () => {
			it("do not recur", () => {
				render(<ScheduleModal />);

				expect(
					screen.queryByRole("heading", {
						name: "반복 종료",
					}),
				).toBeNull();
			});
			it("recur daily", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByText("반복 안함"));
				userEvent.click(screen.getByText("매일"));

				expect(screen.getByText("매일")).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						name: "반복 종료",
					}),
				).toBeInTheDocument();
			});
			it("recur daily_N", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByText("반복 안함"));
				userEvent.click(screen.getByText("N일 간격"));

				expect(screen.getByText("N일 간격")).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						name: "반복 종료",
					}),
				).toBeInTheDocument();
				expect(screen.getByDisplayValue(1)).toBeInTheDocument();
				expect(screen.getByText("일 간격으로 반복합니다.")).toBeInTheDocument();
			});
			it("recur weekly", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByText("반복 안함"));
				userEvent.click(screen.getByText("매주"));

				expect(screen.getByText("매주")).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						name: "반복 종료",
					}),
				).toBeInTheDocument();
				expect(screen.getByLabelText("월")).toBeInTheDocument();
			});
			it("recur weekly_N", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByText("반복 안함"));
				userEvent.click(screen.getByText("N주 간격"));

				expect(screen.getByText("N주 간격")).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						name: "반복 종료",
					}),
				).toBeInTheDocument();
				expect(screen.getByLabelText("월")).toBeInTheDocument();
				expect(screen.getByDisplayValue(1)).toBeInTheDocument();
				expect(screen.getByText("주 간격으로 반복합니다.")).toBeInTheDocument();
			});
			it("recur monthly", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByText("반복 안함"));
				userEvent.click(screen.getByText("매월"));

				expect(screen.getByText("매월")).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						name: "반복 종료",
					}),
				).toBeInTheDocument();
			});
			it("recur monthly_N", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByText("반복 안함"));
				userEvent.click(screen.getByText("N개월 간격"));

				expect(screen.getByText("N개월 간격")).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						name: "반복 종료",
					}),
				).toBeInTheDocument();
				expect(screen.getByDisplayValue(1)).toBeInTheDocument();
				expect(
					screen.getByText("개월 간격으로 반복합니다."),
				).toBeInTheDocument();
			});
			it("recur yearly", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByText("반복 안함"));
				userEvent.click(screen.getByText("매년"));

				expect(screen.getByText("매년")).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						name: "반복 종료",
					}),
				).toBeInTheDocument();
			});
			it("recur yearly_N", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByText("반복 안함"));
				userEvent.click(screen.getByText("N년 간격"));

				expect(screen.getByText("N년 간격")).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						name: "반복 종료",
					}),
				).toBeInTheDocument();
				expect(screen.getByDisplayValue(1)).toBeInTheDocument();
				expect(screen.getByText("년 간격으로 반복합니다.")).toBeInTheDocument();
			});
			it("recur infinitely", () => {
				render(<ScheduleModal />);

				userEvent.click(screen.getByRole("button", { name: "반복 안함" }));
				userEvent.click(screen.getByRole("button", { name: "매일" }));
				userEvent.click(screen.getByRole("button", { name: "안 함" }));
				userEvent.click(screen.getByRole("button", { name: "날짜" }));

				expect(
					screen.getByRole("heading", {
						name: "반복 종료 날짜",
					}),
				).toBeInTheDocument();
			});
		});
	});
	describe("mutate schedule", () => {
		it("POST new all day schedule", async () => {
			render(<PersonalSchedulePage />, {
				preloadedState: { auth: { user: { userId: 1 } } },
			});

			// open ScheduleModal as a create mode
			userEvent.click(screen.getByRole("button", { name: "일정 추가" }));

			// action
			const titleInput = screen.getByPlaceholderText("일정 제목");
			const contentTextarea = screen.getByPlaceholderText("상세 내용");
			const allDayCheckbox = screen.getByLabelText("하루 종일");
			userEvent.clear(titleInput);
			userEvent.clear(contentTextarea);
			userEvent.clear(allDayCheckbox);
			userEvent.type(titleInput, TITLE_TEXT);
			userEvent.type(contentTextarea, CONTENT_TEXT);
			userEvent.click(allDayCheckbox);
			await userEvent.click(screen.getByRole("button", { name: "저장하기" }));

			// assertion
			expect(
				await screen.findByRole("heading", {
					name: TITLE_TEXT,
				}),
			).toBeInTheDocument();
		});
		it("PUT all day schedule after changing title", async () => {
			render(<PersonalSchedulePage />, {
				preloadedState: { auth: { user: { userId: 1 } } },
			});

			// open ScheduleModal as a create mode
			// 클릭해야 하는 요소를 정확히 비동기적 호출로 잡아내야 함
			await screen.findByRole("heading", { name: "오늘오늘" });
			const editButton = screen
				.getByTestId("scheduleItem-1")
				.getElementsByTagName("button")[0];
			userEvent.click(editButton);

			// action
			const titleInput = await screen.findByPlaceholderText("일정 제목");
			userEvent.clear(titleInput);
			userEvent.type(titleInput, "newnew");
			userEvent.click(screen.getByRole("button", { name: "수정하기" }));

			// assertion
			expect(
				await screen.findByRole("heading", {
					name: "newnew",
				}),
			).toBeInTheDocument();
			expect(
				screen.queryByRole("heading", {
					name: "오늘오늘",
				}),
			).toBeNull();
		});

		it("DELETE current all day schedule", async () => {
			render(<PersonalSchedulePage />, {
				preloadedState: { auth: { user: { userId: 1 } } },
			});

			await screen.findByRole("heading", { name: "오늘오늘" });
			const deleteButton = screen
				.getByTestId("scheduleItem-1")
				.getElementsByTagName("button")[1];

			userEvent.click(deleteButton);

			const deleteConfirmButton = screen.getByRole("button", {
				name: "삭제하기",
			});
			expect(deleteConfirmButton).toBeInTheDocument();

			userEvent.click(deleteConfirmButton);

			const scheduleAddButton = await screen.findByRole("button", {
				name: "아직 추가된 일정이 없습니다! 할 일을 추가하여 하루동안 할 일을 관리해보세요.",
			});
			const scheduleItemHeadingToBeDeleted = screen.queryByRole("heading", {
				name: "오늘오늘",
			});
			expect(scheduleAddButton).toBeInTheDocument();
			expect(scheduleItemHeadingToBeDeleted).toBeNull();
		});
	});
});
