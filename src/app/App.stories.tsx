import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {useEffect} from "react";
import {useSessionContext} from "../session/SessionContext";
import {Random} from "../utils/Random";
import {App} from "./App";

export default {
	title: "Leight/App/App",
	component: App,
};

const ExampleSite = () => {
	const sessionContext = useSessionContext<{ site: string, login: string }>();
	return (
		<h1>Default Site! Logged in: {sessionContext?.session?.login || "unknown"}</h1>
	);
};

export const Default = () => {
	return (
		<App
			titleTemplate={"Storybook | %s"}
			sites={{
				app: () => <ExampleSite/>
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
				}, Random(300, 600));
			}))
			.onGet("/api/discovery")
			.reply(() => new Promise(resolve => {
				setTimeout(() => {
					resolve([200, {
						"public.translation": {"link": "/api/public/translation"},
						"public.user.login": {"link": "/api/public/user/login"},
					}]);
				}, Random(300, 600));
			}))
			.onGet("/api/public/translation")
			.reply(() => new Promise(resolve => {
				setTimeout(() => {
					resolve([200, {
						translations: [],
					}]);
				}, Random(300, 600));
			}))
			.onGet("/api/public/user/login")
			.reply(() => new Promise(resolve => {
				setTimeout(() => {
					resolve([200, {
						site: "app",
						login: "Storybook User",
					}]);
				}, Random(300, 600));
			}));
		return () => mock.restore();
	}, []);
	return <Story/>;
}];
