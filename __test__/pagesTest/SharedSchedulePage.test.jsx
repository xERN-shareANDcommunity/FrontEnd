import React from "react";

import SharedSchedulePage from "@/pages/SharedSchedulePage.jsx";
import lightTheme from "@/styles/theme.js";

import { render, screen } from "../../jest.setup";

describe("SharedSchedulePage without modal", () => {
	it("initially render same component as PersonalPage", () => {
		render(<SharedSchedulePage />);

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
});
