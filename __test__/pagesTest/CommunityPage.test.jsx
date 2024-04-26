import React from "react";
import ReactDOM from "react-dom";

import "@testing-library/jest-dom/extend-expect";

import { userEvent } from "@storybook/testing-library";
import { screen } from "@testing-library/react";

import { render } from "../../jest.setup.js";
import GroupCreateModal from "../../src/components/Common/GroupModal/GroupCreateModal/GroupCreateModal.jsx";
import Header from "../../src/components/Header/Header/Header.jsx";
import CommunityPage from "../../src/pages/CommunityPage/CommunityPage.jsx";

const GROUP_NAME = "그룹 이름 1";

describe("Community 페이지 렌더링", () => {
	beforeAll(() => {
		ReactDOM.createPortal = jest.fn((element) => {
			return element;
		});
		window.scrollTo = jest.fn();
	});
	describe("내 그룹 렌더링", () => {
		describe("그룹이 없을 때", () => {
			describe("그룹 추가하기 버튼 미클릭시", () => {
				it("그룹 추가하기 버튼 렌더링", () => {
					render(<CommunityPage />);

					expect(screen.getByText("그룹 추가하기")).toBeInTheDocument();
					expect(screen.getByTestId("group-add-button")).toBeInTheDocument();
				});
			});
			describe("그룹 추가하기 버튼 클릭시", () => {
				describe("그룹 추가하기 클릭시 그룹 생성 모달 오픈", () => {
					it("모달 요소 렌더링", () => {
						render(
							<>
								<CommunityPage />
								<Header />
							</>,
							{
								preloadedState: {
									auth: { user: { userId: 1 } },
									ui: { openedModal: null },
								},
							},
						);

						userEvent.click(screen.getByTestId("group-add-button"));

						const createButton = screen.getByRole("button", {
							name: "생성하기",
						});
						const imgInput = screen.getByTestId("group-img-input");
						const nameInput = screen.getByPlaceholderText("그룹 이름");
						const descriptionInput =
							screen.getByPlaceholderText("그룹 상세 소개");

						expect(nameInput).toBeInTheDocument();
						expect(descriptionInput).toBeInTheDocument();
						expect(createButton).toBeInTheDocument();
						expect(imgInput).toBeInTheDocument();
					});

					it("그룹 생성하기 버튼 활성화", () => {
						render(<GroupCreateModal />);

						const nameInput = screen.getByPlaceholderText("그룹 이름");
						const createButton = screen.getByRole("button", {
							name: "생성하기",
						});

						expect(createButton).toBeDisabled();

						userEvent.clear(nameInput);
						userEvent.type(nameInput, GROUP_NAME);

						expect(createButton).toBeEnabled();
					});
					it("그룹 생성", async () => {
						render(
							<>
								<CommunityPage />
								<Header />
							</>,
							{
								preloadedState: {
									auth: { user: { userId: 1 } },
									ui: { openedModal: null },
								},
							},
						);

						userEvent.click(screen.getByTestId("group-add-button"));

						const nameInput = screen.getByPlaceholderText("그룹 이름");
						const createButton = screen.getByRole("button", {
							name: "생성하기",
						});

						userEvent.clear(nameInput);
						userEvent.type(nameInput, GROUP_NAME);

						await userEvent.click(createButton);

						expect(
							await screen.findByRole("heading", {
								name: GROUP_NAME,
							}),
						).toBeInTheDocument();
					});
				});
			});
		});
		// describe("그룹이 있을 때", () => {

		// })
	});
});
