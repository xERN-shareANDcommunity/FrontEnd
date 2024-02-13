import React from "react";

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
		expect(screen.getByTestId("calendar-container")).toBeInTheDocument();
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

		// div.inviteButton
		expect(screen.getByRole("button", { name: "사용자 초대" })).toBeEnabled();

		// GroupSelect
		expect(screen.getAllByRole("combobox")[1]).toHaveTextContent("내 그룹 1");

		// calendarSchedules
		expect(container.querySelectorAll(calendarScheduleSelector).length).toBe(2);

		// proposal list(미완)

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
	it("GroupSelect: change selected group", async () => {
		const { unmount, container } = render(<SharedSchedulePage />, {
			preloadedState: { auth: { user: { userId: 1 } } },
		});
		// wait for rendering GroupSelect
		await screen.findByRole("menu");

		const GroupSelect = screen.getByRole("button", { name: "내 그룹 1" });

		userEvent.click(GroupSelect);

		const initialGroupOption = screen.getAllByRole("button", {
			name: "내 그룹 1",
		})[1];
		const GroupOptionToChange = screen.getByRole("button", {
			name: "내 그룹 2",
		});

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
