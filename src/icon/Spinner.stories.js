import Spinner from "./Spinner";

export default {
	title: "Leight/Icon/Spinner",
	component: Spinner,
	argTypes: {
		done: {control: "boolean"},
		icon: {control: "string"},
	}
};

const Template = (args) => <Spinner {...args}/>;

export const Spinning = Template.bind({});
Spinning.args = {
	done: false,
	icon: "This should not be visible."
};

export const Done = Template.bind({});
Done.args = {
	done: true,
	icon: "Showing Icon Prop"
};
