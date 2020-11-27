import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {useEffect} from "react";
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
Default.decorators = [Story => {
	useEffect(() => {
		const mock = new MockAdapter(axios);
		mock.onGet("/client.json").reply(200, {
			discovery: "/api/discovery",
		});
		return () => mock.restore();
	}, []);
	return <Story/>;
}];
