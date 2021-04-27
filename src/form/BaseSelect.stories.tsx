import React, {useState} from "react";
import {ServerEvents} from "../server/ServerEvents";
import {StoryApp} from "../storybook/StoryApp";
import {BaseSelect} from "./BaseSelect";
import {CommonForm} from "./CommonForm";
import {FormItem} from "./FormItem";

export default {
	title: "Leight/Form/BaseSelect Sandbox",
	component: BaseSelect,
};

export const BaseSelectSandbox = () => {
	const alfaEvents = ServerEvents();
	const betaEvents = ServerEvents();
	const [value, setValue] = useState<any>();
	return <>
		<FormItem field={["some", "alfa"]}>
			<BaseSelect<{ label: string, value: number }>
				fetch={() => {
					alfaEvents.handler("request")();
					setTimeout(() => {
						alfaEvents.handler("response")([
							{label: "item1", value: 1},
							{label: "item2", value: 2},
							{label: "item3", value: 3},
						]);
					}, 250);
					return alfaEvents;
				}}
				mapper={item => item}
				onChange={item => setValue(item)}
			/>
		</FormItem>
		<FormItem field={["some", "beta"]}>
			<BaseSelect<{ label: string, value: number }>
				mode={"multiple"}
				fetch={() => {
					betaEvents.handler("request")();
					setTimeout(() => {
						betaEvents.handler("response")([
							{label: "item1 " + value, value: 1},
							{label: "item2 " + value, value: 2},
							{label: "item3 " + value, value: 3},
						]);
					}, 1250);
					return betaEvents;
				}}
				mapper={item => item}
				deps={[value]}
			/>
		</FormItem>
	</>;
};
BaseSelectSandbox.decorators = [Story => (
	<StoryApp>
		<CommonForm<any>
			post={() => ServerEvents()}
			name={"story"}
			onSubmit={() => null}
			initialValues={{
				some: {
					beta: [1, 3]
				}
			}}
		>
			<Story/>
		</CommonForm>
	</StoryApp>
)];
