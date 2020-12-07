import {Divider, Space, Steps} from "antd";
import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {Form} from "../form/Form";
import {useFormContext} from "../form/FormContext";
import {PushRight} from "../layout/PushRight";
import {StepLoader} from "../loader/StepLoader";
import {Events, IEvents} from "../utils/Events";
import {CancelButton} from "./button/CancelButton";
import {FinishButton} from "./button/FinishButton";
import {NextButton} from "./button/NextButton";
import {PreviousButton} from "./button/PreviousButton";
import {useWizardContext, WizardContext} from "./WizardContext";

export interface IStep {
	id: string
	component: JSX.Element
}

export interface IWizard {
	name: string
	events: IEvents
	steps: IStep[]
	loaders?: JSX.Element[]
}

interface IWizardInternal {
	name: string
	steps: IStep[]
}

const WizardInternal: FC<IWizardInternal> = ({name, steps}) => {
	const wizardContext = useWizardContext();
	const formContext = useFormContext();
	const {t} = useTranslation();
	wizardContext.events.on("reset", () => formContext.reset());
	return (
		<>
			<Steps current={wizardContext.step} size={"default"}>
				{steps.map(item => (
					<Steps.Step
						key={item.id}
						title={t("wizard." + name + ".step." + item.id + ".title")}
						description={t("wizard." + name + ".step." + item.id + ".description")}
					/>
				))}
			</Steps>
			<Divider type={"horizontal"}/>
			{steps[wizardContext.step].component}
			<Divider type={"horizontal"}/>
			<PushRight>
				<Space split={<Divider type={"vertical"}/>} size={"large"}>
					<CancelButton key={"cancel"}/>
					{wizardContext.canPrevious() && <PreviousButton key={"previous"}/>}
					{wizardContext.canNext() && <NextButton key={"next"}/>}
					{wizardContext.canFinish() && <FinishButton key={"finish"}/>}
				</Space>
			</PushRight>
		</>
	);
};

export const Wizard: FC<IWizard> = (
	{
		name,
		events,
		steps,
		loaders = [],
	}) => {
	const [step, setStep] = useState<number>(0);
	const [values, setValues] = useState<Object>({});
	const [dependencies, setDependencies] = useState<Object>({});
	const count = steps.length;
	const canNext = () => step < (count - 1);
	const canPrevious = () => step > 0;
	const canFinish = () => step === count - 1;
	const wizardEvents = Events()
		.on("next", ({values}) => setValues(prev => ({...prev, ...values})))
		.on("reset", () => setStep(0))
		.chain(events);
	return (
		<WizardContext.Provider
			value={{
				name,
				events: wizardEvents,
				step,
				count,
				values,
				previous: () => setStep(current => current - 1),
				next: () => setStep(current => current + 1),
				canNext,
				canPrevious,
				canFinish,
				dependency: (dependency, value) => {
					if (value) {
						setDependencies(prev => ({...prev, [dependency]: value}));
						return value;
					} else if (!dependencies[dependency]) {
						throw new Error(`Requested missing dependency [${dependency}] in Wizard [${name}].`);
					}
					return dependencies[dependency];
				},
			}}
			children={
				<StepLoader
					steps={loaders}
					children={
						<Form name={name} onSubmit={() => null} layout={"vertical"}>
							<WizardInternal name={name} steps={steps}/>
						</Form>
					}/>
			}
		/>
	);
};
