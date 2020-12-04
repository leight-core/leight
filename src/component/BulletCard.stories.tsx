import {Story} from "@storybook/react";
import React from "react";
import {HomeIcon} from "../icon/HomeIcon";
import {BulletCard} from "./BulletCard";

export default {
	title: "Leight/Component/Bullet Card",
	component: BulletCard,
	argTypes: {
		icon: {control: {disable: true}},
	},
	args: {
		title: "Bullet Card",
		count: 4,
	}
};

const Template = args => <BulletCard {...args}/>;

export const Default = Template.bind({});
export const WithIcon: Story = Template.bind({});
WithIcon.args = {
	icon: <HomeIcon/>,
	count: 3,
};
