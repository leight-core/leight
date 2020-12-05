import {Divider, Space, Steps} from "antd";
import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {PushRight} from "../layout/PushRight";
import {IEvents} from "../utils/Events";
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
	const {t} = useTranslation();
	const count = steps.length;
	const canNext = () => step < (count - 1);
	const canPrevious = () => step > 0;
	const canFinish = () => step === count - 1;
	return (
		<WizardContext.Provider value={{
			name,
			events,
			step,
			count,
			previous: () => setStep(current => current - 1),
			next: () => setStep(current => current + 1),
			canNext,
			canPrevious,
			canFinish,
		}}>
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
		</WizardContext.Provider>
	);
};
