import {action} from "@storybook/addon-actions";
import {Button, Card, Result, Select} from "antd";
import React, {FC, useState} from "react";
import {FormItem} from "../form/FormItem";
import {DebouncedSelect} from "../form/inputs/DebouncedSelect";
import {EditIcon} from "../icon/EditIcon";
import {SubmitIcon} from "../icon/SubmitIcon";
import {Centered} from "../layout/Centered";
import {LoaderStep} from "../loader/LoaderStep";
import {useStepLoaderContext} from "../loader/StepLoaderContext";
import {FakeServerEvents} from "../server/ServerEvents";
import {StoryApp} from "../storybook/StoryApp";
import {IWizardEvents, IWizardFinish} from "./interface";
import {useStepEvents} from "./useStepEvents";
import {Wizard} from "./Wizard";
import {useWizardContext} from "./WizardContext";
import {WizardEvents} from "./WizardEvents";
import {WizardStep} from "./WizardStep";

export default {
	title: "Leight/Wizard/Default",
	component: Wizard,
};

const SomeLoader = props => {
	const stepLoaderContext = useStepLoaderContext();
	const wizardContext = useWizardContext();
	return (
		<LoaderStep
			onStep={() => {
				setTimeout(() => {
					wizardContext.dependency("name", {});
					stepLoaderContext.next();
				}, 800);
			}}
			icon={<SubmitIcon/>}
			{...props}
		/>
	);
};

const LoaderOfSomethingElse = props => {
	const stepLoaderContext = useStepLoaderContext();
	const wizardContext = useWizardContext();
	return (
		<LoaderStep
			onStep={() => {
				setTimeout(() => {
					wizardContext.dependency("select", [
						{label: "foo", value: "bar"},
						{label: "bar", value: "foo"},
					]);
					stepLoaderContext.next();
				}, 400);
			}}
			icon={<EditIcon/>}
			{...props}
		/>
	);
};

interface IEventStep {
	events: IWizardEvents
}

const FirstStep: FC<IEventStep> = ({events}) => {
	useStepEvents(events, events => {
		events.on("next", () => {
			console.log("first step, next");
		});
	});
	return (
		<WizardStep title={"first"}>
			<Centered span={8}>
				<FormItem field={["another", "value"]}/>
				<FormItem field={["some", "debounced"]} required>
					<DebouncedSelect<string>
						allowClear
						fetch={() => FakeServerEvents(["a", "b", "c"], 2000)}
						mapper={item => ({label: item, value: item})}
					/>
				</FormItem>
			</Centered>
		</WizardStep>
	);
};

const SecondStep: FC<IEventStep> = ({events}) => {
	const wizardContext = useWizardContext();
	useStepEvents(events, events => {
		events.on("next", () => {
			console.log("second step, next");
		});
	});
	return (
		<WizardStep title={"second"}>
			<Centered span={8}>
				<FormItem field={["wanna-this"]}/>
				<FormItem field={["some", "value"]} required>
					<Select options={wizardContext.dependency("select")} placeholder={"some.value"}/>
				</FormItem>
			</Centered>
		</WizardStep>
	);
};

const ThirdStep: FC<IEventStep> = ({events}) => {
	useStepEvents(events, events => {
		events.on("finish", (finish: IWizardFinish) => {
			console.log("finiiish!", finish);
		});
	});
	return (
		<WizardStep title={"third"}>
			<Centered span={8}>
				<Card>
					<Result
						status={"success"}
						title={"You are in the finish, yaaay!"}
					/>
				</Card>
			</Centered>
		</WizardStep>
	);
};

export const Default = () => {
	const [finish, setFinish] = useState<boolean>(false);
	const events = WizardEvents()
		.on("finish", ({values}) => {
			setFinish(true);
			action("onWizardFinish");
		});
	return (
		finish ?
			<Result status={"success"} title={"It works!"}>
				<Centered>
					<Button size={"large"} type={"primary"} onClick={() => setFinish(false)} children={"Reset"}/>
				</Centered>
			</Result> :
			<StoryApp>
				<Wizard name={"story"} events={events} steps={[
					{id: "first", component: (events) => <FirstStep events={events}/>},
					{id: "second", component: (events) => <SecondStep events={events}/>},
					{id: "third", component: (events) => <ThirdStep events={events}/>},
				]} defaultDependencies={{select: [{label: "foo", value: "bar"},]}}/>
			</StoryApp>
	);
};

export const WithPrefetch = () => {
	const [finish, setFinish] = useState<boolean>(false);
	const events = WizardEvents()
		.on("finish", ({values}) => {
			setFinish(true);
			action("onWizardFinish");
		});
	return (
		finish ?
			<Result status={"success"} title={"It works!"}>
				<Centered>
					<Button size={"large"} type={"primary"} onClick={() => setFinish(false)} children={"Reset"}/>
				</Centered>
			</Result> :
			<StoryApp>
				<Wizard
					name={"story"}
					events={events}
					steps={[
						{id: "first", component: (events) => <FirstStep events={events}/>},
						{id: "second", component: (events) => <SecondStep events={events}/>},
						{id: "third", component: (events) => <ThirdStep events={events}/>},
					]}
					loaders={[
						<SomeLoader key={"SomeLoader"}/>,
						<LoaderOfSomethingElse key={"LoaderOfSomethingElse"}/>,
					]}
				/>
			</StoryApp>
	);
};
