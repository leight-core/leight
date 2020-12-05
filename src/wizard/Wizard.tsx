import {Divider, Space, Steps} from "antd";
import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
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
	return (
		<WizardContext.Provider value={{
			events,
			step,
			count: steps.length,
			previous: () => setStep(current => current - 1),
			next: () => setStep(current => current + 1),
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
			<Space split={<Divider type={"vertical"}/>} size={"large"}>
				<CancelButton/>
				<PreviousButton/>
				<NextButton/>
				<FinishButton/>
			</Space>
		</WizardContext.Provider>
	);
};
