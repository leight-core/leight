import {Button} from "antd";
import Spinner from "./Spinner";

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

const Template = (args) => <Spinner {...args}/>;

export const Sandbox = Template.bind({});

export const ButtonExample = () => <Button size={"large"} type={"primary"} ghost icon={<Spinner/>} children={"Loading something"}/>;
