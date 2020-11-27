import {App} from "./App";

export default {
	title: "Leight/App/App",
	component: App,
};

const ExampleSite = () => <h1>Default Site!</h1>;

export const Default = () => {
	return (
		<App
			titleTemplate={"Storybook | %s"}
			sites={{
				app: <ExampleSite/>
			}}
		/>
	);
};
