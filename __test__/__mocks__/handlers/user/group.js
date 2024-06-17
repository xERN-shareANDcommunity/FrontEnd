export const getUserGroup = (req, res, ctx) => {
	try {
		return res(
			ctx.status(200),
			ctx.json([
				{
					groupId: 1,
					name: "내 그룹 1",
					description: "test-description",
					member: 1,
					image:
						"https://selody-images.s3.ap-northeast-2.amazonaws.com/group/group.png",
				},
				{
					groupId: 2,
					name: "내 그룹 2",
					description: "test-dㅁㄴㄱ호데;ㅗㅎㄱescription",
					member: 2,
					image:
						"https://selody-images.s3.ap-northeast-2.amazonaws.com/group/group.png",
				},
				{
					groupId: 3,
					name: "내 그룹 3",
					description: "이게 내 세 번째",
					member: 2,
					image:
						"https://selody-images.s3.ap-northeast-2.amazonaws.com/group/group.png",
				},
			]),
		);
	} catch (error) {
		console.log(error);
		return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
	}
};
