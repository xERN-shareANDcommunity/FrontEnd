import React from "react";
import ReactDOM from "react-dom";

import { userEvent } from "@storybook/testing-library";

import SharedSchedulePage from "@/pages/SharedSchedulePage.jsx";
import lightTheme from "@/styles/theme.js";

import { render, screen, waitFor } from "../../jest.setup";

const calendarScheduleSelector = "a.fc-event";
const EXTRA_MEMBER_DROPDOWN_COUNT = 1;

describe("SharedSchedulePage without modal", () => {
	it("initially render same component as PersonalPage", () => {
		render(<SharedSchedulePage />, {
			preloadedState: { auth: { user: { userId: 1 } } },
		});

		const today = new Date();
		expect(
			screen.getByText(`${today.getFullYear()}년 ${today.getMonth() + 1}월`),
		).toBeInTheDocument();

		// title 렌더링
		expect(screen.getByRole("button", { name: "월별" })).toHaveStyle({
			color: lightTheme.colors.text_01,
		});
		expect(screen.getByRole("button", { name: "리스트" })).toHaveStyle({
			color: lightTheme.colors.disabled_text,
		});
		expect(
			screen.getByRole("option", {
				name: `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`,
			}),
		).toBeInTheDocument();

		// 달력 렌더링
		expect(screen.getByTestId("calendar-container")).toBeInTheDocument();

		// 활성화된 tab 확인
		expect(screen.getByRole("button", { name: "일정 후보" })).toHaveStyle({
			backgroundColor: lightTheme.colors.primary,
			color: lightTheme.colors.white,
		});
		expect(
			screen.getByRole("heading", { name: "일정 후보(최대 5개)" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "후보 선택" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "후보 추가" }),
		).toBeInTheDocument();
		// 빈 경우에 버튼. 추후 비동기작업으로 더미 후보 추가 예정
		expect(
			screen.getByRole("button", {
				name: "공유한 사용자들에게 일정 후보를 먼저 제안해보세요!",
			}),
		).toBeInTheDocument();
	});
	it("initially render components about group", async () => {
		const { unmount, container } = render(<SharedSchedulePage />, {
			preloadedState: { auth: { user: { userId: 1 } } },
		});

		// GroupMenu
		const groupMenu = await screen.findByRole("menu");
		expect(groupMenu).toBeInTheDocument();
		// div.groupMembers
		expect(
			(await screen.findByTestId("groupMemberAvatar-owner")).childElementCount,
		).toBe(2);
		const memberAvatars = screen.getAllByTestId("groupMemberAvatar-member");
		expect(memberAvatars).toHaveLength(4); // 5명 - owner 1명
		memberAvatars.forEach((memberAvatar) => {
			expect(memberAvatar.childElementCount).toBe(1);
		});

		// ExtraGroupMembers: 멤버가 6명임
		expect(
			screen.getByTestId("ExtraGroupMember-toggleButton"),
		).toBeInTheDocument();

		// div.inviteButton: 내가 만든 그룹이므로
		expect(screen.getByRole("button", { name: "사용자 초대" })).toBeEnabled();

		// GroupSelect
		expect(screen.getAllByRole("combobox")[1]).toHaveTextContent("내 그룹 1");

		// calendarSchedules
		expect(container.querySelectorAll(calendarScheduleSelector).length).toBe(2);

		// proposal list(미완): 일정 후보 수정에서 구현 예정

		unmount();
	});
	it("toggle ExtraGroupMembers", async () => {
		const { unmount } = render(<SharedSchedulePage />, {
			preloadedState: { auth: { user: { userId: 1 } } },
		});

		const extraGroupMemberButton = await screen.findByTestId(
			"ExtraGroupMember-toggleButton",
		);

		expect(extraGroupMemberButton).toBeInTheDocument();

		userEvent.click(extraGroupMemberButton);

		expect(
			screen.getByTestId("ExtraGroupMember-dropdown").childElementCount,
		).toBe(1 + EXTRA_MEMBER_DROPDOWN_COUNT);

		userEvent.click(extraGroupMemberButton);

		expect(screen.queryByTestId("ExtraGroupMember-dropdown")).toBeNull();

		unmount();
	});
	it("toggle GroupInviteLink with buttons", async () => {
		const { unmount } = render(<SharedSchedulePage />, {
			preloadedState: { auth: { user: { userId: 1 } } },
		});

		const inviteButton = await screen.findByRole("button", {
			name: "사용자 초대",
		});

		userEvent.click(inviteButton);

		await waitFor(
			() => expect(screen.getByRole("button", { name: "복사" })).toBeEnabled(),
			{ timeout: 5000 },
		);

		userEvent.click(inviteButton);

		expect(screen.queryByRole("button", { name: "복사" })).toBeNull();

		unmount();
	});
	it("GroupSelect: change selected group", async () => {
		const { unmount, container } = render(<SharedSchedulePage />, {
			preloadedState: { auth: { user: { userId: 1 } } },
		});
		// wait for rendering GroupSelect
		await screen.findByRole("menu");

		const GroupSelect = screen.getByRole("button", { name: "내 그룹 1" });

		userEvent.click(GroupSelect);

		const initialGroupOption = screen.getByTestId(1);
		const GroupOptionToChange = screen.getByTestId(2);

		expect(initialGroupOption).toBeInTheDocument();
		expect(initialGroupOption).toHaveStyle({
			backgroundColor: lightTheme.colors.primary,
			color: lightTheme.colors.white,
		});

		expect(GroupOptionToChange).toBeInTheDocument();

		userEvent.click(GroupOptionToChange);

		await waitFor(() => {
			expect(container.querySelectorAll(calendarScheduleSelector).length).toBe(
				0,
			);
		});

		unmount();
	});
	it("Mutate group schedule proposal", () => {});
});

describe("ScheduleProposalModal in SharedSchedulePage", () => {
	beforeAll(() => {
		ReactDOM.createPortal = jest.fn((element) => {
			return element;
		});
		window.scrollTo = jest.fn();
	});
	it("trigger opening ScheduleProposalModal", () => {
		render(<SharedSchedulePage />, {
			preloadedState: { auth: { user: { userId: 1 } } },
		});

		userEvent.click(screen.getByRole("button", { name: "후보 추가" }));

		expect(screen.getByTestId("ScheduleProposalModal")).toBeInTheDocument();

		// title
		expect(
			screen.getByRole("heading", { name: "일정 후보 등록" }),
		).toBeInTheDocument();
		// input, textarea
		expect(screen.getAllByDisplayValue("")).toHaveLength(2);

		// 일정 추천
		expect(
			screen.getByRole("heading", { name: "일정 추천" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "일정 검색 범위" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "일정 최소 구간" }),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "1시간" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "추천받기" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "직접 만들기" })).toBeEnabled();
		expect(screen.getByRole("button", { name: "등록하기" })).toBeDisabled();
	});
});
