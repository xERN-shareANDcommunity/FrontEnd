import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
	Root,
	ErrorPage,
	LandingPage,
	LoginPage,
	SignUpPage,
	PersonalSchedulePage,
	SettingPage,
	CommunityPage,
	GroupPage,
	MyPage,
	SharedSchedulePage,
} from "@/pages";

import { getCurrentUser } from "./features/auth/auth-service.js";
import PublicRoute from "./pages/PublicRoute.jsx";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "personal", element: <PersonalSchedulePage /> },
			{ path: "share", element: <SharedSchedulePage /> },
			{ path: "community", element: <CommunityPage /> },
			{ path: "setting", element: <SettingPage /> },
			{ path: "group/:id", element: <GroupPage /> },
			{ path: "mypage", element: <MyPage /> },
		],
	},
	{
		path: "/",
		element: <PublicRoute />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <LandingPage /> },
			{ path: "login", element: <LoginPage /> },
			{ path: "signup", element: <SignUpPage /> },
		],
	},
]);

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentUser());
	}, []);

	return (
		<>
			<ToastContainer
				position="top-center"
				style={{ width: "auto" }}
				autoClose={800}
			/>
			<RouterProvider router={router} />
		</>
	);
}
