import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {useEffect} from "react";
import {Random} from "../utils/Random";
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
		const mock = new MockAdapter(axios, {
			onNoMatch: "throwException",
		});
		mock
			.onGet("/client.json")
			.reply(() => new Promise(resolve => {
				setTimeout(() => {
					resolve([200, {discovery: "/api/discovery"}]);
				}, Random(300, 1200));
			}))
			.onGet("/api/discovery")
			.reply(() => new Promise(resolve => {
				setTimeout(() => {
					resolve([200, {
						"common.translation": {"link": "/api/common/translation"},
					}]);
				}, Random(300, 1200));
			}))
			.onGet("/api/common/translation")
			.reply(() => new Promise(resolve => {
				setTimeout(() => {
					resolve([200, {
						translations: [],
					}]);
				}, Random(300, 1200));
			}));
		return () => mock.restore();
	}, []);
	return <Story/>;
}];
