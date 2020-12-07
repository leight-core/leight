import {Divider, Space, Steps} from "antd";
import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {Form} from "../form/Form";
import {PushRight} from "../layout/PushRight";
import {Events, IEvents} from "../utils/Events";
import {CancelButton} from "./button/CancelButton";
import {FinishButton} from "./button/FinishButton";
import {NextButton} from "./button/NextButton";
import {PreviousButton} from "./button/PreviousButton";
import {WizardContext} from "./WizardContext";

export interface IStep {
	id: string
	component: JSX.Element
}

export interface IWizard {
	name: string
	events: IEvents
	steps: IStep[]
}

export const Wizard: FC<IWizard> = (
	{
		name,
		events,
		steps
	}) => {
	const [step, setStep] = useState<number>(0);
	const [values, setValues] = useState<Object>({});
	const {t} = useTranslation();
	const count = steps.length;
	const canNext = () => step < (count - 1);
	const canPrevious = () => step > 0;
	const canFinish = () => step === count - 1;
	const wizardEvents = Events()
		.on("next", ({values}) => setValues(prev => ({...prev, ...values})))
		.on("reset", () => setStep(0))
		.chain(events);
	return (
		<WizardContext.Provider value={{
			name,
			events: wizardEvents,
			step,
			count,
			previous: () => setStep(current => current - 1),
			next: () => setStep(current => current + 1),
			canNext,
			canPrevious,
			canFinish,
			values,
		}}>
			<Form name={name} onSubmit={() => null} layout={"vertical"}>
				<Steps current={step} size={"default"}>
					{steps.map(item => (
						<Steps.Step
							key={item.id}
							title={t("wizard." + name + ".step." + item.id + ".title")}
							description={t("wizard." + name + ".step." + item.id + ".description")}
						/>
					))}
				</Steps>
				<Divider type={"horizontal"}/>
				{steps[step].component}
				<Divider type={"horizontal"}/>
				<PushRight>
					<Space split={<Divider type={"vertical"}/>} size={"large"}>
						<CancelButton key={"cancel"}/>
						{canPrevious() && <PreviousButton key={"previous"}/>}
						{canNext() && <NextButton key={"next"}/>}
						{canFinish() && <FinishButton key={"finish"}/>}
					</Space>
				</PushRight>
			</Form>
		</WizardContext.Provider>
	);
};
