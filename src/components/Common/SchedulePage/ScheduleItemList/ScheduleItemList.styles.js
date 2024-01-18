import styled from "styled-components";

export const ScheduleItemListLayoutAside = styled.aside`
	position: sticky;
	top: 290px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 19px;
	width: 100%;
	max-width: 422px;
	height: 549px;
	border-radius: 15px;
	font-family: "Inter";
`;

export const TodoHeader = styled.header`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 33px;
	padding: 0 17px;
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s2};
`;

export const TodoTabButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	background-color: ${({ selected, theme: { colors } }) =>
		selected ? colors.primary : colors.white};

	&:hover {
		background-color: ${({ theme: { colors } }) => colors.btn_04};
	}

	&:active {
		background-color: ${({ theme: { colors } }) => colors.btn_05};
	}

	border: 1px solid ${({ theme: { colors } }) => colors.btn_02};
	opacity: ${({ selected }) => (selected ? "1" : "0.7")};
	color: ${({ selected, theme: { colors } }) =>
		selected ? colors.white : colors.text_01};

	&:hover,
	&:active {
		color: ${({ theme: { colors } }) => colors.white};
	}

	transition: opacity 0.3s ease, background 0.3s ease, color 0.3s ease;
	padding: ${({
			theme: {
				spacing: { padding },
			},
		}) => padding.small}px
		0;
	cursor: pointer;
`;

export const TodoBody = styled.div`
	display: flex;
	gap: 29px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	min-height: 549px;
	padding: 26px 22px 26px 20px;
	border-radius: ${({
		theme: {
			typography: { size },
		},
	}) => size.l3};
	background-color: ${({ theme: { colors } }) => colors.bg_02};
`;

export const TodoBodyHeader = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;

	& > div {
		min-height: 43px;
	}
`;

export const TodoH2 = styled.h2`
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.m1};
	font-weight: ${({
		theme: {
			typography: { weight },
		},
	}) => weight.bold};
	line-height: ${({
		theme: {
			typography: { size },
		},
	}) => size.m2};
	color: ${({ theme: { colors } }) => colors.text_01};
	margin-bottom: 4px;
`;
export const TodoH3 = styled.h3`
	color: ${({ theme: { colors } }) => colors.text_02};
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s1};
	line-height: 15px;
	color: ${({ theme: { colors } }) => colors.text_02};
`;

export const TodoBodyHeaderButton = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s1};
	cursor: pointer;
	color: ${({ theme: { colors } }) => colors.primary};
	transition: opacity 0.3s ease;

	& > span {
		line-height: 1;
		font-weight: ${({
			theme: {
				typography: { weight },
			},
		}) => weight.bold};
	}

	&:hover {
		opacity: 0.7;
	}
`;

export const TodoButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 186px;
	background: white;
	border-radius: ${({
		theme: {
			spacing: { borderRadius },
		},
	}) => borderRadius.default}px;
	border: 1px solid ${({ theme: { colors } }) => colors.primary};
	padding: 15px;
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s2};
	font-weight: ${({ theme: { typography } }) => typography.medium};
	line-height: 16px;
	color: ${({ theme: { colors } }) => colors.disabled_text};
	cursor: pointer;
	transition: opacity 0.3s ease;

	&:hover {
		opacity: 0.7;
	}
`;

export const TodoList = styled.ul`
	width: 100%;
	height: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	border-radius: 10px;
	gap: ${({
		theme: {
			spacing: { padding },
		},
	}) => padding.medium}px;
	padding: 0;
	margin: 0;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}

	& {
		-ms-overflow-style: none; /* 인터넷 익스플로러 */
		scrollbar-width: none; /* 파이어폭스 */
	}
`;
