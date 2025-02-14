import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelodyLogo from "@/components/Common/SelodyLogo";
import LoginForm from "@/components/Login/LoginForm/LoginForm";
import Google from "@/components/sign/Google";
import Naver from "@/components/sign/Naver";
import { naverLogin } from "@/features/auth/auth-service.js";
import useNaver from "@/hooks/useNaver";

import {
	ContainerDiv,
	LeftSideDiv,
	RightSideDiv,
	DividerHr,
	SocialLoginContainerDiv,
	SocialLoginBtnContainerDiv,
} from "./LoginPage.styles";

function LoginPage() {
	const dispatchFn = useDispatch();

	const naverInfo = useNaver();

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (naverInfo.accessToken) {
			dispatchFn(naverLogin(naverInfo));
		}
	}, [user]);

	return (
		<ContainerDiv>
			<LeftSideDiv>
				<SelodyLogo size={196} />
				<h1>
					Selody<span>.</span>
				</h1>
				<h3>
					이번 주 우리 약속은 이 날! <br />
					그룹 일정을 편하게 관리해보세요.
				</h3>
			</LeftSideDiv>
			<RightSideDiv>
				<LoginForm />
				<DividerHr />
				<SocialLoginContainerDiv>
					<p>간편 로그인</p>
					<div>
						<SocialLoginBtnContainerDiv>
							<Google />
							<span>구글</span>
						</SocialLoginBtnContainerDiv>
						<SocialLoginBtnContainerDiv>
							<Naver />
							<span>네이버</span>
						</SocialLoginBtnContainerDiv>
					</div>
				</SocialLoginContainerDiv>
			</RightSideDiv>
		</ContainerDiv>
	);
}

export default LoginPage;
