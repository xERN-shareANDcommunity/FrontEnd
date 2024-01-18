import styled from "styled-components";

// 나중에 컴포넌트 추가할 수도 있으므로 export const로
export const LayoutMain = styled.main`
	display: flex;
	justify-content: center;
	gap: 13px;
	padding: 50px 95px 0;
	margin-bottom: 80px;
	padding-left: ${({ isMonthly }) => (!isMonthly ? "22px" : undefined)};
	font-family: "Inter", sans-serif;
`;
