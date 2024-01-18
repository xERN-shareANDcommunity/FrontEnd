module.exports = {
	testEnvironment: "jsdom",
	testEnvironmentOptions: {
		customExportConditions: [], // don't load "browser" field
	},
	transform: {
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.svg$": "jest-transformer-svg",
		".+\\.(css|styl|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2)$":
			"jest-transform-stub",
	},
	transformIgnorePatterns: [
		"/node_modules/(?!@emotion/react|@emotion/styled|@react-oauth/google|react-icons|react-modal|react-toastify|styled-components)",
	],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@components/(.*)$": "<rootDir>/src/components/$1",
		"^@pages/(.*)$": "<rootDir>/src/pages/$1",
		"^@features/(.*)$": "<rootDir>/src/features/$1",
		"^@store/(.*)$": "<rootDir>/src/store/$1",
		"^@utils/(.*)$": "<rootDir>/src/utils/$1",
		"\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
	},
};
