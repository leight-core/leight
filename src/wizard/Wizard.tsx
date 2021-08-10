import {Col, Divider, Row, Space, Steps} from "antd";
import deepmerge from "deepmerge";
import {isPlainObject} from "is-plain-object";
import {FC, ReactNode, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {ButtonContextProvider} from "../button/ButtonContextProvider";
import {Form} from "../form/Form";
import {useFormContext} from "../form/FormContext";
import {IDeepMerge, IOutputMapper} from "../interface/interface";
import {PushRight} from "../layout/PushRight";
import {StepLoader} from "../loader/StepLoader";
import {CancelButton} from "./button/CancelButton";
import {FinishButton} from "./button/FinishButton";
import {NextButton} from "./button/NextButton";
import {PreviousButton} from "./button/PreviousButton";
import {IWizardButton, IWizardEvents, IWizardStep} from "./interface";
import {useWizardContext, WizardContext} from "./WizardContext";
import {WizardEvents} from "./WizardEvents";

interface IWizardInternalProps {
	name: string;
	steps: IWizardStep[];
}

const WizardInternal: FC<IWizardInternalProps> = ({name, steps}) => {
	const wizardContext = useWizardContext();
	const formContext = useFormContext();
	const {t} = useTranslation();
	useEffect(() => {
		wizardContext.events
			.on("reset", () => formContext.reset(), 1000)
			.on("first", () => formContext.reset(), 1000)
			.on("previous", () => wizardContext.previous(), 1000)
			.on("next", ({values}) => wizardContext.next(values), 1000);
	}, [wizardContext, wizardContext.step]);
	return <Row gutter={32}>
		<Col span={24}>
			<Steps current={wizardContext.step} size={"default"} direction={"horizontal"}>
				{steps.map(item => (
					<Steps.Step
						key={item.id}
						title={t("wizard." + name + ".step." + item.id + ".title")}
						description={t("wizard." + name + ".step." + item.id + ".description")}
					/>
				))}
			</Steps>
			<Divider/>
		</Col>
		<Col span={24}>
			<ButtonContextProvider<IWizardButton>
				defaultDisabled={{
					next: false,
					previous: false,
					cancel: false,
					finish: false,
				}}
			>
				{steps[wizardContext.step].component(wizardContext.events.bind("step", WizardEvents()))}
				<Divider type={"horizontal"}/>
				<PushRight>
					<Space split={<Divider type={"vertical"}/>}>
						<CancelButton key={"cancel"}/>
						{wizardContext.canPrevious() && <PreviousButton key={"previous"}/>}
						{wizardContext.canNext() && <NextButton key={"next"}/>}
						{wizardContext.canFinish() && <FinishButton key={"finish"}/>}
					</Space>
				</PushRight>
			</ButtonContextProvider>
		</Col>
	</Row>;
};

export interface IWizardProps {
	/**
	 * Name of the wizard (and also underlying form).
	 */
	name: string;
	/**
	 * Wizard events; they're chained on top of internal Wizard events.
	 */
	events: IWizardEvents;
	/**
	 * Wizard steps.
	 */
	steps: IWizardStep[];
	/**
	 * If specified, Wizard will preload/do something before first step appears.
	 *
	 * Useful for data prefetch.
	 */
	loaders?: ReactNode[];
	/**
	 * Initial values for the underlying form.
	 */
	initialValues?: Object;
	/**
	 * If something inside Wizard needs data (dependencies), they could be directly
	 * put here; loaders are setting those too.
	 */
	defaultDependencies?: Object;
	/**
	 * When Wizard finishes, values are mapped by this method (if needed).
	 */
	outputMapper?: IOutputMapper;
	/**
	 * Wizard-wise method used for merging values from pages. Defaults to deepmerge replacing
	 * arrays and preserving special objects.
	 */
	merge?: IDeepMerge;
}

export const Wizard: FC<IWizardProps> = (
	{
		name,
		events,
		steps,
		initialValues = {},
		defaultDependencies = {},
		loaders = [],
		outputMapper = value => value,
		merge = (a, b) => deepmerge<any>(
			a,
			b,
			{
				arrayMerge: (_, source, __) => source,
				isMergeableObject: isPlainObject,
			}),
	}) => {
	const [step, setStep] = useState<number>(0);
	const [values, setValues] = useState<Object>(initialValues);
	const [dependencies, setDependencies] = useState<Object>(defaultDependencies);
	const count = steps.length;
	const canNext = () => step < (count - 1);
	const canPrevious = () => step > 0;
	const canFinish = () => step === count - 1;
	const wizardEvents = WizardEvents()
		.on("previous", wizardContext => {
			wizardContext.step === 1 && wizardEvents.handler("first")({wizardContext, values: wizardContext.values});
		})
		.on("first", _ => setValues({}))
		.on("reset", () => {
			setStep(0);
			setValues({});
		})
		.chain(events);
	return <WizardContext.Provider
		value={{
			name,
			events: wizardEvents,
			step,
			count,
			values,
			previous: () => setStep(current => current - 1),
			next: (values?: any) => {
				setValues(prev => merge(prev, values));
				setStep(current => current + 1);
			},
			canNext,
			canPrevious,
			canFinish,
			dependencies,
			dependency: (dependency, value) => {
				if (value) {
					setDependencies(prev => ({...prev, [dependency]: value}));
					return value;
				} else if (!dependencies[dependency]) {
					throw new Error(`Requested missing dependency [${dependency}] in Wizard [${name}].`);
				}
				return dependencies[dependency];
			},
			outputMapper,
			merge,
			useRefreshForm: () => {
				const formContext = useFormContext();
				return (initials?: any, current?: any) => {
					initials && formContext.setValues(initials);
					values && formContext.setValues(values);
					current && formContext.setValues(current);
					formContext.refresh();
				};
			},
		}}
	>
		<StepLoader
			steps={loaders}
		>
			<Form
				preserve={false}
				onSubmit={() => null}
				layout={"vertical"}
				initialValues={initialValues}
				size={"large"}
			>
				<WizardInternal name={name} steps={steps}/>
			</Form>
		</StepLoader>
	</WizardContext.Provider>;
};
