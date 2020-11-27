import {App} from "./App";

export default {
	title: "Leight/App/App",
	component: App,
};

export const Default = () => {
	return (
		<App
			titleTemplate={"Storybook | %s"}
			sites={{}}
		/>
	);
};
