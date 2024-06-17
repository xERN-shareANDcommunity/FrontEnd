export const getGroupMembers = (req, res, ctx) => {
	try {
		const groupId = Number(req.params.group_id);
		if (!groupId) {
			return res(
				ctx.status(400),
				ctx.json({ error: "형식에 맞지 않는 데이터입니다." }),
			);
		}

		if (groupId < 1) {
			return res(
				ctx.status(404),
				ctx.json({ error: "그룹을 찾을 수 없습니다." }),
			);
		}

		// userId === 1 입니다.
		return res(
			ctx.status(200),
			ctx.json([
				{
					accessLevel: "viewer",
					member: {
						nickname: "user2",
						userId: 2,
						image:
							"https://selody-images.s3.ap-northeast-2.amazonaws.com/profile/calender-dynamic-gradient%2B1.png",
						commentCount: 0,
						likeCount: 0,
						joinedDate: "2024-01-15T08:06:14.000Z",
					},
				},
				{
					accessLevel: "viewer",
					member: {
						nickname: "user3",
						userId: 3,
						image:
							"https://selody-images.s3.ap-northeast-2.amazonaws.com/profile/calender-dynamic-gradient%2B1.png",
						commentCount: 0,
						likeCount: 0,
						joinedDate: "2024-01-15T08:07:14.000Z",
					},
				},
				{
					accessLevel: "viewer",
					member: {
						nickname: "user4",
						userId: 4,
						image:
							"https://selody-images.s3.ap-northeast-2.amazonaws.com/profile/calender-dynamic-gradient%2B1.png",
						commentCount: 0,
						likeCount: 0,
						joinedDate: "2024-01-15T08:06:14.000Z",
					},
				},
				{
					accessLevel: "viewer",
					member: {
						nickname: "user5",
						userId: 5,
						image:
							"https://selody-images.s3.ap-northeast-2.amazonaws.com/profile/calender-dynamic-gradient%2B1.png",
						commentCount: 0,
						likeCount: 0,
						joinedDate: "2024-01-15T08:07:14.000Z",
					},
				},
				{
					accessLevel: "viewer",
					member: {
						nickname: "user6",
						userId: 6,
						image:
							"https://selody-images.s3.ap-northeast-2.amazonaws.com/profile/calender-dynamic-gradient%2B1.png",
						commentCount: 0,
						likeCount: 0,
						joinedDate: "2024-01-15T08:07:14.000Z",
					},
				},
				{
					accessLevel: "owner",
					member: {
						nickname: "kyy",
						userId: 1,
						image:
							"https://selody-images.s3.ap-northeast-2.amazonaws.com/profile/calender-dynamic-gradient%2B1.png",
						commentCount: 0,
						likeCount: 0,
						joinedDate: "2024-01-15T08:05:52.000Z",
					},
				},
			]),
		);
	} catch (error) {
		console.log("그룹 멤버 조회 중 발생한 에러");
		console.log(error);
		return res(ctx.status(500), ctx.json({ error: "Internal Server error." }));
	}
};
