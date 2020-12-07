import {action} from "@storybook/addon-actions";
import {Button, Card, Result, Select} from "antd";
import {useState} from "react";
import {FormItem} from "../form/FormItem";
import {EditIcon} from "../icon/EditIcon";
import {SubmitIcon} from "../icon/SubmitIcon";
import {Centered} from "../layout/Centered";
import {LoaderStep} from "../loader/LoaderStep";
import {useStepLoaderContext} from "../loader/StepLoaderContext";
import {createModule, ModuleContext} from "../module/ModuleContext";
import {Events} from "../utils/Events";
import {Wizard} from "./Wizard";
import {useWizardContext} from "./WizardContext";
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

const FirstStep = () => {
	const wizardContext = useWizardContext();
	return (
		<WizardStep title={"first"}>
			<Centered span={8}>
				<FormItem field={["another", "value"]}/>
				<FormItem field={["some", "value"]} required>
					{label => <Select options={wizardContext.dependency("select")} placeholder={label}/>}
				</FormItem>
			</Centered>
		</WizardStep>
	);
};

const SecondStep = () => {
	return (
		<WizardStep title={"second"}>
			<Centered span={8}>
				<FormItem field={["wanna-this"]}/>
			</Centered>
		</WizardStep>
	);
};

const ThirdStep = () => {
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
	const events = Events()
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
			<ModuleContext.Provider value={createModule("story", <SubmitIcon/>, t => t, null)}>
				<Wizard name={"story"} events={events} steps={[
					{id: "first", component: <FirstStep/>},
					{id: "second", component: <SecondStep/>},
					{id: "third", component: <ThirdStep/>},
				]}/>
			</ModuleContext.Provider>
	);
};

export const WithPrefetch = () => {
	const [finish, setFinish] = useState<boolean>(false);
	const events = Events()
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
			<ModuleContext.Provider value={createModule("story", <SubmitIcon/>, t => t, null)}>
				<Wizard
					name={"story"}
					events={events}
					steps={[
						{id: "first", component: <FirstStep/>},
						{id: "second", component: <SecondStep/>},
						{id: "third", component: <ThirdStep/>},
					]}
					loaders={[
						<SomeLoader key={"SomeLoader"}/>,
						<LoaderOfSomethingElse key={"LoaderOfSomethingElse"}/>,
					]}
				/>
			</ModuleContext.Provider>
	);
};
