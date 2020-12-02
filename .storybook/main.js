module.exports = {
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"presets": [
		"@storybook/preset-ant-design",
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials"
	]
};
