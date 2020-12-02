import {Button} from "antd";
import React from "react";
import {Spinner} from "./Spinner";
import {SubmitIcon} from "./SubmitIcon";

export default {
	title: "Leight/Icon/Spinner Sandbox",
	component: Spinner,
	argTypes: {
		done: {
			control: {type: "boolean"},
			description: "Any any truthy expression controlling if spinning or show children.",
		},
		children: {
			control: {disable: true},
			description: "When done, children will be directly shown.",
		},
	},
	args: {
		children: "We're done spinning!"
	}
};

const Template = args => <Spinner {...args}/>;

export const Sandbox = Template.bind({});

export const ButtonExample = Template.bind({});
ButtonExample.decorators = [Story => <Button size={"large"} type={"primary"} ghost icon={<Story/>} children={"Loading something"}/>];
ButtonExample.args = {children: <SubmitIcon/>};
